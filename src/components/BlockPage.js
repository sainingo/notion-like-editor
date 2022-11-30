import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import EditablePage from './EditablePage';
const initialState = { id: uuidv4(), html: "", tag: "h1"};

class BlockPage extends React.Component {
  constructor(props) {
    super(props);
    this.updatePageHandler = this.updatePageHandler.bind(this);
    this.addBlockHandler = this.addBlockHandler.bind(this);
    this.deleteBlockHandler = this.deleteBlockHandler.bind(this);
    this.state = { blocks: [initialState] };
  }

  updatePageHandler(block) {
    const blocks = this.state.blocks;
    const index = blocks.map((b) => b.id).indexOf(block.id);
    const newBlocks = [...blocks];
    newBlocks[index] = {
        ...newBlocks[index],
        tag: block.tag,
        html: block.html,
    };
    this.setState({ blocks: newBlocks });
  }

  addBlockHandler(currentBlock) {
    const newBlocks = { id: uuidv4(), html: "", tag: "h1" };
    const blocks = this.state.blocks;
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index + 1, 0, newBlocks);
    this.setState({ blocks: updatedBlocks }, () => {
        currentBlock.focus();
    });

  }

  deleteBlockHandler(currentBlock) {
    const prevBlock = currentBlock.ref.previousElementSibling;
    if(prevBlock) {
        const blocks = this.state.blocks;
        const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
        const updatedBlocks = [...blocks];
        updatedBlocks.splice(index, 1);
        this.setState({ blocks: updatedBlocks }, () => {
            // setCaretToEnd(prevBlock);
            prevBlock.focus();
        });
    }
  }

  render() {
    return (
      <div>
       {this.state.blocks.map((block, key) => {
        return (
            <EditablePage
            key={key}
            id={block.id}
            tag={block.tag}
            html={block.html}
            onChange={this.updatePageHandler}
            addBlock={this.addBlockHandler}
            deleteBlock={this.deleteBlockHandler}
            />
        )
       })}
      </div>
    );
  }
}

export default BlockPage;