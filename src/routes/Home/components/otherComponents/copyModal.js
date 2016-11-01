import React, { Component, PropTypes } from 'react'

import {
  Checkbox,
  Modal,
  SelectWithInput,
  Notification
 } from 'UI'

class CopyModal extends Component{
  constructor(props) {
    super(props)
    this.state = {
      // 复制搜索
      copySearch: '',
      // 定时器
      copyTimeout: null,
    }
  }
  // 搜索获取下拉菜单数据，目前delay 500毫秒
  copyInputChange(e) {
    const _this = this
    const value = e.target.value

    clearTimeout(this.state.copyTimeout)
    _this.setState({
      copySearch: value,
      copyTimeout: setTimeout(() => {
        _this.props.getCopyToList({
          keyword: value,
          order_sort: 'desc',
          page_size: 999999
        })
      }, 500)
    })
  }
  // 添加到已有联系人组
  copyTo(lid) {
    const _this = this
    const {
      activeLiArr
    } = this.props
    this.props.copyToContact(
      {
        list_ids: activeLiArr,
        type: 1,
        type_data: lid
      },
      () => {
        _this.close()
        Notification.init({
          iconType: 'check-circle',
          content: '复制完毕',
          onClose () {
            console.log(1)
            _this.props.onSuccess()
            // window.location.reload()
          }
        })
      }
    )
  }
  // 添加到新建联系人组
  copyToNew() {
    const {
      copySearch
    } = this.state
    const {
      activeLiArr
    } = this.props
    this.props.copyToContact(
      {
        list_ids: activeLiArr,
        type: 2,
        type_data: copySearch
      },
      () => {
        Notification.init({
          iconType: 'check-circle',
          content: '复制完毕',
          onClose () {
            window.location.reload()
          }
        })
      }
    )
  }

  close() {
    this.setState({
      // 复制搜索
      copySearch: '',
      // 定时器
      copyTimeout: null,
    })
    this.props.onClose()
  }
  render() {
    const {
      showCopyModal,
      copyToList,
      activeLiArr
    } = this.props
    const {
      copySearch
    } = this.state
    return (
      <Modal
        className="copyModal"
        title="复制到"
        showModal={ showCopyModal }
        onClose={ this.close.bind(this) }
        >
        <div className="u-row">
          <div className="u-col-3 leftCt">
            名称
          </div>
          <div className="u-col-19 rightCt">
            <SelectWithInput
              placeholder="复制到"
              onChange={ this.copyInputChange.bind(this)}
              actCt={ copySearch? '创建 \"' + copySearch +'\" 联系人组': ''}
              actClick={ copySearch? this.copyToNew.bind(this) :null }
              >
              {copyToList.map(( item, index ) => {
                return (
                  <li key = { 'item' + index }>
                    <a href='javascript:;'
                      onClick={ this.copyTo.bind(this, item.id) }
                      >
                      <div className="u-row">
                        <div className="u-col-12" title={ item.name }>
                          { item.name }
                        </div>
                        <div className="u-col-6">
                          { item._create_operator_name }
                        </div>
                        <div className="u-col-6">
                          { item._created }
                        </div>
                      </div>
                    </a>
                  </li>
                )
              })}
            </SelectWithInput>
          </div>
        </div>
      </Modal>
    )
  }
}
export default CopyModal
