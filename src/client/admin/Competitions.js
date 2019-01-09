import React, { Component } from 'react';
import {Modal} from 'antd'
import CompetitionsTable from './tables/Competitions';
import Model from '../models/CompetitionsModel';
import TeamForm from './forms/TeamForm';
import CompGroupForm from './forms/CompetitorGroupForm'

export default class Competitions extends Component
{
    constructor()
    {
        super();
        this.state = {
            visible:false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        Model.on('addRecord',this.handleChange);
        Model.on('teams',this.handleCancel);
        Model.on('competitorGroups',this.handleCancel);
    }

    componentWillUnmount()
    {
        Model.removeListener('addRecord',this.handleChange);
        Model.removeListener('teams',this.handleCancel);
        Model.removeListener('competitorGroups',this.handleCancel);
    }

    handleChange()
    {
        if(Model['addRecord'].team || Model['addRecord'].competitorGroup)
        {
            this.setState({visible: true});
        }
        else
        {
            this.setState({visible: false});
        }
    }

    handleCancel()
    {
        Model.addRecord = {team: null, competitorGroup: null};
    }

    render()
    {
        let add = Model['addRecord'];

        return(
           <div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    {add.team && (<TeamForm/>)}
                    {add.competitorGroup && (<CompGroupForm/>)}
                </Modal>
               <CompetitionsTable/>

           </div>
        );
    }
}
