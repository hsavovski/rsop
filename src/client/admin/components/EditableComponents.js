import React, { Component } from 'react';
import { Table , Input, InputNumber, Popconfirm, Form,} from 'antd';
import Trans from '../../controllers/LanguageManager';

const trans = (value) => Trans.getValue(value);
const FormItem = Form.Item;

export const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
<EditableContext.Provider value={form}>
    <tr {...props} />
</EditableContext.Provider>
);

export const EditableFormRow = Form.create()(EditableRow);

export class EditableCell extends Component {
getInput() {
    if (this.props.inputType === 'number') {
    return <InputNumber />;
    }
    return <Input />;
};

render() {
    const {
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    required,
    ...restProps
    } = this.props;
    return (
    <EditableContext.Consumer>
        {(form) => {
        const { getFieldDecorator } = form;
        return (
            <td {...restProps}>
            {editing ? (
                <FormItem style={{ margin: 0 }}>
                {getFieldDecorator(dataIndex, {
                    rules: [{
                    required: required,
                    message: trans('please_input') + title + "!",
                    }],
                    initialValue: record[dataIndex],
                })(this.getInput())}
                </FormItem>
            ) : restProps.children}
            </td>
        );
        }}
    </EditableContext.Consumer>
    );
}
}
