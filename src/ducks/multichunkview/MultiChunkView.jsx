//this should take children and create a scrollable view of them, allowing the user to select a single one.
import React, { Component } from 'react';

import ChunkView from '../chunkview/ChunkView';

// styling for the MCV
const compStyle = {
    display : 'inline-block',
    overflow: 'scroll',
    display: 'flex',
    
};

// render a series of side-scrollable ChunkViews
export default class MultiChunkView extends Component {
    constructor(props) {
        super(props);
        this.style = compStyle;
        this.replaceMulti = this.replaceMulti.bind(this); //wtf does this do
    }

    //this takes the target (button) and extracts the associated chunkid
    replaceMulti(chunkid) {
        this.replaceMulti(chunkid);
    }
    
    render(){
       return(
            <div className="MultiChunkView" style={compStyle}>
              {this.props.chunks.map((chunk) => {
                  return <div className="MCV_WINDOW">
                           <ChunkView id={'mcv'+ chunk.chunkid} text={chunk.text} style={{display:'block'}}/>
                           <button chunkid={chunk.chunkid}>Read On</button>
                         </div>
                  ;
              })}
            </div>
        );
    }
}
