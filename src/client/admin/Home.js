import React, { Component } from 'react';
import {Button} from 'antd';
import Model from '../models/CompetitionsModel';
import AppModel from '../models/AppModel';
AppModel.server = "admin";

export default class Home extends Component
{
    constructor(props)
    {
        super(props);
    }
    

    render() {

        return (
			<div>
                <Button href='/admin/logout'>
                    Logout
                </Button>
                Home 
			</div>
        );
    }

}
