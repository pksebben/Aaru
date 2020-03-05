import React, { Component } from 'react';
import { render } from 'react-dom';
//Story Viewer

// class StoryViewer extends Component {
//     constructor() {
//         super();
//     }
//     componentWillMount() {
//         this.getData();
//     }

//     getData(){
//         //create a new req
//         var xhr = new XMLHttpRequest();
//         //server res callback
//         xhr.addEventListener('load', () => {
//             //update state of component here
//             console.log(xhr.responsetext);
//         });
//         //open the request
//         xhr.open('GET', 'localhost:8080/testme');
//         xhr.send();
//     }
//     render() {
//         return(
//             // <div className="storyviewer">
//             // <div className="contentpane">
//             // <h1>{{ chunks[0].title }}</h1>
//             // <ul>
//             // <li>
// 	    // <!-- Climb the parent tree to populate -->
// 	    // <div className="chunkpane">
// 	    // <div className="chunkcontent">
// 	    // <p>{{ i.text }}</p>
// 	    // </div>
// 	    // <div className="chunkinfo">
// 	    // <ul>
// 	    // <li><p>Author: {{ i.author }}</p></li>
// 	    // <li><p>Chunk number {{ i.id }}</p></li>
// 	    // </ul>
// 	    // </div>
// 	    // </div>
//             // </li>
//             // </ul>
//             // </div>
//             // <div className="addstory">
//             // <label for="storyboard"/>
//             // <form id="storyboard">
// 	    // <textarea name="chunk_text" form="storyboardxs">

// 	    // </textarea>
// 	    // <button>Submit chunk</button>
//             // </form>
            
            
//             // </div>
            
//             // </div>)
        
//     }
// }



export default class Storyviewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }

    showChunks() {
        var chunks = this.state.chunks;
        
    }
    
    showItems() {
        var items = [];
        for (var i = 0; i< this.state.items; i++) {
            items.push(<li key={i}>Item {i}</li>);
        }
        return items;
    }

    //this could either be get next story or retrieve *all* the data.  It may be best to do the whole story tree in one big chunk (or, if chunks get too big, ) 
    getData() {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', ()=> {
            console.log(xhr.responseText);
        });
        xhr.open('POST', 'localhost:8080/SOME_STORY_DATA');
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
              className="Storyviewer"
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
