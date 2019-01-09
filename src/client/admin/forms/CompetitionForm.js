import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Form, Icon, Input, Button, Select, InputNumber } from 'antd';
const {Option} = Select;
const FormItem = Form.Item;
import {postCompetitions} from '../../controllers/Actions';
import Model from '../../models/CompetitionsModel';
import Translation from '../../controllers/LanguageManager';

class CompetitionForm  extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.action = postCompetitions;
    }
    
    handleSubmit(event) {
        event.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.action(values);
            }
        });
    }

    get year(){
        let date = new Date();
        return date.getFullYear();
    }

    get options(){
        let comp = Model['universities'];
        let options = [];
        
        for(let el in comp)
        {
            options.push(
                <Option 
                    key={comp[el].id} 
                    value={comp[el].id}
                >
                    {comp[el].name}
                </Option>
            )
        }
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
                            label={trans("year")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('year', {
                                initialValue: this.year,
                                rules: [{ required: true, message: "" }],
                            })(
                                <InputNumber  
                                    placeholder={trans("year")}
                                />
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
                               {this.options}
                            </Select>
                            )}
                        </FormItem>
                        
                        <FormItem
                            label={trans("domain")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('domain', {
                            })(
                                <Input placeholder={trans("domain")}/>
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

export default Form.create()(CompetitionForm)
