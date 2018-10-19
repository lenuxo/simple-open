import React from "react";
import styled from "styled-components";
let style_var = require("../style_var.json");
let unit = style_var.spacing.unit;
const Button = styled.div`
    color: ${props => props.color || style_var.colorBase.black};
    padding: ${unit * 2}px 0;
    flex-grow: 1;
    flex-shrink: 1;
    .text {
        margin: 0 auto;
        padding: ${unit}px ${unit * 2}px;
        font-weight: ${style_var.font.weight.medium};
        transition: ${style_var.transition.fast};
        &:hover {
            text-shadow: ${style_var.textshadow};
        }
        &.disable {
            color: ${style_var.colorBase.greyL2};
            &:hover {
                text-shadow: none;
            }
        }
    }
`;

const Action_button = props => (
    <Button color={props.color} className={props.className} id={props.id}>
        <div
            className={props.disable ? "text disable" : "text"}
            onClick={
                props.disable
                    ? e => {
                          e.stopPropagation();
                      }
                    : props.onClick
            }
        >
            {props.children}
        </div>
    </Button>
);

export default Action_button;
