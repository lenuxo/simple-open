import React from "react";
import { FormattedMessage } from "react-intl";
import styled, { keyframes } from "styled-components";
import { observer } from "mobx-react";
let style_var = require("../style_var.json");
let unit = style_var.spacing.unit;

const fadein = keyframes`${style_var.animation.fadein}`;
const Container = styled.div`
    animation: ${fadein} ${style_var.transition.fast};
    width: 100%;
    margin-top: ${unit * 4}px;
    margin-bottom: ${unit * 7}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: ${style_var.font.weight.normal};
    color: ${style_var.colorBase.greyL2};
    .icon {
        width: ${unit * 2}px;
        height: ${unit * 2}px;
        margin-bottom: ${unit * 2}px;
        path {
            fill: ${style_var.colorBase.greyL2};
        }
    }
    .text {
        text-align: center;
        .browse {
            text-decoration: underline;
            transition: color ${style_var.transition.fast};
            &:hover {
                color: ${style_var.colorBase.black};
            }
        }
    }
    &.empty {
        margin-top: ${unit * 8}px;
        color: ${style_var.colorBase.greyL2};
        .icon {
            width: ${unit * 4}px;
            height: ${unit * 4}px;
            margin-bottom: ${unit * 2}px;
            path {
                fill: ${style_var.colorBase.greyL2};
            }
        }
        .text .line1 {
            font-size: ${style_var.font.size.l};
            font-weight: ${style_var.font.weight.medium};
        }
    }
`;

const Add_new = observer(props => (
    <Container className={props.isEmpty && "empty"}>
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
        {props.isEmpty ? (
            <div className="text">
                <FormattedMessage id="add_item.dnd">
                    {txt => <span className="line1">{txt}</span>}
                </FormattedMessage>
                <br />
                <FormattedMessage id="add_item.f">
                    {txt => <span className="line2">{txt}</span>}
                </FormattedMessage>
                <br />
                <span className="line3">
                    <FormattedMessage id="add_item.or" />
                    <FormattedMessage id="add_item.br">
                        {txt => (
                            <span className="browse" onClick={props.browse}>
                                {txt}
                            </span>
                        )}
                    </FormattedMessage>
                </span>
            </div>
        ) : (
            <div className="text">
                <FormattedMessage id="add_item.dnd">
                    {txt => <span className="line1">{txt}</span>}
                </FormattedMessage>
                <br />
                <span className="line3">
                    <FormattedMessage id="add_item.or" />
                    <FormattedMessage id="add_item.br">
                        {txt => (
                            <span className="browse" onClick={props.browse}>
                                {txt}
                            </span>
                        )}
                    </FormattedMessage>
                </span>
            </div>
        )}
    </Container>
));
export default Add_new;
