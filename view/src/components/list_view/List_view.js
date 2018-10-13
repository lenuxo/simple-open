import React from "react";
import { observer, inject } from "mobx-react";
import Add_new from "./Add_new";
import styled from "styled-components";
let style_var = require("../style_var.json");

import List_item from "./List_item";

const View = styled.div`
    flex-grow: 1;
    overflow: auto;
    padding: 16px;
    user-select: none;
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: ${style_var.colorBase.white};
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 999px;
        background: ${style_var.colorBase.greyL2};
        &:hover {
            background: ${style_var.colorBase.black};
        }
    }
`;

let test_arr = [];
for (let i = 0; i < 10; i++) {
    test_arr.push({
        name: "Something sdfiweuiofweof sdjwkekl sd",
        path: "~/so/sdf/sdk/jf/kls/djkfjg/longppath"
    });
}

@observer
class List_view extends React.Component {
    constructor(props) {
        super(props);
        this.listview_ref = React.createRef();
        this.state = {
            listitem_width: "",
            isLoading: false,
            isEmpty: false
        };
        this.get_item_width = this.get_item_width.bind(this);
        this.set_item_width = this.set_item_width.bind(this);
    }
    get_item_width() {
        let view_width = this.listview_ref.current.clientWidth;
        let item_margin = 16;
        let min_width = 248 + item_margin;
        let dif = (view_width % min_width) / parseInt(view_width / min_width);
        let result = dif + min_width - item_margin;
        return result;
    }
    set_item_width() {
        this.setState({
            listitem_width: this.get_item_width()
        });
    }
    componentDidMount() {
        this.set_item_width();
        window.addEventListener("resize", this.set_item_width);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.set_item_width);
    }
    render() {
        return (
            <View>
                <div
                    ref={this.listview_ref}
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        flexWrap: "wrap"
                    }}
                >
                    {this.state.isLoading ? (
                        <React.Fragment>
                            <List_item
                                isLoading
                                width={this.state.listitem_width}
                            />
                            <List_item
                                isLoading
                                width={this.state.listitem_width}
                            />
                            <List_item
                                isLoading
                                width={this.state.listitem_width}
                            />
                            <List_item
                                isLoading
                                width={this.state.listitem_width}
                            />
                            <List_item
                                isLoading
                                width={this.state.listitem_width}
                            />
                        </React.Fragment>
                    ) : (
                        test_arr.map((item, index) => (
                            <List_item
                                key={index}
                                width={this.state.listitem_width}
                                name={item.name}
                                path={item.path}
                                icon={item.icon}
                            />
                        ))
                    )}
                </div>
                {!this.state.isLoading && (
                    <Add_new isEmpty={this.state.isEmpty} />
                )}
            </View>
        );
    }
}

export default List_view;
