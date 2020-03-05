import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Storyviewer from './views/StoryViewer.jsx';


export default function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
	      <li><Link to="/about">About</Link></li>
	      <li><Link to="/signup">Sign Up</Link></li>
	      <li><Link to="/login">Sign In</Link></li>
	      <li><Link to="/browse">Read a Story</Link></li>
	      <li><Link to="/write">Write a story</Link></li>
	      <li><Link to="/storyviewer">Check out our new stoy viewer!</Link></li>
	      <li><Link to="/testdb">Test the db</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/read'>
              <Read />
            </Route>
            <Route path='/write'>
              <Write />
            </Route>
            <Route path='/storyviewer'>
              <Storyviewer/>
            </Route>
          </Switch>
        </div>        
      </Router>
  );
}

function Home() {
    return <h1>Home</h1>;
}

function Read() {
    return <h1>Read</h1>;
}

function Write() {
    return <h1>Write</h1>;
}


