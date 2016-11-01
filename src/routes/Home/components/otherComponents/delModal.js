import React, { Component, PropTypes } from 'react'

import {
  Checkbox,
  Modal,
  Notification
 } from 'UI'

class DelModal extends Component{
  constructor(props) {
    super(props)
    this.state = {
      // 是否 同时删除联系人
      delUser: false,
    }
  }
  // 删除数据
  delData() {
    const _this = this
    const {
      activeLiArr,
      onDelSuccess
    } = this.props
    const {
      delUser
    } = this.state
    _this.props.delList({
      is_user: delUser,
      list_ids: activeLiArr
    }, () => {
      _this.close()
      Notification.init({
        iconType: 'check-circle',
        content: '删除完毕',
        onClose () {
          onDelSuccess()
        }
      })
    })
  }
  close() {
    this.props.onClose()
    this.setState({
      delUser: false
    })
  }
  render() {
    const {
      showModal,
      onClose,
      checkChange
    } = this.props
    const {
      delUser
    } = this.state
    return (
      <Modal
        title="您确定需要删除联系人组吗？"
        className="delModal"
        size="s"
        showModal={ showModal }
        onClose={ this.close.bind(this) }
        onSure={ this.delData.bind(this) }
        >
        <div className="f-tac">
          <Checkbox
            onChange={ (props, status) => this.setState({delUser: status}) }
            distance="5"
          >
            同时删除组内所有联系人
          </Checkbox>
        </div>
      </Modal>
    )
  }
}
export default DelModal
