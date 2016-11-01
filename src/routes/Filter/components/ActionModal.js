import React, { Component } from 'react'
import { Modal, Input } from 'UI'
import { resolveFilter } from './filterAction'
import { createName } from '../public/tool'

class ActionModal extends Component {
  render() {
    let {
      parentThis,
      filterState,
      currentFilterName,
      errorOf,
      fieldType,
      fieldAll,
      currentFilterCom
    } = this.props

    return (
      <Modal
        onSureLoding={ this.props.onSureLoding }
        size="l"
        title={ filterState === 'edit'? '编辑过滤器': '创建过滤器' }
        onClose={ this.closeModal }
        onSure={ this.props.onSure }
        showModal={ this.props.showModal }
        >
          <div className="page-filter-group">
            <div className="page-filter-item">
              <h4 className="page-filter-item-name">名称</h4>
              <Input
                ref='page_filter_name'
                addClassName="page-filter-item--mw"
                onFocus={ this.focusFilterNameInput }
                defaultValue={ filterState === 'edit'? currentFilterName : createName('新过滤器')}
              />
              {
                errorOf && !currentFilterName ?
                <p className="page-filter--error page-filter--ML">你有名称没有填</p> : null
              }
            </div>
            <div className="page-filter-item">
              <h4 className="page-filter-item-name">条件</h4>
              <div className="page-filter-action">
                { resolveFilter(parentThis, currentFilterCom, fieldType, fieldAll, errorOf) }
              </div>
            </div>
          </div>
      </Modal>
    )
  }

  closeModal = () => {
    this.props.parentThis.setState({showSaveAlertModal : true})
  }

  focusFilterNameInput = () => {
    this.props.parentThis.setState({errorOf: false})
  }
}

export default ActionModal
