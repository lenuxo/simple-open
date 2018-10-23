import { ipcRenderer, remote } from "electron";
import React from "react";
import styled from "styled-components";
let style_var = require("../style_var.json");
let unit = style_var.spacing.unit;
import { FormattedMessage } from "react-intl";
import { observer, inject } from "mobx-react";
import Action_button from "./Action_button";
import View from "./Alert_view";
import test_path from "../utils/parse_path_string";

const Context = styled.div.attrs({ className: "context" })`
    padding-top: ${unit * 15}px;
    padding-bottom: ${unit * 15}px;
    .text > span:last-child {
        text-decoration: underline;
        &:hover {
            text-shadow: ${style_var.textshadow};
        }
    }
    input {
        user-select: auto;
        box-sizing: border-box;
        width: calc(100vw - ${unit * 14}px);
        @media screen and (min-width: ${unit * 75}px) {
            width: ${unit * 61}px;
        }
        margin-top: ${unit * 3}px;
        outline: none;
        border: none;
        border-radius: 999px;
        background: ${style_var.colorBase.greyL1};
        padding: ${unit}px ${unit * 2}px;
        font-size: ${style_var.font.size.m};
        color: ${style_var.colorBase.black};
        &::placeholder {
            color: ${style_var.colorBase.greyL2};
        }
    }
`;
const Actions = styled.div`
    padding-top: ${unit * 2}px;
    display: flex;
    flex-direction: row;
`;

@inject("viewStore", "dataStore")
@observer
class Add_alert extends React.Component {
    input_ref = React.createRef();
    state = {
        value: "",
        parsedValue: "",
        valid: false,
        type: "",
        isTyping: false
    };
    dismissHandler = e => {
        if (e) e.stopPropagation();
        if (this.state.isTyping) return;
        return (this.props.viewStore.show_add_alert = false);
    };
    changeHandler = e => {
        this.setState({
            value: e.target.value
        });
        this.testValue(e.target.value);
    };
    pressHandler = e => {
        if (e.key == "Enter" && this.state.valid) {
            this.addHandler();
        }
    };
    browseHandler = e => {
        e.stopPropagation();
        remote.dialog.showOpenDialog(
            remote.getCurrentWindow(),
            {
                properties: ["openFile", "openDirectory", "multiSelections"]
            },
            files => {
                if (files) {
                    files.forEach(path => {
                        this.props.dataStore.addCurrentGroupNewItem({
                            path: path,
                            type: "file"
                        });
                    });
                    this.props.viewStore.show_add_alert = false;
                }
            }
        );
    };
    testValue = path => {
        let res = test_path(path);
        if (res.type === "invalid") {
            this.setState({
                valid: false,
                type: false,
                parsedValue: ""
            });
        } else {
            this.setState({
                valid: true,
                type: res.type,
                parsedValue: res.path
            });
        }
    };
    addHandler = e => {
        this.props.dataStore.addCurrentGroupNewItem({
            path: this.state.parsedValue,
            type: this.state.type
        });
        this.props.viewStore.show_add_alert = false;
    };
    render() {
        return (
            <View dismissHandler={this.dismissHandler}>
                <Context>
                    <div className="text">
                        <FormattedMessage id="alert.add.t1" />{" "}
                        <FormattedMessage id="alert.add.t2">
                            {txt => (
                                <span onClick={this.browseHandler}>{txt}</span>
                            )}
                        </FormattedMessage>
                    </div>
                    <FormattedMessage id="alert.add.eg">
                        {txt => (
                            <input
                                autoFocus
                                onFocus={() => {
                                    this.setState({ isTyping: true });
                                }}
                                onBlur={() => {
                                    this.setState({ isTyping: false });
                                }}
                                type="text"
                                value={this.state.value}
                                onChange={this.changeHandler}
                                onKeyPress={this.pressHandler}
                                placeholder={txt}
                                ref={this.input_ref}
                            />
                        )}
                    </FormattedMessage>
                </Context>
                <Actions>
                    <Action_button onClick={this.dismissHandler}>
                        <FormattedMessage id="alert.dismiss" />
                    </Action_button>
                    <Action_button
                        onClick={this.addHandler}
                        disable={!this.state.valid}
                    >
                        <FormattedMessage id="alert.ok" />
                    </Action_button>
                </Actions>
            </View>
        );
    }
}
export default Add_alert;
