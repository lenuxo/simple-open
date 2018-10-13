import React from "react";
import { observable } from "mobx";
import { observer, Provider } from "mobx-react";

//mobx store
import Data_store from "./data_store/data_store_model";
import View_store from "./data_store/view_store_model";
const view_store = new View_store();
// const data_store = new Data_store();

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
import Alert from "./alert/Alert";
import Drop_cover from "./cover/Drop_cover";

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
    constructor() {
        super();
        this.state = {
            showAlert: false,
            canDrop: false,
            count: 30
        };
    }
    get_data() {
        //todo: get data from backend at the first time
    }
    open_all() {
        //todo: open all things
        console.log("boom!");
    }
    dismissAlert = () => {
        this.setState({ showAlert: false });
    };
    showAlert = () => {
        // TODO: show delete alert
        this.setState({ showAlert: true });
    };
    render() {
        return (
            <IntlProvider locale={langs.zh.locale} messages={langs.zh.messages}>
                <Provider viewStore={view_store}>
                    <Root>
                        <Header />
                        <List_view />
                        <Cta
                            count={this.state.count}
                            clickHandler={this.open_all}
                        />
                        {view_store.show_alert && <Alert />}
                        {view_store.can_drop && <Drop_cover />}
                    </Root>
                </Provider>
            </IntlProvider>
        );
    }
}

export default Container;
