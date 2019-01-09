import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Alert } from 'antd';
const FormItem = Form.Item;

class LoginForm extends Component {
    constructor()
	{
		super();
		this.state = {
			alert: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch("/admin/login", {
                    credentials: 'same-origin',
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(values)
                }).then((response) => {
                	console.log(response);
                	if(response.status == 401)
					{
						this.setState({alert: true});
					}
                    if(response.ok) {
                        window.location.reload();
                    }
                }).catch((error) => {

                    console.log(error);
                });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        	<div>
				<div className="login">
					<p className="heading">Log in</p>
					<Form onSubmit={this.handleSubmit} className="login-form">
						<FormItem>
							{getFieldDecorator('username', {
								rules: [{ required: true, message: 'Please input your username!' }],
							})(
								<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: 'Please input your Password!' }],
							})(
								<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
							)}
						</FormItem>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
							size="large"
						>
							Log in
						</Button>
					</Form>
                    {this.state.alert &&
                    (<Alert
						style={{marginTop: "15px"}}
						message="Wrong username or password!"
						type="error"
						closable
						onClose={()=>{this.setState({alert: false})}}
						showIcon />)}
				</div>

			</div>
    );
    }
}

export default Form.create()(LoginForm);
