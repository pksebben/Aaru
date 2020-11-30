import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "./static/css/App.css";
import StoryViewer from './views/StoryViewer';

export default function Routes() {
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
	      <li><Link to="/storyviewer">Check out our new story viewer!</Link></li>
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
              <StoryViewer/>
            </Route>
            <Route path='/about'>
              <About/>
            </Route>
          </Switch>
        </div>        
      </Router>
  );
}

function About() {
    return (
        <div className="AboutPage">
          <header className="About-Header">
            <h1 className="About-Header-Title">What are we doing here?</h1>
            <h2 className="About-Header-Subtitle">The Aaru project is about writing, together.</h2>
          </header>
          <p className="About-Description">
            ----Put an in-depth Description of the project here----
          </p>
          
        </div>
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

