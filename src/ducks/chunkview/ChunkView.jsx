import React, { Component } from 'react';

export default class ChunkView extends Component {
    render() {
        return(
            <div className="ChunkView">
              <h3>{ this.props.chunkid }</h3>
              <p>{ this.props.text }</p>
            </div>
        );
    }
}
