import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchChunksAction from './fetchChunks';
import { getChunks, getChunksError, getChunksPending} from './reducers';


import LoadingSpinner from './LoadingSpinner';
import ChunkView from '../chunkview/ChunkView';
import MultiChunkView from '../multichunkview/MultiChunkView';
// import ChunkList from './ChunkList'; //		do I need this?

// this directory is going to need the following:
// types.js to define the action constants
// actions.js to define the action creators
// operations.js to hold the more complex thunks
// reducers.js to do state-changing magix
// selectors.js to do ???
// index.js to export things from the duck
// tests.js to stress out about later

class StoryPane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chunkid:1,//this should be settable later. Going to need a component.
            loading: false,
            chunks: [],
            items: []
        };
        this.replaceMulti = this.replaceMulti.bind(this);
    }

    componentDidMount() {
	// Create the event listener for infinite scroll.  Triggers at the bottom of the view.
	this.refs.myscroll.addEventListener("scroll", () => {
	    if (
		this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
		    this.refs.myscroll.scrollHeight
	    ) {
		//this.loadMore(); //TODO: fix up this loader 
	    }
	});
	// get all chunks from the server
	fetch('http://localhost:8080/chunks/'.concat(this.state.chunkid))
	    .then(res => res.json()).then(
		(result) => {
		    this.setState({
			chunks : result
		    });
		}
	    );
    }

    // TODO: limit the amount of items that this shows such that scrolling loads up more and gives branching options.
    getNextChunk(chunkid) {
        var chunklist = [];
        for ( const chunk in this.state.chunks ) {
            if (chunk.parent == chunkid) {
                chunklist.append(chunk);
            }
        }
        if (chunklist.length == 1) {
            //return a single chunkview
            return (<ChunkView chunkid={chunklist[0].id} text={chunklist[0].text}/>);
        } else if (chunklist.length == 0) {
            //return a bookend
            return (<ChunkView chunkid={null} text="and that's all, folks!"/>);
        } else {
            // return a scrollable chunk list
            var chunkviews = [];
            for (const chunk in chunklist) {
                chunkviews.append(<ChunkView chunkid={chunk.id} text={chunk.text}/>) ;
            }
            return (<MultiChunkView chunkviwews={this.state.chunkviews} onClick={this.replaceMulti}/>);
        }
    }

    showItems() {
        // Here, we should determine if a chunk has more than one child.  If so, it should render a scrollable, selectable list of chunks.
        // when a chunk is selected, that view should reduce to that chunk only and the component should load up the next batch of chunks.
        // before developing that feature, I should make fixtures populate a tree and use that.
        for (var i = this.state.items.length; i < this.state.chunks.length ; i++) {
            if (this.state.chunks[i].id)
	    this.state.items.push(<div>
				    <ChunkView chunkid={i} text={this.state.chunks[i].text}/>
				  </div>); //this should be loading chunks
	}
	return this.state.items;
    }

    // this should take a lifted chunkid and replace the multichunkview with a chunkview, then
    // call getNextChunk recursively
    replaceMulti(chunkid){
        this.state.items.pop();
        this.state.items.push(<ChunkView chunkid={chunkid} text={this.state.chunks[chunkid].text}/>);
    }

    render() {
	return (
	    <div
	      className="StoryPane"
	      ref="myscroll"
	      style={{ height:"420px", overflow:"auto"}}>
	      <header className="Storyviewer-header">
		<h1 className="SV-Title">SV TITLE</h1>
	      </header>
	      <ul>
		{this.showItems()}
	      </ul>
              <MultiChunkView chunks={this.state.chunks}/>
	    </div>
        );
    }
}

const mapStateToProps = state => ({
    error : getChunksError(state),
    chunks : getChunks(state),
    pending : getChunksPending
});

const mapDispatchToProps = state => ({
    fetchChunks : fetchChunksAction
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StoryPane);
