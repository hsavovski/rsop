import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

import Table from '../../components/EditableTable';

import Model from '../../models/CompetitionsModel';
import Translate from '../../controllers/LanguageManager';
import CompetitorGroups from './CompetitorGroups';

export default class UniversitiesRanking extends Component
{
    constructor()
    {
        super();   

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
        let universities = Model['competitions'][this.props.competitionId].universities;

        
        for(let el in universities)
        {
            let best = universities[el].bestTeamInCompetition(this.props.competitionId);

            data.push({
                id: universities[el].id,
                teamName: best.name,
                universityName: universities[el].name,
                score: best.score,
                solvedProblems: best.solvedProblems
            });
        }

        data.sort((a,b) =>{
            if(a.solvedProblems != b.solvedProblems){
                return b.solvedProblems - a.solvedProblems
            }
            else
            {
                return b.score - a.score
            }
        });
        

        return data;
    }

    render() {

        return (
            <Table
                columns={[
                    {
                        title: this.trans('place'),
                        dataIndex: 'id',
                        render:(a,b,index)=>(<div>
                            {index + 1}
                        </div>),
                        editable: true,
                        required: true,

                    },
                    {
                        title: this.trans('team_name'),
                        dataIndex: 'teamName',
                        render:(text)=>(<div>
                            {text}
                        </div>),
                        editable: true,
                        required: true,

                    },
                    {
                        title: this.trans('university_name'),
                        dataIndex: 'universityName',
                        render:(text)=>(<div>
                            {text}
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
