import React, { Component } from "react";
import styled from "styled-components";
const style_var = require("../style_var.json");
const unit = style_var.spacing.unit;
import Pop_menu from "./Pop_menu";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";

const Loading = styled.div`
    align-self: flex-start;
    flex-grow: 0;
    flex-shrink: 0;
    background: ${style_var.colorBase.greyL1};
    border-radius: 4px;
    height: 34px;
    width: ${unit * 30}px;
    margin-left: ${unit * 3}px;
    animation: loading ${style_var.transition.slow} alternate infinite;
    @keyframes loading {
        from {
            background: ${style_var.colorBase.greyL1};
        }
        to {
            background: ${style_var.colorBase.greyL2};
        }
    }
`;
const Container = styled.div`
    align-self: flex-start;
    flex-grow: 0;
    flex-shrink: 0;
    margin-left: ${unit * 2}px;
    border-radius: 999px;
    background: ${props => props.hovered && style_var.colorBase.greyL1};
    transition: all ${style_var.transition.fast};
    padding: ${unit}px;
    padding-right: ${unit * 2}px;
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
    .arrow {
        svg {
            float: left;
            width: ${unit * 2}px;
            height: ${unit * 2}px;
            .stroke {
                stroke: ${style_var.colorBase.black};
                fill: ${props => props.hovered && style_var.colorBase.black};
            }
            .polyline {
                stroke: ${props => props.hovered && style_var.colorBase.greyL1};
            }
        }
    }
    .group-name {
        padding-left: ${unit}px;
        font-weight: ${style_var.font.weight.medium};
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: calc(100vw - ${unit * 19}px);
    }
    .actions {
        margin-left: ${unit * 2}px;
        overflow: hidden;
        height: 16px;
        width: ${props => (props.hovered ? "48px" : "0")};
        opacity: ${props => (props.hovered ? 1 : 0)};
        transition: ${style_var.transition.fast};
        .action {
            float: left;
            width: 16px;
            height: 16px;
            margin-left: ${unit}px;
            svg {
                float: left;
                path {
                    fill: ${style_var.colorBase.greyL2};
                }
            }
        }
        .action:hover {
            svg path {
                fill: ${style_var.colorBase.black};
            }
        }
    }
`;

