import React from 'react';
import { v4 as uuidv4 } from 'uuid';
const initialState = { id: uuidv4(), html: "", tag: "h1"};

class BlockPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blocks: [initialState] };
  }

  render() {
    return (
      <div>
       {this.state.blocks.map((block) => {
        return (
            <div key={block.id} id={block.id}>
                Tag: {block.tag}, Content: {block.html}
            </div>
        )
       })}
      </div>
    );
  }
}

export default BlockPage;