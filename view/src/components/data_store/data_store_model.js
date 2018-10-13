import { observable } from "mobx";

const Data_store = observable({
    current_group: "",
    group_list: []
});

export default Data_store;
