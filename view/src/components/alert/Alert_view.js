import React from "react";
import styled from "styled-components";
let style_var = require("../style_var.json");
let unit = style_var.spacing.unit;

const Container = styled.div`
    user-select: none;
    z-index: 5;
    position: absolute;
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
        background: ${style_var.colorBase.white};
        border: 1px solid ${style_var.colorBase.greyL2};
        box-shadow: ${style_var.shadow};
        border-radius: ${unit * 1}px;
        text-align: center;
        .context {
            padding-left: ${unit * 4}px;
            padding-right: ${unit * 4}px;
        }
    }
`;
const Alert_container = props => (
    <Container onClick={props.dismissHandler}>
        <div className="view" onClick={e => e.stopPropagation()}>
            {props.children}
        </div>
    </Container>
);

export default Alert_container;
