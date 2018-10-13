import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
let style_var = require("../style_var.json");
let unit = style_var.spacing.unit;

let Button = styled.div`
    user-select: none;
    position: fixed;
    z-index: 2;
    text-align: center;
    width: ${unit * 26}px;
    bottom: ${unit * 2}px;
    padding: ${unit}px 0;
    left: 50vw;
    transform: translateX(-50%);
    background: ${style_var.colorBase.yellow};
    font-size: inherit;
    font-family: inherit;
    border-radius: 100px;
    color: ${style_var.colorBase.black};
    font-weight: ${style_var.font.weight.medium};
    border: 1px solid ${style_var.colorBase.black};
    transition-property: color, background, border;
    transition: ${style_var.transition.fast};
    &:hover {
        background: ${style_var.colorBase.black};
        color: ${style_var.colorBase.yellow};
    }
    animation: showup ${style_var.transition.spring};
    @keyframes showup {
        from {
            bottom: ${unit * -4}px;
        }
        to {
            bottom: ${unit * 2}px;
        }
    }
`;

// todo: key shortcut
const Cta = props => (
    <React.Fragment>
        {props.count == 0 ? null : (
            <Button onClick={props.clickHandler}>
                <FormattedMessage id="cta" values={{ count: props.count }} />
            </Button>
        )}
    </React.Fragment>
);

// class Cta extends Component {
//     clickHandler = () => {
//         this.p;
//     };
//     render() {
//         return (
//             <React.Fragment>
//                 {this.props.count == 0 ? null : (
//                     <Button onClick={this.clickHandler}>
//                         <FormattedMessage
//                             id="cta"
//                             values={{ count: this.props.count }}
//                         />
//                     </Button>
//                 )}
//             </React.Fragment>
//         );
//     }
// }

export default Cta;
