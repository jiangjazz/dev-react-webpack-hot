import React, { Component } from 'react'
import { Modal } from 'UI'

import baseState from '../stateConfig'

class AlertModal extends Component {
  render() {
    return (
      <Modal
        onSureLoding={ this.props.onSureLoding }
        size="s"
        title="过滤器尚未保存，确定退出？"
        onClose= { this.closeModal }
        onSure= { this.sureModal }
        showModal={ this.props.showModal }>
      </Modal>
    )
  }

  closeModal = () => {
    this.props.parentThis.setState({showSaveAlertModal : false})
  }

  sureModal = () => {
    this.props.parentThis.setState({
      showActionModal: false,
      showSaveAlertModal: false,
      currentFilterCom: _.assign(baseState.currentFilterCom)
    })
  }
}

export default AlertModal
