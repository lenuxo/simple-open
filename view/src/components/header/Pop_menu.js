import React, { Component } from "react";
import styled from "styled-components";
const style_var = require("../style_var.json");
const unit = style_var.spacing.unit;
import Mask from "../cover/Mask";
import { FormattedMessage } from "react-intl";

const Menu = styled.div`
    user-select: none;
    position: absolute;
    z-index: 10;
    top: ${props => props.top}px;
    left: ${unit * 2}px;
    background: ${style_var.colorBase.white};
    border: 1px solid ${style_var.colorBase.greyL2};
    border-radius: ${unit}px;
    max-height: calc(100vh - ${props => props.top}px - ${unit * 2}px);
    min-width: ${unit * 30}px;
    max-width: calc(100vw - ${unit * 4}px);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-shadow: ${style_var.shadow};
    animation: drop ${style_var.transition.spring};
    @keyframes drop {
        from {
            transform: translateY(-16px);
        }
        to {
            transform: translateY(0);
        }
    }
`;
const Group_list = styled.div`
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: ${style_var.colorBase.white};
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 999px;
        background: ${style_var.colorBase.greyL2};
        &:hover {
            background: ${style_var.colorBase.black};
        }
    }
`;
const Group = styled.div`
    padding: ${unit}px ${unit * 2}px;
    margin: ${unit}px 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    &:hover {
        background: ${style_var.colorBase.greyL1};
    }
    &.selected {
        font-weight: ${style_var.font.weight.medium};
        background: ${style_var.colorBase.yellow};
    }
`;
const Add_group = styled.div`
    border-top: 1px solid ${style_var.colorBase.greyL1};
    flex-grow: 0;
    flex-shrink: 0;
    padding: ${unit * 2}px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .icon {
        margin-right: ${unit}px;
        svg {
            float: left;
            height: ${unit * 2}px;
            width: ${unit * 2}px;
            path {
                fill: ${style_var.colorBase.black};
            }
        }
    }
    &:hover {
        background: ${style_var.colorBase.greyL1};
    }
`;

let test_arr = [];
for (let i = 0; i < 8; i++) {
    test_arr.push({
        name: "group nas sdfk dfsd me sjdfkjsd kj fklsj sdlfsd dklfjklsdj"
    });
}
class Pop_menu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.dismissMenu = this.dismissMenu.bind(this);
    }
    dismissMenu() {
        //dismiss menu
        this.props.dismissHandler();
    }
    render() {
        return (
            <React.Fragment>
                <Mask clickHandler={this.dismissMenu} />
                <Menu top={"74"}>
                    <Group_list>
                        {test_arr.map((group, index) => (
                            <Group key={index}>{group.name}</Group>
                        ))}
                    </Group_list>
                    <Add_group>
                        <div className="icon">
                            <svg
                                viewBox="0 0 28 28"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g
                                    id="final"
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd"
                                >
                                    <g
                                        id="Artboard-Copy-20"
                                        transform="translate(-308.000000, -132.000000)"
                                        fillRule="nonzero"
                                    >
                                        <g
                                            id="Group"
                                            transform="translate(24.000000, 114.000000)"
                                        >
                                            <g
                                                id="add"
                                                transform="translate(282.000000, 16.000000)"
                                            >
                                                <rect
                                                    id="Rectangle-path"
                                                    fill="#000000"
                                                    opacity="0"
                                                    x="0"
                                                    y="0"
                                                    width="32"
                                                    height="32"
                                                />
                                                <path
                                                    d="M24.3752336,29.9603269 L7.62198428,29.9603269 C4.54074538,29.9603269 2.04032866,27.4612853 2.04032866,24.3786713 L2.04032866,7.62539 C2.04032866,4.54005784 4.54074538,2.03960916 7.62198428,2.03960916 L24.3752656,2.03960916 C27.4619088,2.03960916 29.9596713,4.54002587 29.9596713,7.62539 L29.9596713,24.3786713 C29.9596394,27.4612533 27.4619088,29.9603269 24.3752336,29.9603269 Z M27.1701706,9.02149944 C27.1701706,6.70780412 25.2914444,4.83182803 22.9791242,4.83182803 L9.01809372,4.83182803 C6.70577347,4.83182803 4.82973344,6.70780413 4.82973344,9.02149944 L4.82973344,22.9798117 C4.82973344,25.2961932 6.70577347,27.1694831 9.01809372,27.1694831 L22.9791241,27.1694831 C25.2914444,27.1694831 27.1701706,25.2961932 27.1701706,22.9798117 L27.1701706,9.02149944 Z M17.3947184,22.9798117 L14.6024995,22.9798117 L14.6024995,17.3981561 L9.01809372,17.3981561 L9.01809372,14.6031551 L14.6024995,14.6031551 L14.6024995,9.02149944 L17.3947184,9.02149944 L17.3947184,14.6031551 L22.9791242,14.6031551 L22.9791242,17.3981561 L17.3947184,17.3981561 L17.3947184,22.9798117 Z"
                                                    id="Shape"
                                                />
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <FormattedMessage id="add_group" tagName="div" />
                    </Add_group>
                </Menu>
            </React.Fragment>
        );
    }
}
export default Pop_menu;
