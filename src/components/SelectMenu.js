import { matchSorter } from "match-sorter";
import React from "react";


const MENU_HEIGHT = 150;
const allowedTags = [
    {
        id: "page-title",
        tag: "h1",
        label: "Page Title",
    },
    {
        id: "heading-1",
        tag: "h2",
        label: "Heading 1",
    },
];

class SelectMenu extends React.Component {
    constructor(props) {
        super(props);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.state = {
            command: "",
            items: allowedTags,
            selected: 0,
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.keyDownHandler);
    }

    componentDidUpdate(prevProps, prevState) {
        const command = this.state.command;
        if(prevState.command !== command) {
            const items = matchSorter(allowedTags, command, {keys: ["tag"]});
            this.setState({items});
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDownHandler);
    }

    keyDownHandler(event) {
        const items = this.state.items;
        const selected = this.state.selected;
        const command = this.state.command;

        switch(event.key) {
            case "Enter":
                event.preventDefault();
                this.props.onSelect(items[selected].tag);
                break;
            case "Backspace":
                if(command.length > 0) {
                    this.setState({command: command.slice(0, -1)});
                }
                break;
            case "ArrowUp":
                event.preventDefault();
                const prevSelected = selected === 0 ? items.length - 1 : selected - 1;
                this.setState({selected: prevSelected});
                break;
            case "ArrowDown":
            case "Tab":
                event.preventDefault();
                const nextSelected = selected === items.length - 1 ? 0 : selected + 1;
                this.setState({selected: nextSelected});
                break;
            default:
                this.setState({command: this.state.command + event.key});
                break;
        }
    }

    render() {
        const x = this.props.position.x;
        const y = this.props.position.y - MENU_HEIGHT;
        const positionAttributes = { top: y, left: x };

        return (
            <div className="select-menu" style={positionAttributes}>
                <div>
                    {this.state.items.map((item, index) => {
                        const selectedItem = this.state.selectedItem;
                        const isSelected = this.state.items.indexOf(item) === selectedItem;

                        return(
                            <div
                                className={isSelected ? "selected" : ""}
                                key={item.id}
                                role= "button"
                                tabIndex= "0"
                                onClick={() => this.props.onSelect(item.tag)}
                            >
                                {item.label}
                                </div>
                        );
                    })}
                </div>
            </div>
        )
    }

}

export default SelectMenu;