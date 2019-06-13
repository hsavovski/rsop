import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

import SearchTable from '../../components/EditableTable';

import Model from '../../models/CompetitionsModel';
import Translate from '../../controllers/LanguageManager';
import Universities from './UniversitiesRanking';
export default class Competitions extends Component
{
    constructor()
    {
        super();   

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        Model.on('universities',this.handleChange);
        Model.on('competitions',this.handleChange);
        Model.on('teams',this.handleChange);
    }

    componentWillUnmount(){
        Model.removeListener('universities',this.handleChange);
        Model.removeListener('competitions',this.handleChange);
        Model.removeListener('teams',this.handleChange);
    }

    handleChange(){
        this.forceUpdate();
    }

    trans(word){
        return Translate.getValue(word);
    }

    expand(record){
        return (
            <Universities
                competitionId={record.id}
            />
        )
    }

    get data()
    {
        let competitions = Model['competitions'];
        let result = [];
        for(let el in competitions)
        {
            result.push({
                ...competitions[el],
                universities: Object.keys(competitions[el].universities).length
            })
        }
        return result
    }

    render() {
        let universities = Model['universities'];
        
        if(Object.keys(universities).length < 1)
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
                                title: this.trans('year'),
                                dataIndex: 'year',
                                render:(text)=>(<div>
                                    {text}
                                </div>),
                                editable: true,
                                required: true,
                                defaultSortOrder: 'descend', 
                                sorter: (a,b) => a.year - b.year
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
                                    <a href={text}>
                                        {text}
                                    </a>
                                </div>),
                                editable: true,
                                required: true,
                            },
                            {
                                title: this.trans('universities_count'),
                                dataIndex: 'universities',
                                render:(text)=>(<div>
                                    {text}
                                </div>),
                                editable: true,
                                required: true,
                            },
                        ]}
                        entityName="competitions"
                        search={true}
                        onRow={(record, index, event) => {
                        }}
                        data={this.data}
                        expandedRowRender={this.expand}
                    >
                    </SearchTable>
                </Row>

			</div>
        );
    }
}
