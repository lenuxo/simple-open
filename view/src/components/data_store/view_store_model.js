import { observable, computed } from "mobx";

class View_store {
    @observable
    show_delete_alert = false;
    @observable
    show_add_alert = false;
    @observable
    show_pop_menu = false;
    @observable
    show_drop_effect = false;
    @observable
    header_loading = false;
    @observable
    item_loading = false;
    @observable
    list_scrolled = false;

    @computed
    get can_drop() {
        return !(
            this.show_delete_alert ||
            this.show_add_alert ||
            this.show_pop_menu ||
            this.header_loading ||
            this.item_loading
        );
    }
}
export default View_store;
