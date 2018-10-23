import { ipcRenderer } from "electron";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
let style_var = require("../style_var.json");
let unit = style_var.spacing.unit;

let Button = styled.div`
    user-select: none;
    position: fixed;
    z-index: 2;
    left: 50vw;
    bottom: ${unit * 2}px;
    text-align: center;
    box-sizing: border-box;
    padding: 0 ${unit * 3}px;
    height: ${unit * 5}px;
    min-width: ${unit * 25}px;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateX(-50%);
    background: ${props =>
        props.isHover ? style_var.colorBase.black : style_var.colorBase.yellow};
    color: ${props =>
        props.isHover ? style_var.colorBase.yellow : style_var.colorBase.black};
    box-shadow: ${style_var.ctashadow};
    font-weight: ${style_var.font.weight.medium};
    border-radius: 100px;
    transition: ${style_var.transition.fast};
    transition-property: color, background, border;
    animation: ${props =>
        !props.showed && `showup ${style_var.transition.spring}`};
    @keyframes showup {
        from {
            bottom: ${unit * -4}px;
        }
        to {
            bottom: ${unit * 2}px;
        }
    }
    animation: ${props =>
        props.clicked && `bounce ${style_var.transition.slow}`};
    @keyframes bounce {
        0% {
            transform: translate(-50%, 0);
        }
        40% {
            transform: translate(-50%, -16px);
        }
        100% {
            transform: translate(-50%, 0);
        }
    }
`;

class Cta extends Component {
    state = {
        clicked: false,
        isHover: false,
        showed: false
    };
    componentDidMount() {
        ipcRenderer.on("open-all", this.trigger);
    }
    componentWillUnmount() {
        ipcRenderer.removeListener("open-all", this.trigger);
    }
    trigger = e => {
        if (this.props.count < 1) return;
        this.setState({ clicked: true });
        this.props.boom();
    };
    render() {
        return (
            <React.Fragment>
                {this.props.count == 0 ? null : (
                    <Button
                        isHover={this.state.isHover}
                        clicked={this.state.clicked}
                        showed={this.state.showed}
                        onAnimationEnd={e => {
                            if (e.animationName == "showup") {
                                this.setState({ showed: true });
                            }
                            if (e.animationName == "bounce") {
                                this.setState({ clicked: false });
                            }
                        }}
                        onClick={this.trigger}
                        onMouseOver={() => {
                            this.setState({ isHover: true });
                        }}
                        onMouseLeave={() => {
                            this.setState({ isHover: false });
                        }}
                    >
                        <FormattedMessage
                            id="cta"
                            values={{ count: this.props.count }}
                        />
                    </Button>
                )}
            </React.Fragment>
        );
    }
}

export default Cta;
