import React, { Component } from 'react'

import HomeBreadcrumb from './otherComponents/breadcrumb'
import HomeTableHead from './otherComponents/tableHead'
import HomeList from './otherComponents/list'

import DelModal from './otherComponents/delModal'
import ExportModal from './otherComponents/exportModal'
import CopyModal from './otherComponents/copyModal'
import AddContactModal from './otherComponents/addContactModal'
import AddContactGroupModal from './otherComponents/addContactGroupModal'

import NoData from 'Common/NoData'

import _ from 'lodash'
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


class HomeView extends Component{
  static contextTypes = {
      router: React.PropTypes.object
  }
  static timeout
  constructor(props) {
    super(props)
    this.state = {
      search: '', // keyword
      page: 1,
      order_sort: 'desc',
      // 选中的数据list
      activeLiArr: [],
      /**
       * 删除
       */
      // 是否 显示删除 框
      showDelModal: false,
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
       * 添加联系人
       */
      showAddContactModal: false,
      // 需要添加的联系人组的名字
      addGroup: '',
      addMoadl_list_id: '',
      /**
       * 添加联系人组
       */
      // 是否显示联系人组框
      showAddContactGroupModal: false
    }
  }
  // 获取数据
  getData() {
    const {
      search,
      page,
      order_sort
    } = this.state
    this.props.getList({
      page: page,
      keyword: search,
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
    } = this.props.HomeList
    let resetArr = []

    if ( status ) {
      resetArr = listData.filter( (item) => item.lock_status == 0 )
                      .map( ( item ) => item.id )
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
    } = this.props.HomeList
    let tolLength = listData.filter( (item) => item.lock_status == 0 ).length
    return activeLiArr.length !== 0 && tolLength === activeLiArr.length
  }

  /**
   * 添加联系人
   */
  addToContactGroup(list, e) {
    console.log(list.name)
    this.setState({
      showAddContactModal: true,
      addGroupName: list.name,
      addMoadl_list_id: list.id
    })
    this.stop(e)
  }
  // 查看联系人组内联系人
  viewContact(item) {
    this.context.router.push('/contact/lists/' + item.id)
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
    } = this.props.HomeList

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
  // 阻止冒泡
  stop(e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  // 初始化
  componentWillMount() {
    this.props.getFields({})
    this.props.getCopyToList({
      keyword: '',
      order_sort: 'desc',
      page_size: 999999
    })
    this.getData()

    $(document).on('mousewheel DOMMouseScroll', this.scrollGetData.bind(this))
  }
  componentWillUnmount() {
    $(document).off('mousewheel DOMMouseScroll')
  }

  render() {
    // 获取props数据
    const {
      listData = [],
      copyToList = [],
      total,
      fieldsArr = [],
      loading
    } = this.props.HomeList
    // 获取state 数据
    const {
      search,
      activeLiArr,
      activeKeywordArr,
      showDelModal,
      showExportModal,
      showCopyModal,
      showAddContactModal,
      addGroupName,
      addMoadl_list_id,
      showAddContactGroupModal
    } = this.state

    return (
      <div className="page-home">
        <div className={ ['u-loading', 'iconfont', loading? '': 'f-dn'].join(' ')}></div>

        {/* 添加联系人组 */}
        <AddContactGroupModal

          showAddContactModal={ showAddContactGroupModal }
          Set_LocalCSV={ this.props.Set_LocalCSV }
          Set_Local_ADDCONTACTS={ this.props.Set_Local_ADDCONTACTS }
          onClose={ () => this.setState({ showAddContactGroupModal: false}) }
          onSure={ () => this.context.router.push('/contact/create/fieldsMatching') }
          onAddSelf={ () => this.context.router.push('/contact/create/manual') }
          >
        </AddContactGroupModal>
        {/* 添加联系人组 end*/}

        {/* 添加联系人 */}
        <AddContactModal
          list_id = { addMoadl_list_id }
          addContact={ this.props.addContact }

          name = { addGroupName }
          showAddContactModal={ showAddContactModal }
          Set_LocalCSV={ this.props.Set_LocalCSV }
          Set_Local_ADDCONTACTS={ this.props.Set_Local_ADDCONTACTS }
          onClose={ () => this.setState({ showAddContactModal: false}) }
          onSure={ () => this.context.router.push('/contact/create/fieldsMatching') }
          onAddSelf={ () => this.context.router.push('/contact/create/manual') }
          >
        </AddContactModal>
        {/* 添加联系人 end*/}

        {/* 复制 */}
        <CopyModal
          copyToList= { copyToList }
          activeLiArr={ activeLiArr }
          showCopyModal={ showCopyModal }
          onClose={ () => this.setState({ showCopyModal: false}) }
          getCopyToList={ this.props.getCopyToList }
          copyToContact={ this.props.copyToContact }
          onSuccess={ this.successFefresh.bind(this) }
          >
        </CopyModal>
        {/* 复制 end*/}

        {/* 导出预处理 + 导出异步提示 */}
        <ExportModal
          activeLiArr={ activeLiArr }
          fieldsArr={ fieldsArr }
          showExportModal={ showExportModal }
          onExportPrev={ this.props.exportContactPrev }
          onCloseExportPrev={ () => this.setState({ showExportModal: false }) }
          >
        </ExportModal>
        {/* 导出预处理 + 导出异步提示 end*/}

        {/* 删除 */}
        <DelModal
          activeLiArr={ this.state.activeLiArr }
          delList={ this.props.delList }
          showModal= { showDelModal }
          onClose={ () => this.setState({ showDelModal: false}) }
          onDelSuccess = { () => {
              this.setState({
                activeLiArr: []
              })
          } }
        ></DelModal>
        {/* 删除 end*/}

        <div className="m-nav__content">
          {/* 导航模块 */}
          <div className="m-nav__wrap">
            <HomeBreadcrumb />
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
                onClick={ () => this.setState({ showAddContactGroupModal: true }) }
                >
                <Icon type="plus" />
                <span className="u-btn__plusText">添加</span>
              </Button>
            </div>
          </div>
          {/* 导航模块 end */}

          <div className="m-Navplug__wrap">

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

        <div className="m-dataList__wrap m-listTable__wrap"

          >
          <div className="m-listTable__head">
            <HomeTableHead
              onChange={ this.checkAllList.bind(this) }
              checked={ this.getAllStatus() }
            ></HomeTableHead>
          </div>
          <div  className="m-listTable__content">
            {
              listData.length == 0?
              <NoData
                type="contactGroup"
                onClick={ () => this.setState({ showAddContactGroupModal: true }) }
                />
              :listData.map( (item) => {
                return (
                  <HomeList
                    key={ '_homeList' + item.id }
                    item={ item }
                    lock={ item.lock_status != 0 }
                    onUlClick={ this.viewContact.bind(this, item) }
                    onChange={ this.checkList.bind(this, item.id) }
                    checked={ this.getStatus(item.id) }
                    >
                    <Icon
                      className="f-csp"
                      type="plus-o"
                      onClick={ this.addToContactGroup.bind(this, item) }
                      />
                  </HomeList>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }

}

export default HomeView
