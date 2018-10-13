import { observable } from "mobx";
import shortid from "shortid";
class Group_model {
    constructor() {
        this.id = "";
    }
    //todo group id
    @observable
    name = "My new group";
    @observable
    items = [];
    add_new_item = (name, path, icon_path) => {
        // add new item
    };
}

class Item {
    constructor(id, name, path, icon_path, is_valid) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.icon_path = icon_path;
        this.is_valid = is_valid;
    }
    generate_id() {
        this.id = shortid.generate();
    }
    getid() {
        return this.id;
    }
    change_valid(boo) {
        if (!boo) {
            this.is_valid = false;
        } else {
            this.is_valid = true;
        }
    }
}

export default Group_model;
