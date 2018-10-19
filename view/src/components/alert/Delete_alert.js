import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
let style_var = require("../style_var.json");
let unit = style_var.spacing.unit;
import { observer, inject } from "mobx-react";
import Action_button from "./Action_button";
import View from "./Alert_view";

const Context = styled.div.attrs({ className: "context" })`
    padding-top: ${4 * unit}px;
    font-weight: ${style_var.font.weight.regular};
    .group-name {
        margin-top: ${unit}px;
        font-weight: ${style_var.font.weight.medium};
    }
`;
const Actions = styled.div`
    width: 100%;
    margin-top: ${unit * 3}px;
    display: flex;
    flex-direction: row;
`;

@inject(["viewStore"])
@observer
class Alert extends Component {
    componentDidMount() {
        document.addEventListener("keydown", this.escHandler);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.escHandler);
    }
    escHandler = e => {
        if (!this.props.viewStore.show_delete_alert) return;
        if (e.keyCode === 27) {
            this.props.viewStore.show_delete_alert = false;
        }
    };
    dismissHandler = e => {
        e.stopPropagation();
        this.props.viewStore.show_delete_alert = false;
    };
    deleteHandler = () => {
        // TODO: delete group
        console.log("====================================");
        console.log("delete");
        console.log("====================================");
    };
    render() {
        return (
            <View dismissHandler={this.dismissHandler}>
                <Context>
                    <FormattedMessage id="alert.context" tagName="div" />
                    <div className="group-name">
                        {this.props.viewStore.current_group_name}
                    </div>
                </Context>
                <Actions>
                    <Action_button onClick={this.dismissHandler}>
                        <FormattedMessage id="alert.dismiss" />
                    </Action_button>
                    <Action_button
                        onClick={this.deleteHandler}
                        color={style_var.colorBase.red}
                    >
                        <FormattedMessage id="alert.delete" />
                    </Action_button>
                </Actions>
            </View>
        );
    }
}

export default Alert;
