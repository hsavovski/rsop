import React, { Component } from 'react';
import { Table , Input, Modal} from 'antd';
import {Button , Row , Col} from 'antd'
import {EditableCell, EditableFormRow, EditableContext} from './EditableComponents';
import Model from '../models/CompetitionsModel';
import Trans from '../controllers/LanguageManager';
const Search = Input.Search;
const trans = (value) => Trans.getValue(value);

export default class SearchTable extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            add:false,
            editingKey: '',
        };
        if(this.props.filter == null)
        {
            this.filter = () => {return true};
        }
        else
        {
            this.filter = this.props.filter;
        }
        this.handleList = this.handleList.bind(this);
        this.addRecord = this.addRecord.bind(this);
        
        this.columns = props.columns;
        if(props.editable)
        {
            this.columns.push(
            {
                title: (
                    <a 
                        onClick={this.addRecord}
                    >
                        {trans('add')}
                    </a>
                ),
                dataIndex: 'operation',
                width: "120px",
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    
                    return (
                    <div>
                        {editable ? (
                        <span>
                            <EditableContext.Consumer>
                            {form => (
                                <a
                                href="javascript:;"
                                onClick={() => this.save(form, record.id)}
                                style={{ marginRight: 8 }}
                                >
                                {trans('save')}
                                </a>
                            )}
                            </EditableContext.Consumer>
                            <a
                                href="javascript:;"
                                onClick={() => this.cancel()}
                                >
                                {trans('cancel')}
                                </a>
                        </span>
                        ) : (
                        <a onClick={() => this.edit(record.id)}>{trans('edit')}</a>
                        )}
                    </div>
                    );
                }
            });
        }
    }

    handleList()
    {
        this.setState({add: false, editingKey: ''});
    }

    addRecord(){
        let entity = this.props.entityName.substr(
            0,this.props.entityName.length-1
        )
        console.log(entity)
        Model['addRecord'][entity] = this.props.parentId;
        Model.emit('addRecord');
    }

    isEditing(record){ 
        return record.id === this.state.editingKey;
    }
  
    cancel() {
      this.setState({ editingKey: '' });
    };
  
    save(form, id) {
      form.validateFields((error, row) => {
        if (error) {
          return;
        }
        this.props.action({...row,id});
      });
    }
  
    edit(id) {
      this.setState({ editingKey: id });
    }

    
    render() {
        const components = {
            body: {
              row: EditableFormRow,
              cell: EditableCell,
            },
        };
      
        const columns = this.columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: record => ({
            record,
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            required: col.required,
            editing: this.isEditing(record),
            }),
        };
        });


        if(this.props.reverse)
        {
            this.props.data.reverse();
        }

        return (
            
                <Table
                    components={components} 
                    loading={false}
                    rowKey={record => record.id}
                    columns={columns}
                    onRowClick={this.props.onRowClick}
                    defaultExpandAllRows={this.props.defaultExpandAllRows}
                    expandedRowRender={this.props.expandedRowRender}
                    dataSource={this.props.data}
                    rowSelection={this.props.rowSelection}
                    bordered={false}
                    pagination={false}
                    bordered
                />
            
        );
    }
}