import React, { Component } from 'react'

import {
  Input,
  InputGroup,
  Button,
  ButtonGroup,
  Tooltips,
  Icon,
  Checkbox,
  Modal
 } from 'UI'

import ContactBreadcrumb from './otherComponents/breadcrumb'
import ContactTableHead from './otherComponents/tableHead'
import ContactList from './otherComponents/list'
import CONTACT_DelModal from './otherComponents/delModal'
import CONTACT_MoveModal from './otherComponents/moveModal'
import CONTACT_ExportModal from './otherComponents/exportModal'
import CONTACT_AddContactModal from './otherComponents/addContactModal'

import NoData from 'Common/NoData'

class ContactView extends Component{
  static contextTypes = {
      router: React.PropTypes.object
  }
  static timeout
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      page: 1,
      order_sort: 'desc',
      // 选中的数据list
      activeLiArr: [],
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
      /**
       * 添加联系人
       */
      showAddContactModal: false,
      /**
       * 左右滑动模块
       */
      // 单个单元格宽度
      itemWidth: 150,
      // 偏移量
      offsetDistance:0,
      // 最大偏移量
      maxOffset: 1
    }
  }
  // 获取数据
  getData() {
    console.log('获取数据')
    const {
      search,
      order_sort
    } = this.state
    console.log(this.props)
    const {
      listId
    } = this.props.params

    this.props.getList({
      keyword: search,
      list_id: listId,
      order_sort
    })
  }
  // 全选
  checkAllList( selProps, status, self ) {
    const {
      activeLiArr
    } = this.state
    const {
      listData
    } = this.props.ContactList
    let resetArr = []

    if ( status ) {
      resetArr = listData.map( ( item ) => item.id )
    }
    // 重置 activeLiArr
    this.setState({
      activeLiArr: resetArr
    })
  }
  // 单选
  checkList( uid, selProps, status, self ) {
    const {
      activeLiArr
    } = this.state
    let resetArr = activeLiArr
    let hasChild = activeLiArr.some( (item) => item == uid )

    if ( status && !hasChild ) {
      resetArr.push( uid )
    } else if ( !status && hasChild ) {
      resetArr = activeLiArr.filter( (item) => item != uid )
    }

    console.log(resetArr)
    // 重置 activeLiArr
    this.setState({
      activeLiArr: resetArr
    })
  }
  // 单选 是否选中
  getStatus( uid ) {
    const {
      activeLiArr
    } = this.state
    return activeLiArr.some( (item) => item == uid )
  }
  // 全选 是否选中
  getAllStatus() {
    const {
      activeLiArr
    } = this.state
    const {
      listData = []
    } = this.props.ContactList
    let tolLength = listData.length
    return activeLiArr.length !== 0 && tolLength === activeLiArr.length
  }

  // 查看联系人详情
  viewDetails(item) {
    console.log('查看联系人详情', item)
    const {
      listId
    } = this.props.params
    this.context.router.push('contact/'+ listId +'/details/' + item.id)
  }

  // 滚动翻页
  scrollGetData() {
    const {
      page,
      search,
      order_sort
    } = this.state
    const {
      totalPage
    } = this.props.ContactList

    const minTrigger = 40
    let ctH = $('.m-dataList__wrap').height() - 42
    let listH = $('.m-listTable__content').height()
    let scrollH = $('.m-dataList__wrap').scrollTop()
    // 是否达到触发最小距离
    let trigger = listH - scrollH < ctH + minTrigger
    console.log('翻滚中', scrollH, ctH, listH)
    console.log(trigger, totalPage, page)
    if( trigger && (totalPage> page) ) {
      this.setState({
        page: page+1
      }, () => {
        clearTimeout(this.timeout)
        this.timeout = setTimeout( () => {
          this.props.getList({
            page: page + 1 ,
            keyword: search,
            order_sort,
            isAdd: true
          })
        }, 500)
      })
    }
  }

  // 左右移动
  setOffset(arrow) {
    const {
      offsetDistance,
      itemWidth
    } = this.state
    const {
      fieldsArr
    } = this.props.ContactList
    const step = $(this.refs.head.refs.offsetCt).width()
    let maxOffset = fieldsArr.length * itemWidth - step
    maxOffset = maxOffset<0? 0: maxOffset
    let offset = offsetDistance

    if ( arrow === 'left') {
      if ( offset - step <= 0 ){
        offset = 0
      } else {
        offset = offset - step
      }
    } else {
      if ( offset + step >= maxOffset ){
        offset = maxOffset
      } else {
        offset = offset + step
      }
    }
    console.log(offset)
    this.setState({
      offsetDistance: offset,
      maxOffset
    })
  }
  // ajax成功后刷新数据
  successFefresh() {
    const _this = this
    this.setState({
      page: 1,
      activeLiArr: [],
    }, () => {
      _this.getData()
    })
  }

  resizeMaxoffset() {
    const {
      itemWidth
    } = this.state
    const {
      fieldsArr
    } = this.props.ContactList

    const step = $(this.refs.head.refs.offsetCt).width()
    let maxOffset = fieldsArr.length * itemWidth - step
    maxOffset = maxOffset<0? 0: maxOffset

    this.setState({
      maxOffset
    })
  }

  // 初始化
  componentWillMount() {
    const _this = this
    $(window).on('resize', this.resizeMaxoffset.bind(this))

    this.getData()
    this.props.getMoveToList({
      keyword: '',
      order_sort: 'desc',
      page_size: 999999
    })
    this.props.getFields({},
      // successFN
      () => {
        _this.resizeMaxoffset()
      }
    )
    $(document).on('mousewheel DOMMouseScroll', this.scrollGetData.bind(this))
  }

  componentWillUnmount() {
    $(document).off('mousewheel DOMMouseScroll')
    $(window).off('resize')
  }
  render() {
    const {
      search,
      activeLiArr,
      showDelModal,
      showCopyModal,
      showMoveModal,
      showExportModal,
      showAddContactModal,
      itemWidth,
      offsetDistance,
      maxOffset
    } = this.state

    const {
      loading,
      total,
      listData,
      listName,
      copyToList = [],
      fieldsArr = [],
    } = this.props.ContactList

    const {
      listId
    } = this.props.params


    return (
      <div className="page-contact">
        <div className={ ['u-loading', 'iconfont', loading? '': 'f-dn'].join(' ')}></div>

        {/* 添加联系人 */}
        <CONTACT_AddContactModal
          list_id = { listId }
          addContact={ this.props.addContact }

          name = { listName }
          showAddContactModal={ showAddContactModal }
          Set_LocalCSV={ this.props.Set_LocalCSV }
          Set_Local_ADDCONTACTS={ this.props.Set_Local_ADDCONTACTS }
          onClose={ () => this.setState({ showAddContactModal: false}) }
          onSure={ () => this.context.router.push('/contact/create/fieldsMatching') }
          onAddSelf={ () => this.context.router.push('/contact/create/manual') }
          >
        </CONTACT_AddContactModal>
        {/* 添加联系人 end*/}

        {/* 导出 */}
        <CONTACT_ExportModal
          list_id={ listId }
          activeLiArr={ activeLiArr }
          fieldsArr={ fieldsArr }
          showExportModal={ showExportModal }
          onExport={ this.props.exportContact }
          onCloseExport={ () => this.setState({ showExportModal: false }) }
          >
        </CONTACT_ExportModal>
        {/* 导出 end*/}

        {/* 复制 */}
        <CONTACT_MoveModal
          title = '复制到'
          list_id={ listId }
          delete_source= { false }
          copyToList= { copyToList }
          activeLiArr={ activeLiArr }
          showMoveModal={ showCopyModal }
          onClose={ () => this.setState({ showCopyModal: false}) }
          getMoveToList={ this.props.getMoveToList }
          copyToContact={ this.props.copyToContact }
          onSuccess={ this.successFefresh.bind(this) }
          >
        </CONTACT_MoveModal>
        {/* 复制 end*/}

        {/* 移动 */}
        <CONTACT_MoveModal
          title = '移动到'
          list_id={ listId }
          delete_source= { true }
          copyToList= { copyToList }
          activeLiArr={ activeLiArr }
          showMoveModal={ showMoveModal }
          onClose={ () => this.setState({ showMoveModal: false}) }
          getMoveToList={ this.props.getMoveToList }
          copyToContact={ this.props.copyToContact }
          onSuccess={ this.successFefresh.bind(this) }
          >
        </CONTACT_MoveModal>
        {/* 移动 end*/}

        {/* 删除 */}
        <CONTACT_DelModal
          listId= { listId }
          activeLiArr={ this.state.activeLiArr }
          delList={ this.props.delList }
          showModal= { showDelModal }
          onClose={ () => this.setState({ showDelModal: false}) }
          onDelSuccess = { this.successFefresh.bind(this) }
        ></CONTACT_DelModal>
        {/* 删除 end*/}

        <div className="m-nav__content">
          {/* 导航模块 */}
          <div className="m-nav__wrap">
            <ContactBreadcrumb
              listName={ listName }
              />
            <div className="m-nav__tools">
              <InputGroup type="searchDif">
                <Input placeholder="搜索..." shape="round" addClassName="u-input--search"
                  value={ search }
                  onKeyUp={ (e) => { e.keyCode == 13? this.getData(): null } }
                  onChange={ (e) => this.setState({ search: e.target.value }) }
                />
                <Icon type="search"
                  onClick={ this.getData.bind(this) }
                />
              </InputGroup>

              <Button color="main" className="u-btn__plus"
                >
                <Icon type="plus" />
                <span className="u-btn__plusText"
                  onClick={ () => this.setState({ showAddContactModal: true}) }
                  >
                  添加
                </span>
              </Button>
            </div>
          </div>
          {/* 导航模块 end */}

          <div className="m-Navplug__wrap ">

            <span className="m-Navplug__pageDec">
              总共 { total } 组,已选中
              <em className="m-Navplug__pageDec--tip">
                { activeLiArr.length }
              </em>
              项
            </span>
            {
              ( activeLiArr.length > 0 )?
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
              : null
            }
          </div>
        </div>

        <div className="m-dataList__wrap m-listTable__wrap">
          {
            fieldsArr.length?
            <div className="m-listTable__head">
              {
                offsetDistance !== 0 ?
                <Icon className="arrLeft" type="arrow-circle-left"
                  onClick={ this.setOffset.bind(this, 'left') }
                  />
                : null
              }
              {
                offsetDistance < maxOffset?
                <Icon className="arrRight" type="arrow-circle-right"
                  onClick={ this.setOffset.bind(this, 'right') }
                  />
                : null
              }
              <ContactTableHead
                ref="head"
                itemWidth={ itemWidth }
                offsetDistance={ offsetDistance }
                fieldsArr={ fieldsArr }
                onChange={ this.checkAllList.bind(this) }
                checked={ this.getAllStatus() }
                />
            </div>
            :null
          }

          <div  className="m-listTable__content">
            {
              // fieldsArr.length?
              listData.length?
              listData.map( (item) => {
                return (
                  <ContactList
                    key={ '_homeList' + item.id }
                    item={ item }
                    itemWidth={ itemWidth }
                    offsetDistance={ offsetDistance }
                    fieldsArr={ fieldsArr }
                    onUlClick={ this.viewDetails.bind(this, item) }
                    onChange={ this.checkList.bind(this, item.id) }
                    checked={ this.getStatus(item.id) }
                    >
                    <Icon
                      className="f-csp"
                      type="remove-o"
                      onClick={ () => {
                        this.setState({
                          activeLiArr: [item.id],
                          showDelModal: true
                        })
                      } }
                      />
                  </ContactList>
                )
              })
              :<NoData
                type="contact"
                onClick={ () => this.setState({ showAddContactModal: true}) }
                />
            }
          </div>
        </div>

      </div>
    )
  }

}

export default ContactView
