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
    z-index: 3;
    background: ${style_var.colorBase.white};
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    padding-bottom: ${unit}px;
    border: none;
    box-shadow: ${props => props.isScrolled && style_var.shadow};
    transition: ${style_var.transition.fast};
`;

class Header extends React.Component {
    render() {
        return (
            <Container isScrolled={this.props.scrolled}>
                <Window_dragger />
                <Switcher />
            </Container>
        );
    }
}

export default Header;
