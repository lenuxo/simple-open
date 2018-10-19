import { observable } from "mobx";
import _ from "lodash";
import shortid from "shortid";
import fse from "fs-extra";

class Data_store {
    constructor(path) {
        this.userData = {
            firstRun: true,
            currentGroupId: "",
            groups: []
        };
        this.configPath = path;
    }
    addGroup(name, id) {
        let newGroup = new Group(name, id);
        if (this.userData.groups.length == 0) {
            return this.userData.groups.push(newGroup);
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
        return true;
    }
    deleteGroup(id) {
        if (this.userData.groups.length == 0) return;
        _.remove(this.userData.groups, group => group.id == id);
        return true;
    }
    setCurrentGroupById(id) {
        let index = _.findIndex(this.userData.groups, group => group.id == id);
        return (this.userData.currentGroupId = this.userData.groups[index].id);
    }
    setCurrentGroupByIndex(index) {
        if (!this.userData.groups[index]) return;
        return (this.userData.currentGroupId = this.userData.groups[index].id);
    }
    initUserData() {
        this.addGroup("My Group One");
        this.setCurrentGroupByIndex(0);
    }
    read() {
        return new Promise((res, rej) => {
            let storedData = {};
            fse.readJSON(this.configPath)
                .then(data => {
                    if (_.isEmpty(data)) {
                        this.initUserData();
                        return res(true);
                    }
                    storedData = data;
                    if (storedData.groups) {
                        this.userData.firstRun = false;
                        this.userData.currentGroupId =
                            storedData.currentGroupId;
                        storedData.groups.forEach((group, index) => {
                            this.addGroup(group.name, group.id);
                            group.items.forEach(item => {
                                this.userData.groups[index].addItem(
                                    item.path,
                                    item.id,
                                    item.valid
                                );
                            });
                        });
                        return res(true);
                    }
                })
                .catch(err => {
                    if (err.code == "ENOENT") {
                        this.initUserData();
                        res(true);
                    } else {
                        rej(err);
                    }
                });
        });
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
                it.items.push({
                    path: item.path,
                    id: item.id,
                    valid: item.valid
                });
            });
            storedData.groups.push(it);
        });
        return new Promise((res, rej) => {
            fse.ensureFile(this.configPath)
                .then(() => {
                    return fse.writeJSON(this.configPath, storedData);
                })
                .then(() => res(true))
                .catch(err => rej(err));
        });
    }
}

class Group {
    constructor(name, id) {
        this.name = "";
        this.items = [];
        if (id) {
            this.id = id;
        } else {
            this.generateId();
        }
        this.setName(name);
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
    addItem(path, id, valid) {
        let newItem = new Item(path, id, valid);
        if (this.items.length == 0) {
            return this.items.push(newItem);
        }
        let unique = false;
        while (!unique) {
            let index = _.findIndex(this.items, item => item.id == newItem.id);
            if (index > -1) {
                newItem.generateId();
            } else {
                unique = true;
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
    constructor(path, id, valid) {
        this.name = "";
        this.path = path;
        this.iconPath = "";
        if (valid) {
            this.valid = valid;
        } else {
            this.valid = true;
        }
        if (id) {
            this.id = id;
        } else {
            this.generateId();
        }
        this.init();
    }
    init() {
        this.parseName();
        this.parseIconPath();
    }
    generateId() {
        return (this.id = shortid.generate());
    }
    parseName() {
        // todo: parse name
        this.name = path.basename(this.path);
    }
    parseIconPath() {
        // TODO: icon path
    }
    testValid() {
        //todo: wheather existed
        new Promise((res, rej) => {
            fse.pathExists(this.path)
                .then(exists => {
                    this.valid = exists;
                    rej(exists);
                })
                .catch(err => rej(err));
        });
    }

    // ops
    open() {
        // TODO: open this item
    }
}

export default Data_store;
