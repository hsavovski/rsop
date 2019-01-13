import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

import SearchTable from '../../components/EditableSearchTable';

import Model from '../../models/CompetitionsModel';
import Translate from '../../controllers/LanguageManager';

export default class TeamLeaders extends Component
{
    constructor()
    {
        super();   
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
                        
                        ]}
                        entityName="teamLeaders"
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
