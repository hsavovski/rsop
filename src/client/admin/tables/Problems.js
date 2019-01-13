import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

import SearchTable from '../../components/EditableSearchTable';

import Model from '../../models/CompetitionsModel';
import Form from '../forms/ProblemForm';
import Translate from '../../controllers/LanguageManager';
import {updateProblems} from '../../controllers/Actions';

export default class Problems extends Component
{
    constructor()
    {
        super();   
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        Model.on('competitions',this.handleChange);
    }


    componentWillUnmount(){
        Model.on('competitions',this.handleChange);
    }

    handleChange(){
        this.forceUpdate();
    }

    trans(word){
        return Translate.getValue(word);
    }

    render() {
        let competitions = Model['competitions'];
        
        if(Object.keys(competitions).length < 1)
        {
            return(<div></div>)
        }
        
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
                                title: this.trans('text'),
                                dataIndex: 'text',
                                render:(text)=>(<div>
                                    {text}
                                </div>),
                                editable: true,
                                required: true,
                            },
                            {
                                title: this.trans('tests'),
                                dataIndex: 'tests',
                                render:(text)=>(<div>
                                    {text}
                                </div>),
                                editable: true,
                                required: false,
                            },
                            {
                                title: this.trans('compilation_time'),
                                dataIndex: 'compilationTime',
                                render:(text)=>(<div>
                                    {text}
                                </div>),
                                editable: true,
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
                                title: this.trans('solution'),
                                dataIndex: 'solution',
                                render:(text)=>(<div>
                                    {text}
                                </div>),
                                editable: true,
                                required: true,
                            }
                        ]}
                        entityName="problems"
                        search={true}
                        onRow={(record, index, event) => {
                        }}
                        editable={true}
                        action={updateProblems}
                    >
                        <Form/>
                    </SearchTable>
                </Row>
			</div>
        );
    }
}
