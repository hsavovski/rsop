import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

import SearchTable from '../../components/EditableSearchTable';

import Model from '../../models/CompetitionsModel';
import Translate from '../../controllers/LanguageManager';

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
                                render:(text,element)=>
                                    (<a 
                                        href={'/files/text-' + element.id + '.pdf'}
                                        target='_blank'
                                        >
                                        {text}
                                    </a>),
                                editable: true,
                                required: true,
                            },
                            {
                                title: this.trans('tests'),
                                dataIndex: 'tests',
                                render:(text,element)=>(<a
                                    href={'/files/tests-' + element.id + '.pdf'}
                                    target='_blank'
                                    >
                                    {text}
                                </a>),
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
                                render:(text,element)=>(<a
                                    href={'/files/solution-' + element.id + '.pdf'}
                                    target='_blank'
                                    >
                                    {text}
                                </a>),
                                editable: true,
                                required: true,
                            }
                        ]}
                        entityName="problems"
                        search={true}
                        onRow={(record, index, event) => {
                        }}
                    >
                    </SearchTable>
                </Row>
			</div>
        );
    }
}
