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
  #list-container {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(${style_var.spacing.unit * 28}px, 1fr)
    );
  }
`;

@inject("viewStore", "dataStore")
@observer
class List_view extends React.Component {
  constructor(props) {
    super(props);
    this.listview_ref = React.createRef();
    this.scroller_ref = React.createRef();
  }
  scrollHandler = e => {
    if (this.scroller_ref.current.scrollTop > 16) {
      this.props.viewStore.list_scrolled = true;
    } else {
      this.props.viewStore.list_scrolled = false;
    }
  };
  open_all = () => {
    let items = this.props.dataStore.getAllCurrentItems;
    ipcRenderer.send("item-open", items);
  };
  componentDidMount() {
    ipcRenderer.on("item-delete", (event, data) => {
      this.props.dataStore.deleteItemFromCurrentGroup(data.id);
    });
  }
  render() {
    return (
      <View onScroll={this.scrollHandler} innerRef={this.scroller_ref}>
        <div ref={this.listview_ref} id="list-container">
          {!this.props.dataStore.dataLoaded ? (
            <React.Fragment>
              <List_item isLoading />
              <List_item isLoading />
              <List_item isLoading />
              <List_item isLoading />
              <List_item isLoading />
            </React.Fragment>
          ) : (
            <React.Fragment>
              {this.props.dataStore.userData.groups[
                this.props.dataStore.getCurrentGroupIndex
              ].items.map((item, index) => (
                <List_item
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
            isEmpty={this.props.dataStore.getCurrentGroupItemsLength === 0}
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
