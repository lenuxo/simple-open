import { observable } from "mobx";

class View_store {
    @observable
    show_alert = false;
    @observable
    show_pop_menu = false;
    @observable
    can_drop = false;
    @observable
    header_loading = false;
    @observable
    item_loading = false;
    @observable
    list_scrolled = false;
    @observable 
    current_group_name = "Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!";
}
export default View_store;
