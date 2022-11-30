import React from "react";
import ContentEditable from "react-contenteditable";

class EditablePage extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.contentEditable = React.createRef();
    this.state = {
        html: "",
        tag: "h1",
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

  render() {
    return (
      <ContentEditable
      className="editable"
      innerRef={this.contentEditable}
      html={this.state.html}
      tagName={this.state.tag}
      onChange={this.onChangeHandler}
      />
    );
  }
}

export default EditablePage;