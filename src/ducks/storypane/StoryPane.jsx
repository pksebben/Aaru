import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchChunksAction from './fetchChunks';
import { getChunks, getChunksError, getChunksPending} from './reducers';


import LoadingSpinner from './LoadingSpinner';
import ChunkView from '../chunkview/ChunkView';
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
            loading: false,
            chunks: [],
            items: []
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
        fetch('http://localhost:8080/chunks/1')
            .then(res => res.json()).then(
                (result) => {
                    this.setState({
                        chunks : result
                    });
                }
            );
    }

    showChunks() {
        var chunks = this.state.chunks;
        
    }
    
    showItems() {
        for (var i = 0; i< this.state.chunks.length ; i++) {
            this.items.push(<div>
			 <ChunkView chunkid='{i}' text='{this.state.chunks[i].text}'/>
                       </div>); //this should be loading chunks
        }
        return this.items;
    }

    //this could either be get next story or retrieve *all* the data.  It may be best to do the whole story tree in one big chunk (or, if chunks get too big, ) 
    // getData(chunkid) {
    //     var reqHeader = new Headers();
    //     reqHeader.append('Content-Type', 'application/json');
    //     fetch("http://localhost:8080/chunks/1", {
    //         method :'GET',
    //         mode:'cors',
    //         headers:reqHeader
    //     })
    //         .then(response => {
    //             const chunks = response.json();
    //             this.setState({chunks : chunks});
    //         })
    //         .catch(err => {
    //             throw new Error(err);
    //         });
    //     // var xhr = new XMLHttpRequest();
    //     // xhr.addEventListener('load', ()=> {
    //     //     console.log(xhr.responseText);
    //     //     console.log(xhr.responseType);
    //     //     this.chunks = xhr.responseXML;
    //     // });
    //     // xhr.open('GET', 'http://localhost:8080/chunks/'.concat(chunkid));
    //     // xhr.send(JSON.stringify({ }));
    //     // console.log(xhr.responseType);
    //     // console.log("THIS DOT CHUNKS");
    //     // console.log(this.chunks);
    // }

    // async newGetData(url = '', chunkid = 1) {
    //     const res = await fetch(url.concat(chunkid), {
    //         method : 'GET',
    //         mode : 'cors',
    //         cache : 'no-cache',
    //         credentials : 'same-origin',
    //         headers: {
    //             'Content-Type' : 'application/json'
    //         },
    //         redirect: 'follow'
    //     });
    //     return await res.json();
    // }
   

    // loadMore() {
    //     this.setState({ loading: true });
    // 	this.newGetData('url':'http://localhost:8080/chunks/', 'chunkid'=1)
    // 	    .then((res) => {
    // 		this.setState({chunks : res.json()});
    // 	    });
 
    //     //   setTimeout(() => {	// 
    // 	this.setState({ chunks: this.getData(this.state.chunkid), loading: false });
    // 	// }, 2000);
    // }

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
