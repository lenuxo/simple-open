import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
const style_var = require("../style_var.json");
const unit = style_var.spacing.unit;

const Container = styled.div`
    z-index: 10;
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background: ${style_var.colorBase.whiteO};
    border: ${unit * 3}px solid ${style_var.colorBase.yellow};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
        width: ${unit * 4}px;
        height: ${unit * 4}px;
        margin-bottom: ${unit * 2}px;
        path {
            fill: ${style_var.colorBase.black};
        }
    }
    .content {
        text-align: center;
        color: ${style_var.colorBase.black};
        span:first-child {
            font-size: ${style_var.font.size.l};
            font-weight: ${style_var.font.weight.medium};
        }
        span:last-child {
            font-size: ${style_var.font.size.m};
        }
    }
`;

class Drop_cover extends React.Component {
    dropHandler() {
        // TODO: drop things here
    }
    render() {
        return (
            <Container>
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
                <div className="content">
                    <FormattedMessage
                        id="drop_cover.drop"
                        defaultMessage="DROP"
                    />
                    <br />
                    <FormattedMessage
                        id="drop_cover.here"
                        defaultMessage="here"
                    />
                </div>
            </Container>
        );
    }
}

export default Drop_cover;
