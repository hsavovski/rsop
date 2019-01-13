import React, { Component } from 'react';
import { Table , Input } from 'antd';
import {Button , Row , Col} from 'antd'
const Search = Input.Search;

export default class SearchTable extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            searchString: "",
            add:false
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
    }

    componentDidMount()
    {
        let model = this.props.model;
        let prop = this.props.entityName;
        model.on(prop, this.handleList);
    }

    componentWillUnmount()
    {
        let model = this.props.model;
        let prop = this.props.entityName;
        model.removeListener(prop, this.handleList);
    }

    handleList()
    {
        this.setState({add: false});
    }

    get data()
    {
        let data = [];
        let model = this.props.model;
        let prop = this.props.entityName;
        let entities = model[prop];
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
                        {'cancel'}
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
                        {"add"}
                    </Button>

                </Col>
            )
        }

        return create;
    }
    
    render() {
        let data = this.data;
        let offset = 14;
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
                                placeholder={'search'}
                                onSearch={(value) => this.setState({searchString: value})}
                            />
                        </Col>
                    )}
                </Row>

                <Table
                    loading={data.length == 0}
                    rowKey={record => record.id}
                    columns={this.props.columns}
                    onRowClick={this.props.onRowClick}
                    defaultExpandAllRows={this.props.defaultExpandAllRows}
                    expandedRowRender={this.props.expandedRowRender}
                    dataSource={data}
                    rowSelection={this.props.rowSelection}
                    onChange={()=>{this.forceUpdate()}}
                    bordered
                    size="middle"
                />
            </div>
        );
    }
}
