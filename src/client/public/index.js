import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import App from './App';
import Home from './Home';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/home" component={Home}/>
        </div>
    </Router>,
    document.getElementById('public-root')
);
