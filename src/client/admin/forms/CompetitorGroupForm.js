import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Form, Icon, Input, Button, Select, InputNumber } from 'antd';
const {Option} = Select;
const FormItem = Form.Item;
import {postCompetitorGroups} from '../../controllers/Actions';
import Model from '../../models/CompetitionsModel';
import Translation from '../../controllers/LanguageManager';

class TeamForm  extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.action = postCompetitorGroups;
    }

    componentWillMount(){
        Model.on('competitors',this.handleChange);
    }
    
    componentWillUnmount(){
        Model.removeListener('competitors',this.handleChange);
    }

    handleChange()
    {
        this.forceUpdate();
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                values = {
                    ...values,
                    teamId: Model['addRecord'].competitorGroup
                }
                this.action(values);
            }
        });
    }


    get options(){
        let options = {};
        
        ['competitors'].forEach((name)=>{
            let model = Model[name];
            options[name] = [];
            for(let el in model)
            {
                options[name].push(
                    <Option 
                        key={model[el].id} 
                        value={model[el].id}
                    >
                        {model[el].name}
                    </Option>
                )
            }    
        });
        
        return options;
    }


    render()
    {
        var trans = (keyword)=>{
            return Translation.getValue(keyword);
        }
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                        
                        <FormItem
                            label={trans("competitor")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('competitorId', {
                                rules: [{ required: true, message: "" }],
                            })(
                                <Select
                                showSearch
                                placeholder={trans("competitor")}
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                               {this.options.competitors}
                            </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label={trans("major")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('major', {
                                rules: [{ required: true, message: "" }],
                            })(
                                <Input placeholder={trans("major")}/>
                            )}
                        </FormItem>

                        <FormItem
                            label={trans("course")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('course', {
                                rules: [{ required: true, message: "" }],
                            })(
                                <Input placeholder={trans("course")}/>
                            )}
                        </FormItem>

                    <Button type="primary" htmlType="submit">
                        {trans("submit")}
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Form.create()(TeamForm)
