import React from "react";
import { ipcRenderer } from "electron";
import { observer, inject } from "mobx-react";
import Add_new from "./Add_new";
import Cta from "./Cta";
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

@inject("viewStore", "dataStore")
@observer
class List_view extends React.Component {
    constructor(props) {
        super(props);
        this.listview_ref = React.createRef();
        this.scroller_ref = React.createRef();
        this.state = {
            listitem_width: ""
        };
    }
    scrollHandler = e => {
        if (this.scroller_ref.current.scrollTop > 16) {
            this.props.viewStore.list_scrolled = true;
        } else {
            this.props.viewStore.list_scrolled = false;
        }
    };
    get_item_width = () => {
        // mount时读取，没有减掉scrollbar的宽度
        let view_width = this.listview_ref.current.clientWidth - 8;
        let item_margin = 16;
        let min_width = 248 + item_margin;
        let dif = (view_width % min_width) / parseInt(view_width / min_width);
        let result = dif + min_width - item_margin;
        return parseInt(result);
    };
    set_item_width = () => {
        this.setState({
            listitem_width: this.get_item_width()
        });
    };
    open_all = () => {
        let items = this.props.dataStore.getAllCurrentItems;
        ipcRenderer.send("item-open", items);
    };
    componentDidMount() {
        this.set_item_width();
        window.addEventListener("resize", this.set_item_width);
        ipcRenderer.on("item-delete", (event, data) => {
            this.props.dataStore.deleteItemFromCurrentGroup(data.id);
        });
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.set_item_width);
    }
    render() {
        return (
            <View onScroll={this.scrollHandler} innerRef={this.scroller_ref}>
                <div
                    ref={this.listview_ref}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        flexWrap: "wrap"
                    }}
                >
                    {!this.props.dataStore.dataLoaded ? (
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
                        <React.Fragment>
                            {this.props.dataStore.userData.groups[
                                this.props.dataStore.getCurrentGroupIndex
                            ].items.map((item, index) => (
                                <List_item
                                    width={this.state.listitem_width}
                                    key={index}
                                    itemId={item.id}
                                    name={item.name}
                                    path={item.path}
                                    type={item.type}
                                    iconPath={item.iconPath}
                                    invalid={!item.valid}
                                    isUrl={item.isUrl}
                                    isFile={item.isFile}
                                    isDir={item.isDir}
                                />
                            ))}
                            <Cta
                                count={this.props.dataStore.countValidItems}
                                boom={this.open_all}
                            />
                        </React.Fragment>
                    )}
                </div>
                {this.props.dataStore.dataLoaded && (
                    <Add_new
                        isEmpty={
                            this.props.dataStore.getCurrentGroupItemsLength ===
                            0
                        }
                        browse={() => {
                            this.props.viewStore.show_add_alert = true;
                        }}
                    />
                )}
            </View>
        );
    }
}

export default List_view;
