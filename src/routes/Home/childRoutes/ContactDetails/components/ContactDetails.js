import React, { Component } from 'react'

import {
  Input,
  InputGroup,
  Button,
  ButtonGroup,
  Tooltips,
  Icon,
  Checkbox,
  Notification,
  Modal
 } from 'UI'

import ContactDetailsBreadcrumb from './otherComponents/breadcrumb'
import DetailBaseMsg from './otherComponents/detailBaseMsg'
import DetailFields from './otherComponents/detailFields'
import DETAILS_DelModal from './otherComponents/delModal'
import DETAILS_MoveModal from './otherComponents/moveModal'
import DETAILS_ExportModal from './otherComponents/exportModal'

class ContactDetailsView extends Component{
  static contextTypes = {
      router: React.PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {
      /**
       * 导出
       */
      // 是否显示 导出联系人 框
      showExportModal: false,
      /**
       * 复制
       */
      // 是否显示复制框
      showCopyModal: false,
      /**
       * 移动
       */
      // 是否显示复制框
      showMoveModal: false,
      /**
       * 删除
       */
      // 是否 显示删除 框
      showDelModal: false,
    }
  }

  // 初始化
  componentWillMount() {
    console.log(this.props)
    const _this = this
    this.props.getContactDetails(this.props.params,
      // 找不到该数据时 执行
      () => {
        _this.context.router.push('/')
      }
    )
    this.props.getMoveToList({
      keyword: '',
      order_sort: 'desc',
      page_size: 999999
    })

    this.props.getFields({})
  }
  render() {
    const {
      showDelModal,
      showMoveModal,
      showCopyModal,
      showExportModal
    } = this.state

    const {
      loading,
      _data,
      copyToList,
      fieldsArr
    } = this.props.ContactDetails

    const {
      list_id,
      user_id
    } = this.props.params
    return (
      <div className="page-contactDetails">
        <div className={ ['u-loading', 'iconfont', loading? '': 'f-dn'].join(' ')}></div>

        {/* 导出 */}
        <DETAILS_ExportModal
          list_id={ list_id }
          activeLiArr={ [user_id] }
          fieldsArr={ fieldsArr }
          showExportModal={ showExportModal }
          onExport={ this.props.exportContact }
          onCloseExport={ () => this.setState({ showExportModal: false }) }
          >
        </DETAILS_ExportModal>
        {/* 导出 end*/}

        {/* 复制 */}
        <DETAILS_MoveModal
          title = '复制'
          list_id={ list_id }
          delete_source= { false }
          copyToList= { copyToList }
          activeLiArr={ [user_id] }
          showMoveModal={ showCopyModal }
          onClose={ () => this.setState({ showCopyModal: false}) }
          getMoveToList={ this.props.getMoveToList }
          copyToContact={ this.props.copyToContact }
          onSuccess={ () => this.context.router.push('/') }
          >
        </DETAILS_MoveModal>
        {/* 复制 end*/}

        {/* 移动 */}
        <DETAILS_MoveModal
          title = '移动'
          list_id={ list_id }
          delete_source= { true }
          copyToList= { copyToList }
          activeLiArr={ [user_id] }
          showMoveModal={ showMoveModal }
          onClose={ () => this.setState({ showMoveModal: false}) }
          getMoveToList={ this.props.getMoveToList }
          copyToContact={ this.props.copyToContact }
          onSuccess={ () => this.context.router.push('/') }
          >
        </DETAILS_MoveModal>
        {/* 移动 end*/}

        {/* 删除 */}
        <DETAILS_DelModal
          listId= { list_id }
          activeLiArr={ [user_id] }
          delList={ this.props.delList }
          showModal= { showDelModal }
          onClose={ () => this.setState({ showDelModal: false}) }
          onDelSuccess = { () => this.context.router.push('/') }
        ></DETAILS_DelModal>
        {/* 删除 end*/}

        <div className="m-nav__content">
          {/* 导航模块 */}
          <div className="m-nav__wrap">
            <ContactDetailsBreadcrumb
              list_id={ this.props.params.list_id }
              data={ _data }
              />
          </div>
          {/* 导航模块 end */}

          <div className="m-Navplug__wrap">
            <ButtonGroup className="u-btnGroup--PD">
              <Tooltips
              content="导出"
              placement="top"
              alignCenter={true}>
                <Button
                  onClick={ () => this.setState({ showExportModal: true}) }
                  >
                  <Icon type="cloud-upload" />
                </Button>
              </Tooltips>
              <Tooltips
              content="复制"
              placement="top"
              alignCenter={true}>
                <Button
                  onClick={ () => this.setState({ showCopyModal: true }) }
                  >
                  <Icon type="copy" />
                </Button>
              </Tooltips>
              <Tooltips
              content="移动"
              placement="top"
              alignCenter={true}>
                <Button
                  onClick={ () => this.setState({ showMoveModal: true }) }
                  >
                  <Icon type="move" />
                </Button>
              </Tooltips>
              <Tooltips
              content="删除"
              placement="top"
              alignCenter={true}>
                <Button
                  onClick={ () => this.setState({ showDelModal: true}) }
                  >
                  <Icon type="trash-o" />
                </Button>
              </Tooltips>
            </ButtonGroup>
          </div>
          {/* 联系人基本信息 */}
          <DetailBaseMsg
            data={ _data.user? _data.user: {} }
            />
          {/* 联系人基本信息 end*/}



          {/* 联系人字段 */}
          {
            _data.user?
            <DetailFields
              data={ _data.user }
              list_id={ list_id }
              user_id={ user_id }
              onSave={ this.props.putContactDetails }
              />
            :null
          }
          {/* 联系人字段 end*/}

        </div>

      </div>
    )
  }

}

export default ContactDetailsView
