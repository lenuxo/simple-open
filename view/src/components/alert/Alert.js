import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
let style_var = require("../style_var.json");
let unit = style_var.spacing.unit;
import { observer, inject } from "mobx-react";

const Container = styled.div`
    user-select: none;
    z-index: 5;
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background: ${style_var.colorBase.whiteO};
    display: flex;
    justify-content: center;
    align-items: center;
    .view {
        @keyframes drop {
            from {
                transform: translateY(-16px);
            }
            to {
                transform: translateY(0);
            }
        }
        animation: drop ${style_var.transition.spring};
        min-width: ${unit * 30}px;
        margin: 0 ${unit * 3}px;
        padding: ${unit * 4}px ${unit * 3}px;
        padding-bottom: ${unit * 2}px;
        background: ${style_var.colorBase.white};
        border: 1px solid ${style_var.colorBase.greyL2};
        box-shadow: ${style_var.shadow};
        border-radius: ${unit * 1}px;
        text-align: center;
        .content {
            font-weight: ${style_var.font.weight.regular};
        }
        .actions {
            margin-top: ${unit * 3}px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        }
    }
    .action {
        flex-grow: 1;
        flex-shrink: 1;
        padding: ${unit}px;
        font-weight: ${style_var.font.weight.regular};
        &:hover {
            font-weight: ${style_var.font.weight.medium};
        }
        &.delete {
            color: ${style_var.colorBase.red};
        }
    }
`;

@inject(["viewStore"])
@observer
class Alert extends Component {
    dismissHandler = e => {
        if (!e.target.getAttribute("role")) return;
        this.props.viewStore.show_alert = false;
    };
    deleteHandler = () => {
        // TODO: delete group
    };
    render() {
        return (
            <Container onClick={this.dismissHandler} role="dismiss">
                <div className="view">
                    <div className="content">
                        <FormattedMessage id="alert.context" />
                        <br />
                        <span>{this.props.viewStore.current_group_name}</span>
                    </div>
                    <div className="actions">
                        <FormattedMessage id="alert.dismiss">
                            {txt => (
                                <div className="action dismiss" role="dismiss">
                                    {txt}
                                </div>
                            )}
                        </FormattedMessage>
                        <div
                            className="action delete"
                            onClick={this.deleteHandler}
                        >
                            <FormattedMessage id="alert.delete" />
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Alert;
