import debounce from "lodash/debounce";
import React from "react";
import styled, { css } from "styled-components";
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

@inject(["viewStore"])
@observer
class Add_alert extends React.Component {
    input_ref = React.createRef();
    state = {
        value: "",
        valid: false
    };
    dismissHander = e => {
        e.stopPropagation();
        console.log("dimiss");
        this.props.viewStore.show_add_alert = false;
    };
    changeHandler = e => {
        this.setState({
            value: e.target.value,
            valid: false
        });
        let res = test_path(e.target.value);
        if (res.type === "invalid") {
            this.setState({ valid: false });
        } else {
            this.setState({ valid: true });
        }
    };
    pressHandler = e => {
        if (e.key == "Enter" && this.state.value) {
            this.addHandler();
        }
    };
    addHandler = e => {
        console.log("add");
    };
    browseHandler = e => {
        e.stopPropagation();
        console.log("browse");
    };
    testHandler = debounce(path => {
        let res = test_path(path);
        if (res.type === "invalid") {
            this.setState({ valid: false });
        } else {
            this.setState({ valid: true });
        }
    }, 10);
    render() {
        return (
            <View dismissHandler={this.dismissHander}>
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
                    <Action_button onClick={this.dismissHander}>
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
