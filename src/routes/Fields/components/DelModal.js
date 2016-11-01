import React, { Component } from 'react'
import { Modal } from 'UI'

class DelModal extends Component {
  render() {
    return(
      <Modal
        onSureLoding = { this.props.onSureLoding }
        showModal = { this.props.showModal }
        title = "确认将此字段删除吗？"
        size = "s"
        onSure = { this.props.onSure }
        onClose = { this.closeModal }
      >
        <p style={{lineHeight: '24px'}}>
          删除字段会对原由数据进行清理，清理过程中所有联系人均被锁定、同时无法被指定为收信人。
        </p>
      </Modal>
    )
  }

  closeModal = () => {
    this.props.parentThis.setState({
      showDelAlertModal: false,
      currentId: -1
    })
  }
}

export default DelModal
