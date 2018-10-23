import React from "react";
import { observable } from "mobx";
import { observer, Provider } from "mobx-react";

//data store
import View_store from "./data_store/view_store_model";
const view_store = new View_store();
import Data_store from "./data_store/data_store_model";
const data_store = new Data_store();

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
    font-size: ${style_var.font.size.m};
    font-family: ${style_var.font.family};
    color: ${style_var.colorBase.black};
    font-weight: ${style_var.font.weight.regular};
`;

@observer
class Container extends React.Component {
    @observable
    user_lang = "en";
    componentWillMount() {
        window.set_user_lang = lang => {
            if (lang) this.user_lang = lang;
        };
        document.ondragleave = document.ondragenter = document.ondragover = document.ondrop = e => {
            e.preventDefault();
        };
        data_store.read();
    }
    dropHandler = e => {
        e.stopPropagation();
        e.preventDefault();
        let files = e.dataTransfer.files;
        Array.prototype.forEach.call(files, file => {
            data_store.addCurrentGroupNewItem({
                path: file.path,
                name: file.name,
                type: file.type ? "file" : "path",
                isUrl: false
            });
        });
        view_store.show_drop_effect = false;
    };
    dragEnterHandler = e => {
        e.preventDefault();
        e.stopPropagation();
        if (!view_store.can_drop) return;
        view_store.show_drop_effect = true;
    };
    dragLeaveHandler = e => {
        e.preventDefault();
        e.stopPropagation();
        view_store.show_drop_effect = false;
    };
    render() {
        return (
            <IntlProvider
                locale={langs[this.user_lang].locale}
                messages={langs[this.user_lang].messages}
            >
                <Provider viewStore={view_store} dataStore={data_store}>
                    <Root onDragEnter={this.dragEnterHandler}>
                        <Header scrolled={view_store.list_scrolled} />
                        <List_view />
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
