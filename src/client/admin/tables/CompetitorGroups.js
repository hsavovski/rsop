import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

import Table from '../components/EditableTable';

import Model from '../../models/CompetitionsModel';
import Form from '../forms/TeamForm';
import Translate from '../../controllers/LanguageManager';
import {updateCompetitorGroups} from '../../controllers/Actions';

export default class CompetitorGroups extends Component
{
    constructor()
    {
        super();   

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        Model.on('competitors',this.handleChange);
        Model.on('competitorGroups',this.handleChange);
    }


    componentWillUnmount(){
        Model.removeListener('competitors',this.handleChange);
        Model.removeListener('competitorGroups',this.handleChange);
    }

    handleChange(){
        this.forceUpdate();
    }

    trans(word){
        return Translate.getValue(word);
    }

    get data(){
        let data = [];
        let entity = Model['competitorGroups'];
        for(let el in entity)
        {
            if(entity[el].teamId == this.props.teamId)
            data.push(entity[el]);
        }
        return data;
    }

    render() {

        let competitors = Model['competitors'];
        return (
            <Table
                columns={[
                    {
                        title: this.trans('competitor'),
                        dataIndex: 'competitorId',
                        render:(text)=>(<div>
                            {competitors[text].name}
                        </div>),
                        editable: false,
                        required: true,
                    },
                    {
                        title: this.trans('major'),
                        dataIndex: 'major',
                        render:(text)=>(<div>
                            {text}
                        </div>),
                        editable: true,
                        required: true,
                    },
                    {
                        title: this.trans('course'),
                        dataIndex: 'course',
                        render:(text)=>(<div>
                            {text}
                        </div>),
                        editable: true,
                        required: true,
                    }
                ]}
                entityName="competitorGroups"
                onRow={(record, index, event) => {
                }}
                parentId={this.props.teamId}
                data={this.data}
                editable={true}
                action={updateCompetitorGroups}
            >
            </Table>
        );
    }
}
