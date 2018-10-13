import React, { Component } from "react";
import styled from "styled-components";
const style_var = require("../style_var.json");

const Bg = styled.div`
    position: fixed;
    background: ${style_var.colorBase.whiteO};
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 5;
`;

const Mask = props => {
    return (
        <Bg
            onClick={e => {
                e.stopPropagation();
                try {
                    props.clickHandler();
                } catch (e) {
                    return;
                }
            }}
        />
    );
};

export default Mask;
