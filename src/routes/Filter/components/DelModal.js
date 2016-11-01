import React, { Component } from 'react'
import { Modal } from 'UI'

class DelModal extends Component {
  render() {
    return (
      <Modal
        onSureLoding={ this.props.onSureLoding }
        size="s"
        title="您确定需要删除过滤器吗？"
        onSure= { this.props.onSure }
        onClose={ this.props.onClose }
        showModal={ this.props.showModal }>
      </Modal>
    )
  }
}

export default DelModal
