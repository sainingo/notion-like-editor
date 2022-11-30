import React from "react";
import ContentEditable from "react-contenteditable";
import { getCaretCoordinates } from "./helpers/getCaretCoordinate";
import { setCaretToEnd } from "./helpers/setCaretToEnd";
import SelectMenu from "./SelectMenu";

class EditablePage extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    this.openSelectMenuHandler = this.openSelectMenuHandler.bind(this);
    this.closeSelectMenuHandler = this.closeSelectMenuHandler.bind(this);
    this.tagSelectionHandler = this.tagSelectionHandler.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.contentEditable = React.createRef();
    this.state = {
        htmlBackup: null,
        html: "",
        tag: "p",
        previousKey: "",
        selectMenuOpen: false,
        selectMenuPosition: {
          x: null,
          y: null,
        }
    };
  }


  componentDidMount() {
    this.setState({ html: this.props.html, tag: this.props.tag });
  }

  componentDidUpdate(prev, prevState) {
    const htmlChanged = prevState.html !== this.state.html;
    const tagChanged = prevState.tag !== this.state.tag;
    if (htmlChanged || tagChanged) {
      this.props.onChange({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
      });
    }
  }

  onChangeHandler(event) {
    this.setState({ html: event.target.value });
  }

  onKeyDownHandler(event) {
    if(event.key === "/") {
      this.setState({htmlBackup: this.state.html});
    }
    if(event.key === "Enter") {
      if(this.state.previousKey !== "Shift") {
        event.preventDefault();
        this.props.addBlock({
          id: this.props.id,
          ref: this.contentEditable.current,
        });
      }
    }

    if(event.key === "Backspace" && this.state.html === "") {
      event.preventDefault();
      this.props.deleteBlock({
        id: this.props.id,
        ref: this.contentEditable.current,
      });
    }
    this.setState({previousKey: event.key});
  }

  onKeyUpHandler(event) {
    if(event.key === "/") {
      this.openSelectMenuHandler(event);
    }
  }

  openSelectMenuHandler(event) {
    const { x , y} = getCaretCoordinates();
    this.setState({
      selectMenuOpen: true,
      selectMenuPosition: {x, y }
    });
    document.addEventListener("click", this.closeSelectMenuHandler);
  }


  closeSelectMenuHandler(event) {
    this.setState({
      htmlBackup: null,
      selectMenuOpen: false,
      selectMenuPosition: {
        x: null,
        y: null,
      }
    });
    document.removeEventListener("click", this.closeSelectMenuHandler);
  }

  tagSelectionHandler(tag) {
    this.setState({tag, html: this.state.htmlBackup}, () => {
      setCaretToEnd(this.contentEditable.current);
      this.closeSelectMenuHandler();
    });
  }

  render() {
    return (
     < >
      {this.state.selectMenuOpen && (
        <SelectMenu 
        position = {this.state.selectMenuPosition}
        onSelect = {this.tagSelectionHandler}
        close = {this.closeSelectMenuHandler}
        />
        )}
        <ContentEditable 
        className="p-2 focus:outline-none"
        innerRef={this.contentEditable}
        html={this.state.html}
        tagName={this.state.tag}
        onChange={this.onChangeHandler}
        onKeyDown={this.onKeyDownHandler}
        onKeyUp={this.onKeyUpHandler}
        />
     </>
    );
  }
}

export default EditablePage;