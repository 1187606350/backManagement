import { Form, Input } from 'antd';
import React from 'react';
class ChangeInfo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
          })(<Input placeholder="name" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('age', {
            rules: [{ required: true, message: 'Please input your age!' }],
          })(<Input placeholder="age" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('sex', {
            rules: [{ required: true, message: 'Please input your sex!' }],
          })(<Input placeholder="sex" />)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(ChangeInfo);
