import React, { Component } from "react";
import { render } from "react-dom";
import styled from "styled-components";
const style_var = require("./components/style_var.json");
import { shell } from "electron";

const Window_dragger = styled.div`
    -webkit-user-select: none;
    -webkit-app-region: drag;
    height: 32px;
    width: 100%;
`;
const About = styled.div`
    user-select: none;
    color: ${style_var.colorBase.black};
    font-size: ${style_var.font.size.m};
    font-family: ${style_var.font.family};
    font-weight: ${style_var.font.weight.regular};
    text-align: right;
    .icon {
        width: 300px;
        height: 330px;
        position: absolute;
        top: 48px;
        right: -150px;
        svg {
            float: right;
        }
    }
    .name {
        font-size: ${style_var.font.size.l};
        font-weight: ${style_var.font.weight.medium};
        position: absolute;
        top: 64px;
        right: 174px;
    }
    .version {
        position: absolute;
        top: 101px;
        right: 158px;
        padding: 8px 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .footer {
        position: absolute;
        bottom: 12px;
        right: 174px;
        font-size: ${style_var.font.size.s};
        font-weight: ${style_var.font.weight.medium};
        line-height: 21px;
        div {
            margin: 4px 0;
        }
        .link {
            text-decoration: underline;
        }
        .link:hover {
            text-shadow: ${style_var.textshadow};
        }
    }
`;
const languages = {
    zh: {
        feedback: "反馈",
        website: "主页"
    },
    en: {
        feedback: "Feedback",
        website: "Website"
    }
};
class Root extends Component {
    constructor() {
        super();
        this.state = {
            user_lang: "en"
        };
    }
    componentWillMount() {
        window.set_user_lang = lang => {
            if (lang) this.setState({ user_lang: lang });
        };
    }
    linkHandler = e => {
        e.preventDefault();
        let href = e.target.getAttribute("href");
        shell.openExternal(href);
    };
    render() {
        return (
            <About>
                <Window_dragger />
                <div className="icon">
                    <svg
                        width="300px"
                        height="330px"
                        viewBox="0 0 300 330"
                        version="1.1"
                    >
                        <defs>
                            <radialGradient
                                cx="87.6092275%"
                                cy="15.9471637%"
                                fx="87.6092275%"
                                fy="15.9471637%"
                                r="147.579818%"
                                gradientTransform="translate(0.876092,0.159472),scale(0.722222,1.000000),rotate(145.281738),translate(-0.876092,-0.159472)"
                                id="radialGradient-1"
                            >
                                <stop stopColor="#FFFFFF" offset="0%" />
                                <stop stopColor="#DDE2E5" offset="100%" />
                            </radialGradient>
                        </defs>
                        <g
                            id="final"
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                        >
                            <g id="Group-Copy" fillRule="nonzero">
                                <rect
                                    id="Rectangle-Copy"
                                    fill="#454545"
                                    x="0"
                                    y="0"
                                    width="300"
                                    height="330"
                                    rx="4"
                                />
                                <rect
                                    id="Rectangle-Copy"
                                    fill="#FFE70B"
                                    x="15"
                                    y="225"
                                    width="270"
                                    height="90"
                                    rx="4"
                                />
                                <rect
                                    id="Rectangle-Copy-2"
                                    fill="url(#radialGradient-1)"
                                    x="15"
                                    y="15"
                                    width="270"
                                    height="195"
                                    rx="4"
                                />
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="name">Simple Open</div>
                <div className="version">
                    <span className="v">
                        {require("../../package.json").version}
                    </span>
                </div>
                <div className="footer">
                    <div
                        role="feedback"
                        className="link"
                        href="https://github.com/lenuxo/simple-open/issues"
                        onClick={this.linkHandler}
                    >
                        {languages[this.state.user_lang].feedback}
                    </div>
                    <div
                        role="website"
                        className="link"
                        href="https://lenuxo.github.io/simple-open/"
                        onClick={this.linkHandler}
                    >
                        {languages[this.state.user_lang].website}
                    </div>
                    <div>
                        {"® 2018 "}
                        <span
                            role="cpr"
                            className="link"
                            href="http://duanjun.net"
                            onClick={this.linkHandler}
                        >
                            Duan
                        </span>
                    </div>
                </div>
            </About>
        );
    }
}
render(<Root />, document.getElementById("root"));
