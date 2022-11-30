import React from "react";
import ContentEditable from "react-contenteditable";

class EditablePage extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.contentEditable = React.createRef();
    this.state = {
        htmlBackup: null,
        html: "",
        tag: "h1",
        previousKey: "",
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



  render() {
    return (
      <ContentEditable
      className="editable"
      innerRef={this.contentEditable}
      html={this.state.html}
      tagName={this.state.tag}
      onChange={this.onChangeHandler}
      onKeyDown={this.onKeyDownHandler}
      />
    );
  }
}

export default EditablePage;