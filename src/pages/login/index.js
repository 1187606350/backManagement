import { Form, Button, Input } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
const Login = props => {
  let { getFieldDecorator } = props.form;
  return (
    <div>
      <Form className={styles.form}>
        <h1>{props.username}</h1>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(<Input placeholder="Username" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input type="password" placeholder="Password" />)}
        </Form.Item>

        <Button
          type="primary"
          onClick={() => {
            props.handleLogin(props.form);
          }}
          className={styles.login_form}
        >
          Log in
        </Button>
      </Form>
    </div>
  );
};
export default connect(
  state => {
    return {
      username: state.user.username,
    };
  },
  dispatch => {
    return {
      handleLogin: form => {
        form.validateFields((error, values) => {
          if (!error) {
            console.log(values);
            dispatch({
              type: 'user/login',
              payload: values,
            });
          }
        });
      },
    };
  },
)(Form.create(null)(Login));
