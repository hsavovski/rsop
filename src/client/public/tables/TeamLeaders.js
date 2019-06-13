import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

import SearchTable from '../../components/EditableTable';

import Model from '../../models/CompetitionsModel';
import Translate from '../../controllers/LanguageManager';

export default class TeamLeaders extends Component
{
    constructor()
    {
        super();        
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        Model.on('universities',this.handleChange);
        Model.on('competitions',this.handleChange);
        Model.on('teamLeaders',this.handleChange);
        Model.on('teams',this.handleChange);
    }

    componentWillUnmount(){
        Model.removeListener('universities',this.handleChange);
        Model.removeListener('competitions',this.handleChange);
        Model.removeListener('teamLeaders',this.handleChange);
        Model.removeListener('teams',this.handleChange);
    }

    handleChange(){
        this.forceUpdate();
    }

    get data()
    {
        let teams = Model['teams'];
        let teamLeaders = Model['teamLeaders'];

        let result = [];
        if(
            Object.keys(Model['universities']).length > 1 && 
            Object.keys(Model['competitions']).length > 1 && 
            Object.keys(teamLeaders).length > 1 && 
            Object.keys(teams).length > 1
            )
        {

            for(let el in teamLeaders)
            {
                let participations = 0;
                let universities = [];
                let competitions = [];
                for(let i in teams)
                {
                    if(teams[i].teamLeaderId == el)
                    {
                        if(!universities.includes(teams[i].universityId))
                        {
                            universities.push(teams[i].universityId);
                        }

                        if(!competitions.includes(teams[i].competitionId))
                        {    
                            competitions.push(teams[i].competitionId)
                        }
                        
                        participations++;
                    }
                }
                
                let uniString = "";
                universities.forEach((uni, i, arr) => {
                    uniString += Model['universities'][uni].abbreviation + " ";
                    if(i < arr.length - 1)
                    {
                        uniString += ', '
                    }
                });

                let compString = "";
                competitions.forEach((comp, i, arr) => {
                    compString += Model['competitions'][comp].year + " ";
                    if(i < arr.length - 1)
                    {
                        compString += ', '
                    }
                }),

                result.push({
                    ...teamLeaders[el],
                    participations: participations,
                    universities: uniString,
                    years: compString,
                })
            }
        }
        return result
    }

    trans(word){
        return Translate.getValue(word);
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
                                title: this.trans('participations'),
                                dataIndex: 'participations',
                                render:(text)=>(<div>
                                    {text}
                                </div>),
                                editable: true,
                                required: true,
                            },
                            {
                                title: this.trans('universities'),
                                dataIndex: 'universities',
                                render:(text)=>(<div>
                                    {text}
                                </div>),
                                editable: true,
                                required: true,
                            },
                            {
                                title: this.trans('years'),
                                dataIndex: 'years',
                                render:(text)=>(<div>
                                    {text}
                                </div>),
                                editable: true,
                                required: true,
                            },

                        ]}
                        entityName="teamLeaders"
                        data={this.data}
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
