import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './Routes';

export default function App() {
    return (
	<Provider store={store}>
	  <Routes/>
        </Provider>
    );
}
