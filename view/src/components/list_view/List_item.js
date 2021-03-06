import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
let style_var = require("../style_var.json");
let unit = style_var.spacing.unit;
import { ipcRenderer } from "electron";

const Loading = styled.div`
  background: none;
  box-sizing: border-box;
  height: ${unit * 8}px;
  margin: ${unit * 1.5}px ${unit * 1}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  .icon {
    flex-basis: ${unit * 6}px;
    flex-shrink: 0;
    height: ${unit * 6}px;
    border-radius: ${unit / 2}px;
    background-color: ${style_var.colorBase.greyL1};
    animation: loading ${style_var.transition.slow} alternate infinite;
  }
  .text {
    border-radius: ${unit / 2}px;
    height: ${unit * 6}px;
    flex-grow: 1;
    flex-shrink: 1;
    margin-left: ${unit}px;
    background-color: ${style_var.colorBase.greyL1};
    animation: loading ${style_var.transition.slow} alternate infinite;
  }
  @keyframes loading {
    from {
      background: ${style_var.colorBase.greyL1};
    }
    to {
      background: ${style_var.colorBase.greyL2};
    }
  }
`;
const fadein = keyframes`${style_var.animation.fadein}`;
const Item = styled.div`
  background: ${style_var.colorBase.white};
  border-radius: ${unit * 0.5}px;
  box-sizing: border-box;
  height: ${unit * 8}px;
  padding: ${unit}px;
  padding-right: 0;
  margin: ${unit * 1.5}px ${unit * 1}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  animation: ${fadein} ${style_var.transition.fast};
  transition: background ${style_var.transition.fast};
  &:hover,
  &.selected {
    background: ${style_var.colorBase.greyL1};
    .menu svg {
      display: block;
    }
  }
  .icon {
    flex-basis: ${unit * 6}px;
    flex-shrink: 0;
    height: ${unit * 6}px;
    border-radius: ${unit / 2}px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .invalid-icon {
    opacity: 0.4;
    flex-basis: ${unit * 6}px;
    flex-shrink: 0;
    height: ${unit * 6}px;
    border-radius: ${unit / 2}px;
    background-color: ${style_var.colorBase.white};
    svg {
      float: left;
    }
    path {
      fill: ${style_var.colorBase.red};
    }
  }
  .text {
    opacity: ${props => props.invalid && 0.4};
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    align-content: stretch;
    justify-content: center;
    padding-left: ${unit}px;
    overflow: hidden;
    .name {
      font-size: ${style_var.font.size.m};
      font-weight: ${style_var.font.weight.normal};
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .path {
      font-size: ${style_var.font.size.s};
      font-weight: ${style_var.font.weight.normal};
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      direction: ltr;
      text-align: left;
    }
  }
  .menu {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: ${unit * 2}px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    .click-area {
      height: 24px;
    }
    svg {
      padding-right: ${unit}px;
      float: right;
      display: none;
    }
  }
`;

class List_item extends Component {
  state = {
    selected: false
  };
  clickMenuHandler = e => {
    e.preventDefault();
    ipcRenderer.send("show-list-item-menu", {
      mouse: {
        x: e.pageX,
        y: e.pageY
      },
      id: this.props.itemId,
      path: this.props.path,
      type: this.props.type,
      invalid: this.props.invalid
    });
  };
  doubleClickHandler = e => {
    e.stopPropagation();
    if (this.props.invalid) return;
    ipcRenderer.send("item-open", {
      type: this.props.type,
      path: this.props.path
    });
  };
  reverse_string = str => {
    if (!str) return;
    let splitString = str.split("");
    let reverseArr = splitString.reverse();
    return reverseArr.join("");
  };
  render() {
    return this.props.isLoading ? (
      <Loading>
        <div className="icon" />
        <div className="text" />
      </Loading>
    ) : (
      <Item
        invalid={this.props.invalid}
        className={this.state.selected && "selected"}
        onDoubleClick={this.doubleClickHandler}
        onContextMenu={this.clickMenuHandler}
        title={this.props.invalid ? "this file is invalid" : null}
      >
        {this.props.invalid ? (
          <div className="invalid-icon">
            <svg viewBox="0 0 48 48" version="1.1">
              <g id="Artboard" stroke="none" fill="none" fillRule="evenodd">
                <g id="ban">
                  <rect
                    id="Rectangle"
                    opacity="0"
                    x="0"
                    y="0"
                    width="48"
                    height="48"
                  />
                  <path
                    d="M24,2.00000002 C11.85,2.00000002 2.00000002,11.85 2.00000002,24 C2.00000002,36.1505 11.85,46 24,46 C36.1505,46 46,36.1505 46,24 C46,11.85 36.1505,2.00000002 24,2.00000002 Z M6,24 C6,19.75 7.47650002,15.8465 9.93950002,12.768 L35.2325,38.0605 C32.0465781,40.6151582 28.0836689,42.005043 24,42 C14.059,42 6,33.941 6,24 Z M38.0605,35.2325 L12.768,9.93950002 C15.9537684,7.38491376 19.9164958,5.99503086 24,6 C33.941,6 42,14.059 42,24 C42.005043,28.0836689 40.6151582,32.0465781 38.0605,35.2325 Z"
                    id="Shape"
                    fillRule="nonzero"
                  />
                </g>
              </g>
            </svg>
          </div>
        ) : (
          <div className="icon">
            {this.props.isUrl && (
              <img src={require("../../../../assets/icons/url-icon.svg")} />
            )}
            {this.props.isDir && (
              <img src={require("../../../../assets/icons/folder-icon.png")} />
            )}
            {this.props.isFile && <img src={this.props.iconPath} />}
          </div>
        )}
        <div
          className="text"
          title={this.props.invalid ? null : this.props.path}
        >
          <div className="name">{this.props.name}</div>
          <div className="path">{this.props.path}</div>
        </div>
        <div className="menu">
          <div className="click-area" onClick={this.clickMenuHandler}>
            <svg width="2px" height="10px" viewBox="0 0 2 10" version="1.1">
              <g
                id="Symbols"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="file/hover"
                  transform="translate(-238.000000, -8.000000)"
                  fill="#454545"
                  fillRule="nonzero"
                >
                  <g id="Group-2-Copy-3">
                    <g id="Group-5" transform="translate(238.000000, 8.000000)">
                      <rect id="Rectangle" x="0" y="0" width="2" height="2" />
                      <rect
                        id="Rectangle-Copy"
                        x="0"
                        y="4"
                        width="2"
                        height="2"
                      />
                      <rect
                        id="Rectangle-Copy-2"
                        x="0"
                        y="8"
                        width="2"
                        height="2"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </Item>
    );
  }
}
export default List_item;
