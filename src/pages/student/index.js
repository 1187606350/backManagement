import { Table, Input, Button, Modal, Form } from 'antd';
import React from 'react';
import { connect } from 'dva';
class Student extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      curInput: {},
    };
  }
  columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      key: 'sex',
      render: text => <div>{text === 1 ? '男' : '女'}</div>,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, row) => {
        return (
          <div>
            <Button
              type="primary"
              onClick={() => {
                console.log(row);

                this.showModal(row);
              }}
            >
              修改
            </Button>

            <Button>删除</Button>
          </div>
        );
      },
    },
  ];

  render() {
    const { Search } = Input;
    const { getFieldDecorator } = this.props.form;
    let { name, age, sex } = this.state.curInput;
    let { visible } = this.state;
    return (
      <>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onSearch={value => {
            this.props.getList(1, this.props.limit, value);
          }}
        />
        <Table
          columns={this.columns}
          dataSource={this.props.list}
          rowKey="id"
          pagination={{
            pageSize: 5,
            total: this.props.total,
            onChange: (page, pageSize) => {
              this.props.getList(page, pageSize);
            },
          }}
        />
        <Modal
          title="请输入要修改的内容"
          visible={visible}
          onOk={() => {
            this.props.handleOk(this.state.curInput);
            this.handleOk();
          }}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your name!' }],
                initialValue: name,
              })(<Input onChange={this.handleInputname.bind(this)} placeholder="name" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('age', {
                rules: [{ required: true, message: 'Please input your age!' }],
                initialValue: age,
              })(<Input onChange={this.handleInputage.bind(this)} placeholder="age" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('sex', {
                rules: [{ required: true, message: 'Please input your sex!' }],
                initialValue: sex,
              })(<Input onChange={this.handleInputsex.bind(this)} placeholder="sex" />)}
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
  handleOk = () => {
    this.setState({
      visible: false,
    });
  };
  handleInputname = e => {
    let value = e.target.value;

    this.setState({
      curInput: { ...this.state.curInput, name: value },
    });
  };
  handleInputage = e => {
    let value = e.target.value;

    this.setState({
      curInput: { ...this.state.curInput, age: value },
    });
  };
  handleInputsex = e => {
    let value = e.target.value;

    this.setState({
      curInput: { ...this.state.curInput, sex: value },
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  showModal = row => {
    this.setState({
      visible: true,
      curInput: row,
    });
  };
  componentDidMount() {
    this.props.getList();
  }
}

export default connect(
  state => {
    return {
      list: state.student.list,
      total: state.student.total,
      limit: state.student.limit,
      page: state.student.page,
    };
  },
  dispatch => {
    return {
      getList: (page = 1, pageSize = 5, value = '') => {
        dispatch({
          type: 'student/getList',
          page,
          pageSize,
          value,
        });
      },
      handleOk: item => {
        dispatch({
          type: 'student/changItem',
          item,
        });
      },

      // getSerachList: value => {
      //   console.log(value);

      //   dispatch({
      //     type: 'student/getSerachList',
      //     value,
      //   });
      // },
    };
  },
)(Form.create()(Student));
