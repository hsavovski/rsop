import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Form, Icon, Input, Button, Select, InputNumber } from 'antd';
const {Option} = Select;
const FormItem = Form.Item;
import {postTeams} from '../../controllers/Actions';
import Model from '../../models/CompetitionsModel';
import Translation from '../../controllers/LanguageManager';

class TeamForm  extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.action = postTeams;
    }
    
    handleSubmit(event) {
        event.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                values = {
                    ...values,
                    competitionId: Model['addRecord'].team 
                }
                this.action(values);
            }
        });
    }

    get options(){
        let options = {};
        
        ['universities','teamLeaders'].forEach((name)=>{
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
                            label={trans("name")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: "" }],
                            })(
                                <Input placeholder={trans("name")}/>
                            )}
                        </FormItem>
                        
                        <FormItem
                            label={trans("university")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('universityId', {
                                rules: [{ required: true, message: "" }],
                            })(
                                <Select
                                showSearch
                                placeholder={trans("university")}
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                               {this.options.universities}
                            </Select>
                            )}
                        </FormItem>
                        
                        <FormItem
                            label={trans("team_leader")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('teamLeaderId', {
                                rules: [{ required: true, message: "" }],
                            })(
                                <Select
                                showSearch
                                placeholder={trans("team_leader")}
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                               {this.options.teamLeaders}
                            </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label={trans("score")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('score', {
                                rules: [{ required: true, message: "" }],
                            })(
                                <InputNumber placeholder={trans("score")}/>
                            )}
                        </FormItem>

                        <FormItem
                            label={trans("solved_problems")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('solvedProblems', {
                                rules: [{ required: true, message: "" }],
                            })(
                                <InputNumber placeholder={trans("solved_problems")}/>
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
