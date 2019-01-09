import React, { Component } from 'react';
import List from './components/List';
import Model from '../models/CompetitionsModel';
import AppModel from '../models/AppModel';
AppModel.server = "admin";

export default class Home extends Component
{
    constructor(props)
    {
        super(props);
    }
    
    row(element)
    {
        return <div>

                {element.name}
                {element.city}
                {element.abbreviation}
                {element.type}
        </div>
    }

    render() {

        return (
			<div>
                Home 
			</div>
        );
    }

}
