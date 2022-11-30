import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import EditablePage from './EditablePage';
import { setCaretToEnd } from './helpers/setCaretToEnd';
const initialState = { id: uuidv4(), html: "", tag: "p"};

class BlockPage extends React.Component {
  constructor(props) {
    super(props);
    this.updatePageHandler = this.updatePageHandler.bind(this);
    this.addBlockHandler = this.addBlockHandler.bind(this);
    this.deleteBlockHandler = this.deleteBlockHandler.bind(this);
    this.state = { blocks: [initialState] };
  }

  updatePageHandler(updatedBlock) {
    const blocks = this.state.blocks;
    const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
    const newBlocks = [...blocks];
    newBlocks[index] = {
        ...newBlocks[index],
        tag: updatedBlock.tag,
        html: updatedBlock.html,
    };
    this.setState({ blocks: newBlocks });
  }

  addBlockHandler(currentBlock) {
    const newBlocks = { id: uuidv4(), html: "", tag: "p" };
    const blocks = this.state.blocks;
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index + 1, 0, newBlocks);
    this.setState({ blocks: updatedBlocks }, () => {
        currentBlock.ref.nextElementSibling.focus();
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
            setCaretToEnd(prevBlock);
            prevBlock.focus();
        });
    }
  }

  render() {
    return (
      <div className='mt-4 bg-gray-100 p-4 w-full'>
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