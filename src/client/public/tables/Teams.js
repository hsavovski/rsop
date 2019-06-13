import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

import Table from '../../components/EditableTable';

import Model from '../../models/CompetitionsModel';
import Translate from '../../controllers/LanguageManager';
import CompetitorGroups from './CompetitorGroups';

export default class Teams extends Component
{
    constructor()
    {
        super();   

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        Model.on('teamLeaders',this.handleChange);
    }


    componentWillUnmount(){
        Model.removeListener('teamLeaders',this.handleChange);
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
            if(entity[el].universityId == this.props.universityId)
            data.push(entity[el]);
        }
        return data;
    }

    render() {
        let teamLeaders = Model['teamLeaders'];
        let competitions = Model['competitions'];

        console.log(teamLeaders , competitions)

        if( Object.keys(competitions).length < 1 ||
            Object.keys(teamLeaders).length < 1)
        {
            return (<div></div>)     
        }

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
                        title: this.trans('competition'),
                        dataIndex: 'competitionId',
                        render:(text)=>(<div>
                            {competitions[text].name}
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
                parentId={this.props.competitionId}
                expandedRowRender={this.expand}
            >
            </Table>
        );
    }
}
