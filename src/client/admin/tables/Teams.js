import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

import Table from '../components/EditableTable';

import Model from '../../models/CompetitionsModel';
import Form from '../forms/TeamForm';
import Translate from '../../controllers/LanguageManager';
import {updateTeams} from '../../controllers/Actions';
import CompetitorGroups from './CompetitorGroups';

export default class Teams extends Component
{
    constructor()
    {
        super();   

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        Model.on('universities',this.handleChange);
        Model.on('teamLeaders',this.handleChange);
        Model.on('teams',this.handleChange);
    }


    componentWillUnmount(){
        Model.removeListener('universities',this.handleChange);
        Model.removeListener('teamLeaders',this.handleChange);
        Model.removeListener('teams',this.handleChange);
    }

    handleChange(){
        this.forceUpdate();
    }

    trans(word){
        return Translate.getValue(word);
    }

    expand(record){
        return(<CompetitorGroups
            teamId={record.id}
        />)
    }

    get data(){
        let data = [];
        let entity = Model['teams'];
        for(let el in entity)
        {
            if(entity[el].competitionId == this.props.competitionId)
            data.push(entity[el]);
        }
        return data;
    }

    render() {
        let universities = Model["universities"];
        let teamLeaders = Model['teamLeaders'];

        return (
            <Table
                columns={[
                    {
                        title: this.trans('name'),
                        dataIndex: 'name',
                        render:(text)=>(<div>
                            {text}
                        </div>),
                        editable: true,
                        required: true,

                    },
                    {
                        title: this.trans('team_leader'),
                        dataIndex: 'teamLeaderId',
                        render:(text)=>(<div>
                            {teamLeaders[text].name}
                        </div>),
                        editable: false,
                        required: true,
                    },
                    {
                        title: this.trans('university'),
                        dataIndex: 'universityId',
                        render:(text)=>(<div>
                            {universities[text].name}
                        </div>),
                        editable: false,
                        required: true,
                    },
                    {
                        title: this.trans('score'),
                        dataIndex: 'score',
                        render:(text)=>(<div>
                            {text}
                        </div>),
                        editable: true,
                        required: true,
                    },
                    {
                        title: this.trans('solved_problems'),
                        dataIndex: 'solvedProblems',
                        render:(text)=>(<div>
                            {text}
                        </div>),
                        editable: true,
                        required: true,
                    }
                ]}
                entityName="teams"
                onRow={(record, index, event) => {
                }}
                data={this.data}
                editable={true}
                action={updateTeams}
                parentId={this.props.competitionId}
                expandedRowRender={this.expand}
            >
            </Table>
        );
    }
}
