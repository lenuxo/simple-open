import { observable, computed } from "mobx";
import _ from "lodash";
import shortid from "shortid";
import fse from "fs-extra";
import fs from "fs";
import fileIcon from "file-icon";
import { ipcRenderer } from "electron";
import * as node_path from "path";
import { remote } from "electron";

class Data_store {
    @observable
    userData = {
        currentGroupId: "",
        groups: []
    };

    @observable
    dataLoaded = false;
    @computed
    get getCurrentGroupIndex() {
        return _.findIndex(
            this.userData.groups,
            group => group.id == this.userData.currentGroupId
        );
    }
    @computed
    get getCurrentGroupName() {
        if (_.isEmpty(this.userData.groups)) return "";
        let currentGroup = _.find(
            this.userData.groups,
            group => group.id == this.userData.currentGroupId
        );
        if (!currentGroup) throw new Error("can not find this current id");
        return currentGroup.name;
    }
    @computed
    get getCurrentGroupItemsLength() {
        if (_.isEmpty(this.userData.groups)) return 0;
        if (_.isEmpty(this.userData.groups[this.getCurrentGroupIndex].items))
            return 0;
        return this.userData.groups[this.getCurrentGroupIndex].items.length;
    }
    @computed
    get countValidItems() {
        let validItems = _.filter(this.getAllCurrentItems, { valid: true });
        return validItems.length;
    }
    @computed
    get getAllCurrentItems() {
        let items = [];
        this.userData.groups[this.getCurrentGroupIndex].items.forEach(item => {
            items.push({
                id: item.id,
                name: item.name,
                path: item.path,
                iconPath: item.iconPath,
                type: item.type,
                isUrl: item.isUrl,
                isDir: item.isDir,
                isFile: item.isFile,
                valid: item.valid
            });
        });
        return items;
    }

