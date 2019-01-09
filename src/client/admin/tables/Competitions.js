import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

import SearchTable from '../components/EditableSearchTable';

import Model from '../../models/CompetitionsModel';
import Form from '../forms/CompetitionForm';
import Translate from '../../controllers/LanguageManager';
import {updateCompetitions} from '../../controllers/Actions';
import Teams from './Teams';
export default class Competitions extends Component
{
    constructor()
    {
        super();   

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        Model.on('universities',this.handleChange);
    }


    componentWillUnmount(){
        Model.removeListener('universities',this.handleChange);
    }

    handleChange(){
        this.forceUpdate();
    }

    trans(word){
        return Translate.getValue(word);
    }

    expand(record){
        return (
            <Teams
                competitionId={record.id}
            />
        )
    }

    render() {
        let universities = Model["universities"];
        
        return (
			<div>
                <Row>
                    <SearchTable
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
                                title: this.trans('year'),
                                dataIndex: 'year',
                                render:(text)=>(<div>
                                    {text}
                                </div>),
                                editable: true,
                                required: true,
                            },
                            {
                                title: this.trans('host'),
                                dataIndex: 'universityId',
                                render:(text)=>(<div>
                                    {universities[text].name}
                                </div>),
                                editable: false,
                                required: false,
                            },
                            {
                                title: this.trans('domain'),
                                dataIndex: 'domain',
                                render:(text)=>(<div>
                                    {text}
                                </div>),
                                editable: true,
                                required: true,
                            }
                        ]}
                        entityName="competitions"
                        search={true}
                        onRow={(record, index, event) => {
                        }}
                        editable={true}
                        action={updateCompetitions}
                        expandedRowRender={this.expand}
                    >
                        <Form/>
                    </SearchTable>
                </Row>

			</div>
        );
    }
}
