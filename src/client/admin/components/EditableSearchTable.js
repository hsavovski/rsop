import React, { Component } from 'react';
import { Table , Input, InputNumber, Popconfirm, Form,} from 'antd';
import {Button , Row , Col} from 'antd'
import {EditableCell, EditableFormRow, EditableContext} from './EditableComponents';
import Model from '../../models/CompetitionsModel';
import Trans from '../../controllers/LanguageManager';
const Search = Input.Search;
const trans = (value) => Trans.getValue(value);

export default class SearchTable extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            searchString: "",
            add:false,
            editingKey: '',
        };
        if(this.props.search == null)
        {
            this.props.search = false;
        }
        if(this.props.filter == null)
        {
            this.filter = () => {return true};
        }
        else
        {
            this.filter = this.props.filter;
        }
        this.handleList = this.handleList.bind(this);

        this.columns = props.columns;
        if(props.editable)
        {
            this.columns.push(
            {
                title: trans('edit'),
                dataIndex: 'operation',
                width: '70px',
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

    componentDidMount()
    {
        let prop = this.props.entityName;
        Model.on(prop, this.handleList);
    }

    componentWillUnmount()
    {
        let prop = this.props.entityName;
        Model.removeListener(prop, this.handleList);
    }

    handleList()
    {
        this.setState({add: false, editingKey: ''});
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

    get data()
    {
        let data = [];
        let prop = this.props.entityName;
        let entities = Model[prop];
        var theString = "";

        for(var id in entities)
        {
            if(this.filter(entities[id])) {
                theString = "";
                for (var name in entities[id]) {
                    theString += entities[id][name] + " ";
                }
                if (theString.indexOf(this.state.searchString) > -1) {
                    data.push(entities[id]);
                }
            }
        }

        return data;
    }

    get createForm()
    {
        let create = null;
        if(this.state.add)
        {
            create = (
                <Col span={10}>
                    <Button
                        style={{marginBottom: "10px"}}
                        icon="close"
                        onClick={() => {
                            this.setState({add:false})
                        }}
                    >
                        {trans('cancel')}
                    </Button>

                    {this.props.children}

                </Col>
            )
        }
        else
        {
            create = (
                <Col span={5}>

                    <Button
                        icon="plus"
                        onClick={() => {
                            this.setState({add:true})
                        }}
                    >
                        {trans("add")}
                    </Button>

                </Col>
            )
        }

        return create;
    }

    render() {

        let data = this.data;
        let offset = 14;

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

        if(this.state.add)
        {
            offset = 19;
        }
        else
        {
            offset = 14;
        }

        if(this.props.reverse)
        {
            data.reverse();
        }

        return (
            <div>
                <Row style={{marginBottom: "10px"}}>
                    {this.props.searchRow}

                    {this.props.children && this.createForm}

                    {this.props.search &&
                    (
                        <Col span={5} offset={offset}>
                            <Search
                                placeholder={trans('search')}
                                onSearch={(value) => this.setState({searchString: value})}
                            />
                        </Col>
                    )}
                </Row>  
                
                <Table
                    components={components} 
                    loading={data.length == 0}
                    rowKey={record => record.id}
                    columns={columns}
                    onRowClick={this.props.onRowClick}
                    defaultExpandAllRows={this.props.defaultExpandAllRows}
                    expandedRowRender={this.props.expandedRowRender}
                    dataSource={data}
                    rowSelection={this.props.rowSelection}

                />
            </div>
        );
    }
}