import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

import EditSearchTable from '../../components/EditableSearchTable';

import Model from '../../models/CompetitionsModel';
import Form from '../forms/CompetitorForm';
import Translate from '../../controllers/LanguageManager';
import {updateCompetitors} from '../../controllers/Actions';

export default class Competitors extends Component
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
                    <EditSearchTable
                        columns={[
                            {
                                title: this.trans('name'),
                                dataIndex: 'name',
                                editable: true,
                                required: true,
                                render:(text)=>(<div>
                                    {text}
                                </div>)

                            }
                        ]}
                        entityName="competitors"
                        search={true}
                        onRow={(record, index, event) => {
                        }}
                        editable={true}
                        action={updateCompetitors}
                    >
                        <Form/>
                    </EditSearchTable>
                </Row>
			</div>
        );
    }
}
