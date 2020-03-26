//this should take children and create a scrollable view of them, allowing the user to select a single one.
import React, { Component } from 'react';

import ChunkView from '../chunkview/ChunkView';

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
        var chunkpanes = [];
        for (const i in this.props.chunkviews){
            chunkpanes.push(
                <div style={{display:'inline-block'}}>
                  <ChunkView chunkid={i.chunkid} text={i.text}/>
                  <button onClick={this.replaceMulti} chunkid={i.chunkid}>follow this story</button> 
                </div>
            );
        }
        return(
            <div className="MultiChunkView" style={compStyle}>
              {chunkpanes}
            </div>
        );
    }
}
