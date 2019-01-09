import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import {postUniversities} from '../../controllers/Actions';
import Model from '../../models/CompetitionsModel';
import Translation from '../../controllers/LanguageManager';

class UniversityForm  extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.action = postUniversities;
    }
    
    handleSubmit(event) {
        event.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.action(values);
            }
        });
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
                            label={trans("abbreviation")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('abbreviation', {
                                rules: [{ required: true, message: "" }],
                            })(
                                <Input placeholder={trans("abbreviation")}/>
                            )}
                        </FormItem>
                        
                        <FormItem
                            label={trans("city")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('city', {
                                rules: [{ required: true, message: "" }],
                            })(
                                <Input placeholder={trans("city")}/>
                            )}
                        </FormItem>
                        
                        <FormItem
                            label={trans("type")}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('type', {
                            })(
                                <Input placeholder={trans("type")}/>
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

export default Form.create()(UniversityForm)
