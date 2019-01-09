import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class App extends Component
{
    constructor()
    {
        super();
    }

	render()
    {
        return(
            <div>
                <Link to="/home">Home</Link>
                hiii
                asdf
                adfdfdf
                {this.props.children}
            </div>
        );
    }
}
