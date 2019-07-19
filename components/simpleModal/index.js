import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

class SimpleModal extends Component{
  constructor(props) {
    super(props);
    this.onOk = this.onOk.bind(this);
    this.onCanel = this.onCanel.bind(this);
}
  render(){
    const {visible , title , negative_button_text,positive_button_text} =this.props
    return(
      <Modal
        visible = {visible}
        title = {title}
        onOk = {this.onOk}
        onCanel = {this.onCanel}
        footer={[
          { text: negative_button_text, onPress: this.hideModal},
          { text: positive_button_text, onPress: this.handleSubmit} 
      ]}
      ></Modal>
    )
  }
  onOk() {//hide modal
        const {onOk} = this.props;
        onOk();
    }

    onCanel() {//submit
        const {onCanel} = this.props;
        onCanel();
    }
}
SimpleModal.propTypes = {//参数类型及是否必传
  visible: PropTypes.bool,
  title: PropTypes.string,
  negative_button_text: PropTypes.string.isRequired,
    positive_button_text: PropTypes.string.isRequired,
  children: PropTypes.node //自定义内容
};
SimpleModal.defaultProps = {//默认参数
  visible: false,
  title: '标题',
  negative_button_text: '取消',
  positive_button_text: '确定'
};
export default SimpleModal