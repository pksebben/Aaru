import React, { Component } from 'react';
import { render } from 'react-dom';

import StoryPane from '../ducks/storypane/StoryPane';

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



export default class StoryViewer extends Component {
    render() {
        return (
	    <StoryPane/>
        );
    }
}