    // ops
    addCurrentGroupNewItem(opt) {
        this.userData.groups[this.getCurrentGroupIndex].addItem(opt);
        _.last(this.userData.groups[this.getCurrentGroupIndex].items)
            .init()
            .then(() => this.save());
    }
    setCurrentGroupName(name) {
        let index = this.getCurrentGroupIndex;
        this.userData.groups[index].setName(name);
        this.save();
    }
    addGroup(name, id) {
        let newGroup = new Group(name, id);
        if (this.userData.groups.length == 0) {
            this.userData.groups.push(newGroup);
            return newGroup.id;
        }
        let unique = false;
        while (!unique) {
            let index = _.findIndex(
                this.userData.groups,
                group => group.id == newGroup.id
            );
            if (index > -1) {
                newGroup.generateId();
            } else {
                unique = true;
            }
        }
        this.userData.groups.push(newGroup);
        return newGroup.id;
    }
    deleteGroup(id) {
        if (this.userData.groups.length == 0) return;
        _.remove(this.userData.groups, group => group.id == id);
        return;
    }
    deleteCurrentGroup() {
        if (this.getCurrentGroupItemsLength) {
            let folderPath =
                remote.app.getPath("userData") +
                "/icon-data/" +
                this.userData.currentGroupId +
                "/";
            fse.remove(folderPath).catch(err => {
                console.log(err);
            });
        }
        if (this.userData.groups.length > 1) {
            this.deleteGroup(this.userData.currentGroupId);
            this.setCurrentGroupByIndex();
        } else {
            this.deleteGroup(this.userData.currentGroupId);
            let id = this.addGroup();
            this.setCurrentGroupById(id);
        }
        return this.save();
    }
    deleteItemFromGroup(itemId, groupId) {
        if (!itemId || !groupId)
            throw new Error("Need item id and group id for deleting item");
        let index = _.findIndex(
            this.userData.groups,
            group => group.id == groupId
        );
        if (index < 0)
            throw new Error("can not find this group id: " + groupId);
        this.userData.groups[index].deleteItem(groupId);
    }
    deleteItemFromCurrentGroup(id) {
        if (!id) throw new Error("Need item id for deleteing item");
        let iconPath = _.find(this.getAllCurrentItems, item => item.id == id)
            .iconPath;
        this.userData.groups[this.getCurrentGroupIndex].deleteItem(id);
        if (iconPath) {
            fse.remove(iconPath)
                .then(() => {
                    this.save();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
    setCurrentGroupById(id) {
        let index = _.findIndex(this.userData.groups, group => group.id == id);
        if (index == -1) throw new Error("can not find this group id: " + id);
        return (this.userData.currentGroupId = this.userData.groups[index].id);
    }
    setCurrentGroupByIndex(index) {
        if (!this.userData.groups[index])
            return (this.userData.currentGroupId = _.last(
                this.userData.groups
            ).id);
        return (this.userData.currentGroupId = this.userData.groups[index].id);
    }
    initUserData() {
        this.addGroup();
        this.setCurrentGroupByIndex(0);
    }
    read() {
        ipcRenderer.on("local-data-reply", (event, data) => {
            if (_.isEmpty(data)) {
                this.initUserData();
                return (this.dataLoaded = true);
            }
            let storedData = data;
            if (!_.isEmpty(storedData.groups)) {
                this.userData.currentGroupId = storedData.currentGroupId;
                storedData.groups.forEach((group, index) => {
                    this.addGroup(group.name, group.id);
                    group.items.forEach(item => {
                        this.userData.groups[index].addItem({
                            path: item.path,
                            id: item.id,
                            valid: item.valid,
                            type: item.type,
                            parentId: item.parentId,
                            isUrl: item.isUrl,
                            isFile: item.isFile,
                            isDir: item.isDir,
                            iconPath: item.iconPath
                        });
                    });
                });
            } else {
                this.initUserData();
            }
            this.dataLoaded = true;
        });
        ipcRenderer.send("local-data-get");
    }
    save() {
        let storedData = { groups: [], currentGroupId: "" };
        storedData.currentGroupId = this.userData.currentGroupId;
        this.userData.groups.forEach(group => {
            let it = {
                name: group.name,
                id: group.id,
                items: []
            };
            group.items.forEach(item => {
                if (!item.valid) return;
                it.items.push({
                    path: item.path,
                    id: item.id,
                    valid: item.valid,
                    type: item.type,
                    parentId: item.parentId,
                    isUrl: item.isUrl,
                    isFile: item.isFile,
                    isDir: item.isDir,
                    iconPath: item.iconPath
                });
            });
            storedData.groups.push(it);
        });
        ipcRenderer.send("local-data-post", storedData);
    }
}

class Group {
    @observable
    name;
    @observable
    items;
    constructor(name = "New Group", id) {
        this.name = name;
        this.items = [];
        if (id) {
            this.id = id;
        } else {
            this.generateId();
        }
    }
    generateId() {
        return (this.id = shortid.generate());
    }
    //ops
    setName(name) {
        if (typeof name != "string")
            throw new Error("Group should have a name");
        return (this.name = name);
    }
    addItem(opt) {
        let option = opt;
        option.parentId = this.id;
        let newItem = new Item(option);
        if (this.items.length == 0) {
            return this.items.push(newItem);
        }
        let repeatIndex = _.findIndex(
            this.items,
            item => item.path == newItem.path
        );
        if (repeatIndex >= 0) return repeatIndex;
        let isIdUnique = false;
        while (!isIdUnique) {
            let index = _.findIndex(this.items, item => item.id == newItem.id);
            if (index > -1) {
                newItem.generateId();
            } else {
                isIdUnique = true;
            }
        }
        this.items.push(newItem);
        return true;
    }
    deleteItem(id) {
        if (this.items.length == 0) return;
        _.remove(this.items, item => item.id == id);
        return true;
    }
}
class Item {
    @observable
    isUrl = false;
    @observable
    isDir = false;
    @observable
    isFile = false;
    @observable
    valid = true;
    @observable
    iconPath = "";
    constructor({
        path,
        name,
        type,
        id,
        valid,
        parentId,
        isFile,
        isUrl,
        isDir,
        iconPath
    }) {
        this.type = type;
        this.name = name;
        this.parentId = parentId;
        this.path = path;
        this.iconPath = iconPath;
        this.isFile = isFile;
        this.isUrl = isUrl;
        this.isDir = isDir;
        if (valid) {
            this.valid = valid;
        }
        if (id) {
            this.id = id;
        } else {
            this.generateId();
        }
        this.parseFilePath();
        this.parseName();
    }
    generateId() {
        return (this.id = shortid.generate());
    }
    parseName() {
        if (this.type == "file.root") {
            return (this.name = "/");
        }
        if (!this.name) {
            this.name = node_path.basename(this.path);
        }
    }
    parseFilePath() {
        if (this.type == "file.~") {
            let forePath = remote.app.getPath("home");
            this.path = node_path.join(forePath, this.path.slice(1));
        }
    }
    parseIconPath() {
        if (this.type == "url" || !this.valid || this.isDir) {
            return new Promise(res => res());
        }
        return new Promise((res, rej) => {
            let folderPath =
                remote.app.getPath("userData") +
                "/icon-data/" +
                this.parentId +
                "/";
            fse.ensureDir(folderPath)
                .then(() => {
                    return fileIcon.file(this.path, {
                        destination: folderPath + this.id + ".png",
                        size: 32
                    });
                })
                .then(() => {
                    this.iconPath = folderPath + this.id + ".png";
                    res();
                })
                .catch(err => rej(err));
        });
    }
    testValid() {
        return new Promise((res, rej) => {
            if (this.type == "url") {
                this.isUrl = true;
                this.isDir = false;
                this.isFile = false;
                this.valid = true;
                res("url");
            } else {
                fs.stat(this.path, (err, stat) => {
                    if (err) {
                        this.valid = false;
                    } else {
                        this.valid = true;
                        this.isDir = !stat.isFile();
                        this.isFile = stat.isFile();
                        if (this.path.match(/\.app$/gi)) {
                            this.isFile = true;
                            this.isDir = false;
                        }
                    }
                    res();
                });
            }
        });
    }
    init() {
        return this.testValid().then(() => {
            return this.parseIconPath();
        });
    }
}

export default Data_store;
