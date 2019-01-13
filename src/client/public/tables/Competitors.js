import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

import EditSearchTable from '../../components/EditableSearchTable';

import Model from '../../models/CompetitionsModel';
import Translate from '../../controllers/LanguageManager';

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
                    >
                    </EditSearchTable>
                </Row>
			</div>
        );
    }
}
