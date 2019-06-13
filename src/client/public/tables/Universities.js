import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

import SearchTable from '../../components/EditableTable';

import Model from '../../models/CompetitionsModel';
import Teams from './Teams';
import Translate from '../../controllers/LanguageManager';

export default class Universities extends Component
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

    expand(record){
        return (
            <Teams
                universityId={record.id}
            />
        )
    }

    trans(word){
        return Translate.getValue(word);
    }



    get data()
    {
        let competitions = Model['competitions'];
        let universities = Model['universities'];

        let result = [];
        if(
            Object.keys(universities).length > 1 && 
            Object.keys(competitions).length > 1 && 
            Object.keys(Model['teams']).length > 1
            )
        {
            let ranking = {};
            for(let el in competitions)
            {
                let rank = competitions[el].universityRanking;
            
                for(let place in rank)
                {
                    if(ranking[place] == null)
                    {
                        ranking[place] = [];
                    }
                    ranking[place].push(rank[place]);
                }
            }
            for(let el in universities)
            {
                result.push({
                    ...universities[el],
                    participations: universities[el].participations,
                    first: ranking['1'].filter(id => id == universities[el].id).length,
                    second: ranking['2'].filter(id => id == universities[el].id).length,
                    third: ranking['3'].filter(id => id == universities[el].id).length,
                    fourth: ranking['4'].filter(id => id == universities[el].id).length
                })
            }
        }
        return result
    }


    render() {
        

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
                                title: this.trans('city'),
                                dataIndex: 'city',
                                render:(text)=>(<div>
                                    {text}
                                </div>),
                                editable: true,
                                required: true,
                            },
                            {
                                title: this.trans('participations'),
                                dataIndex: 'participations',
                                render:(text)=>(<div>
                                    {text}
                                </div>),
                                editable: true,
                                required: true,
                                defaultSortOrder: 'descend',
                                sorter: (a,b) => a.participations - b.participations
                            },
                            {
                                title: this.trans('first'),
                                dataIndex: 'first',
                                render:(text)=>(<div>
                                    {text}
                                </div>),
                                editable: true,
                                required: true,
                                sorter: (a,b) => a.first - b.first
                            },
                            {
                                title: this.trans('second'),
                                dataIndex: 'second',
                                render:(text)=>(<div>
                                    {text}
                                </div>),
                                editable: true,
                                required: true,
                                sorter: (a,b) => a.second - b.second
                            },
                            {
                                title: this.trans('third'),
                                dataIndex: 'third',
                                render:(text)=>(<div>
                                    {text}
                                </div>),
                                editable: true,
                                required: true,
                                sorter: (a,b) => a.third - b.third
                            },
                            {
                                title: this.trans('fourth'),
                                dataIndex: 'fourth',
                                render:(text)=>(<div>
                                    {text}
                                </div>),
                                editable: true,
                                required: true,
                                sorter: (a,b) => a.fourth - b.fourth
                            }
                        ]}
                        entityName="universities"
                        search={true}
                        data={this.data}
                        onRow={(record, index, event) => {
                        }}
                        expandedRowRender={this.expand}
                    >
                    </SearchTable>
                </Row>
			</div>
        );
    }
}
