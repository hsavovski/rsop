import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Form, Icon, Input, Button, Checkbox , InputNumber , Select} from 'antd';
const Option = Select.Option;
const {TextArea} = Input;
const FormItem = Form.Item;
import {postProblems} from '../../controllers/Actions';
import Model from '../../models/CompetitionsModel';
import Translation from '../../controllers/LanguageManager';

class ProblemForm  extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.action = postProblems;
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount(){
        Model.on('competitions', this.handleChange)
    }

    componentWillUnmount(){
        Model.removeListener('competitions', this.handleChange);
    }

    handleChange()
    {
        this.forceUpdate();
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.action(values);
            }
        });
    }

    get options(){
        let comp = Model['competitions'];
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
                            label={trans("text")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('text', {
                                rules: [{ required: true, message: "" }],
                            })(
                                <TextArea rows={4} placeholder={trans("text")}/>
                            )}
                        </FormItem>
                        
                        <FormItem
                            label={trans("tests")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('tests', {
                                rules: [{ required: true, message: "" }],
                            })(
                                <TextArea rows={4} placeholder={trans("tests")}/>
                            )}
                        </FormItem>

                        <FormItem
                            label={trans("solution")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('solution', {
                                rules: [{ required: true, message: "" }],
                            })(
                                <TextArea rows={4} placeholder={trans("solution")}/>
                            )}
                        </FormItem>
                        
                        <FormItem
                            label={trans("compilation_time")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('compilationTime', {
                            })(
                                <InputNumber placeholder={trans("compilation_time")}/>
                            )}
                        </FormItem>

                        <FormItem
                            label={trans("competition")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('competitionId', {
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder={trans("competition")}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                   {this.options}
                                </Select>
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

export default Form.create()(ProblemForm)
