import { Table, Input, Button, Modal, Form, InputNumber, Radio } from 'antd';
import React from 'react';
import { connect } from 'dva';
class Student extends React.Component {
  state = {
    visible: false,
    curInput: {},
  };

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
                this.setState({
                  visible: true,
                  curInput: row,
                });
              }}
            >
              修改
            </Button>

            <Button
              onClick={() => {
                this.props.delStu(row.id);
              }}
            >
              删除
            </Button>
          </div>
        );
      },
    },
  ];

  render() {
    let { Search } = Input;
    let { getFieldDecorator } = this.props.form;

    let { visible } = this.state;
    return (
      <>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onSearch={searchValue => {
            this.props.getList(1, this.props.limit, searchValue);
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
          destroyOnClose
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 12 }}>
            <Form.Item label="姓名">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your name!' }],
                initialValue: this.state.curInput.name,
              })(<Input placeholder="name" />)}
            </Form.Item>
            <Form.Item label="年龄">
              {getFieldDecorator('age', {
                rules: [{ required: true, message: 'Please input your age!' }],
                initialValue: this.state.curInput.age,
              })(<InputNumber min={18} max={99} />)}
            </Form.Item>
            <Form.Item label="性别">
              {getFieldDecorator('sex', {
                rules: [{ required: true, message: 'Please input your sex!' }],
                initialValue: this.state.curInput.sex,
              })(
                <Radio.Group>
                  <Radio value={1}>男</Radio>
                  <Radio value={0}>女</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
  handleOk = () => {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        let item = value;
        let id = this.state.curInput.id;
        this.props.changItem(id, item);
        this.setState({
          visible: false,
        });
      }
    });
  };
  // handleInputname = e => {
  //   let value = e.target.value;
  //   this.setState({
  //     curInput: { ...this.state.curInput, name: value },
  //   });
  // };
  // handleInputage = e => {
  //   let value = e.target.value;

  //   this.setState({
  //     curInput: { ...this.state.curInput, age: value },
  //   });
  // };
  // handleInputsex = e => {
  //   let value = e.target.value;

  //   this.setState({
  //     curInput: { ...this.state.curInput, sex: parseInt(value) },
  //   });
  // };
  handleCancel = () => {
    this.setState({
      visible: false,
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
      getList: (page = 1, pageSize = 5, searchValue = '') => {
        dispatch({
          type: 'student/getList',
          page,
          pageSize,
          searchValue,
        });
      },
      changItem: (id, item) => {
        console.log(item);
        dispatch({
          type: 'student/changItem',
          id,
          item,
        });
      },

      delStu: id => {
        dispatch({
          type: 'student/delItem',
          id,
        });
      },
    };
  },
)(Form.create()(Student));
