import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchChunksAction from './fetchChunks';
import { getChunks, getChunksError, getChunksPending} from './reducers';


import LoadingSpinner from './LoadingSpinner';
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
            chunkid:1,//this should be settable later
            items: 20,
            loading: false
        };
    }

    componentDidMount() {
        this.refs.myscroll.addEventListener("scroll", () => {
            if (
                this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
                    this.refs.myscroll.scrollHeight
            ) {
                this.loadMore();
            }
        });
        fetchChunksAction();
    }

    showChunks() {
        var chunks = this.state.chunks;
        
    }
    
    showItems() {
        var items = [];
        for (var i = 0; i< this.state.items; i++) {
            items.push(<div>
                         <h3>chunk</h3>
                         <p>{this.state.chunks[i].text}</p>
                       </div>); //this should be loading chunks
        }
        return items;
    }

    //this could either be get next story or retrieve *all* the data.  It may be best to do the whole story tree in one big chunk (or, if chunks get too big, ) 
    getData(chunkid) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', ()=> {
            console.log(xhr.responseText);
        });
        xhr.open('GET', 'localhost:8080/chunks/'.concat(chunkid));
        xhr.send(JSON.stringify({ }));
    }

    loadMore() {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ items: this.state.items + 20, loading: false });
        }, 2000);
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