@inject(["viewStore"])
@observer
class Switcher extends Component {
    @observable
    store = {
        isHover: false
    };
    componentDidMount() {}
    hoverHandler = e => {
        if (e.type == "mouseover") {
            this.store.isHover = true;
        } else {
            this.store.isHover = false;
        }
    };
    togglePopHandler = e => {
        if (!e) {
            this.props.viewStore.show_pop_menu = false;
        } else {
            this.props.viewStore.show_pop_menu = true;
        }
    };
    editHandler = e => {
        e.stopPropagation();
        // TODO: edit group name
    };
    deleteHandler = e => {
        e.stopPropagation();
        // TODO: delete this group
        this.props.viewStore.show_alert = true;
    };
    render() {
        if (this.props.viewStore.header_loading) {
            return <Loading />;
        } else {
            return (
                <React.Fragment>
                    <Container
                        hovered={this.store.isHover}
                        poped={this.props.viewStore.show_pop_menu}
                        onMouseOver={this.hoverHandler}
                        onMouseLeave={this.hoverHandler}
                        onClick={this.togglePopHandler}
                    >
                        <div className="arrow">
                            <svg viewBox="0 0 16 16" version="1.1">
                                <g
                                    id="Artboard"
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd"
                                >
                                    <circle
                                        id="Oval"
                                        className="stroke"
                                        fillRule="nonzero"
                                        cx="8"
                                        cy="8"
                                        r="7.5"
                                    />
                                    <polyline
                                        id="Ar"
                                        className="stroke polyline"
                                        fillRule="nonzero"
                                        points="5 7 8 10 11 7"
                                    />
                                </g>
                            </svg>
                        </div>
                        <div className="group-name">
                            <span>
                                {this.props.viewStore.current_group_name}
                            </span>
                        </div>
                        <div className="actions" role="action">
                            <div
                                role="action"
                                className="action edit"
                                onClick={this.editHandler}
                            >
                                <svg
                                    width="16px"
                                    height="16px"
                                    viewBox="0 0 16 16"
                                    version="1.1"
                                >
                                    <g
                                        id="Artboard"
                                        stroke="none"
                                        strokeidth="1"
                                        fill="none"
                                        fillRule="evenodd"
                                    >
                                        <g id="Group">
                                            <rect
                                                id="Rectangle-path"
                                                fill="#000000"
                                                fillRule="nonzero"
                                                opacity="0"
                                                x="0"
                                                y="0"
                                                width="16"
                                                height="16"
                                            />
                                            <path
                                                d="M12.2857143,0.5 L10.1428571,2.64046838 L13.3571429,5.85117095 L15.5,3.71070257 L12.2857143,0.5 Z M0.5,12.2725761 L0.516741071,15.5 L3.71428571,15.4832776 L12.2857143,6.92140514 L9.07142857,3.71070257 L0.5,12.2725761 Z M3.71428571,14.4130434 L1.57142857,14.4130434 L1.57142857,12.2725761 L2.64285714,12.2725761 L2.64285714,13.3428103 L3.71428571,13.3428103 L3.71428571,14.4130434 Z"
                                                id="Fill-1"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div
                                role="action"
                                className="action delete"
                                onClick={this.deleteHandler}
                            >
                                <svg
                                    width="16px"
                                    height="16px"
                                    viewBox="0 0 16 16"
                                    version="1.1"
                                >
                                    <g
                                        id="Artboard-Copy"
                                        stroke="none"
                                        strokeWidth="1"
                                        fill="none"
                                        fillRule="evenodd"
                                    >
                                        <g id="delete" fillRule="nonzero">
                                            <rect
                                                id="Rectangle-path"
                                                fill="#000000"
                                                opacity="0"
                                                x="0"
                                                y="0"
                                                width="16"
                                                height="16"
                                            />
                                            <path
                                                d="M14,3.07692308 L10.1538462,3.07692308 L10.1538462,1.84615384 C10.1538462,1.16923077 9.6,0.615384609 8.92307692,0.615384609 L7.07692308,0.615384609 C6.4,0.615384609 5.84615384,1.16923077 5.84615384,1.84615384 L5.84615384,3.07692308 L2,3.07692308 C1.75384616,3.07692308 1.53846153,3.29230769 1.53846153,3.53846153 L1.53846153,4.46153847 C1.53846153,4.70769231 1.75384614,4.92307694 2,4.92307692 L14,4.92307692 C14.2461538,4.92307692 14.4615385,4.70769231 14.4615385,4.46153847 L14.4615385,3.53846153 C14.4615385,3.29230769 14.2461539,3.07692306 14,3.07692308 Z M7.07692308,2.15384616 C7.07692308,1.96923077 7.2,1.84615384 7.38461539,1.84615384 L8.61538461,1.84615384 C8.8,1.84615384 8.92307692,1.96923077 8.92307692,2.15384616 L8.92307692,3.07692308 L7.07692308,3.07692308 L7.07692308,2.15384616 Z M12.7692308,6.15384616 L3.23076923,6.15384616 C2.98461539,6.15384616 2.76923077,6.36923077 2.76923077,6.61538461 L2.76923077,13.8461538 C2.76923077,14.7076923 3.44615384,15.3846154 4.30769231,15.3846154 L11.6923077,15.3846154 C12.5538462,15.3846154 13.2307692,14.7076923 13.2307692,13.8461538 L13.2307692,6.61538461 C13.2307692,6.36923077 13.0153846,6.15384614 12.7692308,6.15384616 Z M7.07692308,12.9230769 C7.07692308,13.1076923 6.95384616,13.2307692 6.76923077,13.2307692 L6.15384616,13.2307692 C5.96923077,13.2307692 5.84615384,13.1076923 5.84615384,12.9230769 L5.84615384,8.61538461 C5.84615384,8.43076922 5.96923077,8.3076923 6.15384616,8.30769231 L6.76923077,8.30769231 C6.95384616,8.30769231 7.07692308,8.43076923 7.07692308,8.61538461 L7.07692308,12.9230769 Z M10.1538462,12.9230769 C10.1538462,13.1076923 10.0307692,13.2307692 9.84615384,13.2307692 L9.23076923,13.2307692 C9.04615384,13.2307692 8.92307692,13.1076923 8.92307692,12.9230769 L8.92307692,8.61538461 C8.92307692,8.43076922 9.04615384,8.3076923 9.23076923,8.30769231 L9.84615384,8.30769231 C10.0307692,8.30769231 10.1538462,8.43076923 10.1538462,8.61538461 L10.1538462,12.9230769 Z"
                                                id="Shape"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </Container>
                    {this.props.viewStore.show_pop_menu && (
                        <Pop_menu dismissHandler={this.togglePopHandler} />
                    )}
                </React.Fragment>
            );
        }
    }
}
export default Switcher;
