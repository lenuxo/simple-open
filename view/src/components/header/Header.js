import React from "react";
import styled from "styled-components";
const style_var = require("../style_var.json");
const unit = style_var.spacing.unit;
import Switcher from "./Switcher";

let Window_dragger = styled.div`
    -webkit-user-select: none;
    -webkit-app-region: drag;
    flex-basis: ${unit * 4}px;
    flex-grow: 0;
    flex-shrink: 0;
`;
let Container = styled.div`
    background: ${style_var.colorBase.white};
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    padding-bottom: ${unit}px;
    border: none;
    border-bottom: ${props =>
        props.isScrolled && `1px solid ${style_var.colorBase.greyL1}`};
    transition: ${style_var.transition.fast};
`;

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isScrolled: false
        };
    }
    render() {
        return (
            <Container isScrolled={this.state.isScrolled}>
                <Window_dragger />
                <Switcher />
            </Container>
        );
    }
}

export default Header;
