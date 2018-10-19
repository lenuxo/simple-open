import React from "react";
import { observable } from "mobx";
import { observer, Provider } from "mobx-react";

//mobx store
import View_store from "./data_store/view_store_model";
const view_store = new View_store();

// i18n
import { IntlProvider, addLocaleData } from "react-intl";
import zh from "react-intl/locale-data/zh";
import en from "react-intl/locale-data/en";
addLocaleData(...zh, ...en);
const zh_CN = require("../../../assets/i18n/zh.json");
const en_US = require("../../../assets/i18n/en.json");
const langs = {
    zh: {
        locale: "zh",
        messages: zh_CN
    },
    en: {
        locale: "en",
        messages: en_US
    }
};

// style
import styled from "styled-components";
let style_var = require("./style_var.json");

// components
import Header from "./header/Header.js";
import List_view from "./list_view/List_view";
import Cta from "./cta/Cta.js";
import Delete_alert from "./alert/Delete_alert";
import Drop_cover from "./cover/Drop_cover";
import Add_alert from "./alert/Add_alert";

const Root = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: ${style_var.colorBase.white};
    display: flex;
    flex-direction: column;
    align-content: stretch;
    /* 全局 */
    font-size: ${style_var.font.size.m};
    font-family: ${style_var.font.family};
    color: ${style_var.colorBase.black};
    font-weight: ${style_var.font.weight.regular};
`;

@observer
class Container extends React.Component {
    componentWillMount() {
        window.set_user_lang = lang => {
            if (lang) view_store.user_lang = lang;
        };
        this.get_data();
        document.ondragleave = document.ondragenter = document.ondragover = document.ondrop = e => {
            e.preventDefault();
        };
    }
    state = {
        count: 0
    };
    get_data = () => {
        //todo: get data from backend at the first time
    };
    open_all = () => {
        //todo: open all things
        console.log("boom!");
    };
    dropHandler = e => {
        e.stopPropagation();
        e.preventDefault();
        let files = e.dataTransfer.files;
        let result = [];
        Array.prototype.forEach.call(files, file => {
            result.push({
                path: file.path,
                name: file.name,
                type: file.type
            });
        });
        view_store.show_drop_effect = false;
        console.log(result);
    };
    dragEnterHandler = e => {
        e.preventDefault();
        e.stopPropagation();
        if (!view_store.can_drop) return;
        view_store.show_drop_effect = true;
        console.log("enter");
    };
    dragLeaveHandler = e => {
        e.preventDefault();
        e.stopPropagation();
        view_store.show_drop_effect = false;
    };
    render() {
        return (
            <IntlProvider
                locale={langs[view_store.user_lang].locale}
                messages={langs[view_store.user_lang].messages}
            >
                <Provider viewStore={view_store}>
                    <Root onDragEnter={this.dragEnterHandler}>
                        <Header scrolled={view_store.list_scrolled} />
                        <List_view />
                        <Cta count={this.state.count} boom={this.open_all} />
                        {view_store.show_delete_alert && <Delete_alert />}
                        {view_store.show_add_alert && <Add_alert />}
                        {view_store.show_drop_effect && (
                            <Drop_cover
                                drop={this.dropHandler}
                                dragLeave={this.dragLeaveHandler}
                            />
                        )}
                    </Root>
                </Provider>
            </IntlProvider>
        );
    }
}

export default Container;
