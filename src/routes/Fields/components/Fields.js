import React, { Component } from 'react'
import _ from 'lodash'
import {
  Button,
  ButtonGroup,
  Modal,
  Notification,
  Checkbox,
  Radio,
  Icon,
  Input,
  InputGroup,
  SelectMulti
 } from 'UI'

import Nav from './Nav'
import Navplug from './Navplug'
import TableList from './TableList'
import ActionModal from './ActionModal'
import DelModal from './DelModal'
import Loding from '../../Filter/components/Loding'
import ScrollDown from '../../Filter/components/ScrollDown'
import NoData from 'Common/NoData'


import { createName, UpperFirst, pushAllId, findId, subString } from '../../Filter/public/tool'
import baseState from '../stateConfig'

class Fields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 全选的状态
      TotalCheckStatus: false,
      // 当前选择的id
      currentId: -1,
      // 当前选择中的id组
      chooseId: [],
      // 获取列表的配置
      getListConfig: {
        page: 1,
        page_size: 20,
        keyword: '',
        order_by: '',
        order_sort: 'asc'
      },
      //  当前字段数据
      currentData: {},
      //  模态框字段模式 create | edit | see
      ActionModalState: 'create',
      //  字段模态框
      showActionModal: false,
      //  删除模态框
      showDelAlertModal: false,
      //  搜索结果是否无数据
      searchResult: false,
      //  是否在获取数据
      isAjax: false,
      //  数据添加删除时候
      FiledAjaxState: false
    }
  }

  componentDidMount() {
    let { getFields } = this.props
    getFields(this.state.getListConfig)
  }

  componentWillUnmount() {
    this.setState(_.assign(baseState))
  }

  render() {
    let { fieldsList, addField, updateField } = this.props

    return (
      <div className="m-nav__content__fields">
        <div className="m-nav__content">
          {/* 导航工具 */}
          <Nav
            addFilterModal={ this.showActionModal.bind(this, 'create') }
            keyword= { this.state.getListConfig.keyword }
            onSearchTextChange= { this.onSearchTextChange.bind(this)}
            onkeyEnter= { this.onkeyEnter.bind(this) }
            onSearchSure= { this.onSearchSure.bind(this) }
          />
          {
            !this.state.searchResult && fieldsList.listTotal.total == 0?
            null:
            <Navplug
              chooseFilterTotal={ this.state.chooseId.length }
              filterDelete={ this.showDelModal.bind(this, -1) }
              filterTotal={ fieldsList.listTotal.total }
            />
          }
        </div>
        {
          !this.state.searchResult && fieldsList.listTotal.total == 0?
          <NoData
            type="filed"
            onClick={ this.showActionModal.bind(this, 'create') }
          /> :
          <ScrollDown onChange={ this.pageChange.bind(this) } >
            <TableList
              addFilterModal={ this.showActionModal.bind(this, 'create') }
              getFieldsList={ this.getFieldsList.bind(this) }
              searchResult={ this.state.searchResult }
              orderSortChange={ this.orderSortChange.bind(this) }
              onChange={ this.chooseAll.bind(this) }
              checked={ this.state.TotalCheckStatus }>
                {this._renderCHild(fieldsList.listTotal)}
            </TableList>
          </ScrollDown>
       }
        <ActionModal
          resetPageData={ this.resetPageData }
          onSureLoding={ this.state.FiledAjaxState }
          currentData={ this.state.currentData }
          updateField={ updateField }
          addFieldFunc={ addField }
          setState={ this.setState.bind(this) }
          closeModal={ this.closeModal.bind(this) }
          show={ this.state.showActionModal }
          actionType={ this.state.ActionModalState }
        />
        <DelModal
          parentThis = { this }
          onSureLoding={ this.state.FiledAjaxState }
          showModal={ this.state.showDelAlertModal }
          onSure={ this.sureDelFiled.bind(this) }
        />
        {/* 进度条 */}
        <Loding show={ !fieldsList.fetching || this.state.isAjax } />
      </div>
    )
  }

  //  获取字段全局方法
  getFieldsList(config, searchStatus) {
    if (searchStatus) {
      this.setState({searchResult: true})
    } else {
      this.setState({searchResult: false})
    }
    //  ajax 之前
    this.setState({isAjax: true})
    //  ajax 之后
    this.props.getFields(_.merge(this.state.getListConfig, config), () => {
      this.setState({isAjax: false})
    })
  }

  resetPageData = () => {
    this.getFieldsList({
      page: 1,
      page_size: 20
    })
  }
  /**
  * 下拉刷新
  */
  pageChange() {
    let { isAjax, getListConfig } = this.state
    let totalPage = Math.ceil(parseInt(this.props.fieldsList.listTotal.total)/20)

    if ( (getListConfig.page_size/20 >= totalPage) || isAjax ) return false;
    let newPage = (getListConfig.page_size/20) + 1
    console.log('%c 当前加载页数和总页数 ', 'background: green;color:#fff', newPage + ' | ' + totalPage)
    this.getFieldsList({page: 1, page_size: newPage * 20}, false)
  }
  /**
  * Nav 区域方法
  */
  onSearchTextChange(ev) {
    let value = ev.target.value
    this.setState({
      getListConfig: _.merge(this.state.getListConfig, {keyword: value})
    })
  }

  onkeyEnter(ev) {
    if (ev.keyCode == 13) {
      this.onSearchSure()
    }
  }

  onSearchSure() {
    this.getFieldsList({page: 1, page_size: 20}, true)
    this.setState({
      getListConfig: _.merge(this.state.getListConfig, {page: 1, page_size: 20})
    })
  }
  /**
  * TableList 区域方法
  */
  orderSortChange() {
    let sortRule = ['asc', 'desc']
    let { getListConfig } = this.state
    let currentSortRule = _.filter(sortRule, (n) => {
      return n != getListConfig.order_sort
    })[0]

    this.getFieldsList({order_sort: currentSortRule})

    this.setState({
      order_sort: currentSortRule
    })
  }

  onChange(id, props, state, el) {
    let arr = this.state.chooseId
    let data = this.props.fieldsList.listTotal.lists

    state? arr.push(id): arr = _.filter(arr, (n) => n != id)
    let status = arr.length == data.length
    this.setState({chooseId: arr, TotalCheckStatus: status})
  }

  chooseAll(props, state, el) {
    let arr = this.state.chooseId
    let data = this.props.fieldsList.listTotal

    state? arr = pushAllId(data, 'fld_id') : arr = []
    this.setState({chooseId: arr, TotalCheckStatus: state})
  }

  /**
  * Modal 区域方法
  */
  showDelModal(id, e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    this.setState({ showDelAlertModal: true , currentId: id})
  }

  sureDelFiled() {
    let { currentId, chooseId } = this.state
    let { delField } = this.props
    delField(this, currentId > 0? [currentId] : chooseId, this.resetPageData)
    this.setState({FiledAjaxState: true})
  }

  closeModal(type, fn) {
    if (type) {
      let action = {}
      action[type] = false
      this.setState(_.merge(this.state, action))
    }
    fn && fn()
  }

  /*
  * 3中状态
  * @parma type [see, create, edit]
  **/
  showActionModal(type, item) {
    let newData = this.state;

    let action = {
      ActionModalState: type,
      showActionModal: true
    }
    _.isObject(item) && item.fld_id? action.currentData = item : newData.currentData = {}

    this.setState(action)
  }

  //  注入列表
  _renderCHild(data) {
    let { chooseId } = this.state

    return _.map(data.lists, (item, index) => {
      /**
      * data.is_lock || item.is_unique? 现在唯一字段处理有问题, 所以暂时只有查看
      */
      return (
        <ul
          className={'u-row' + (findId(chooseId, item.fld_id)? ' active' : '')}
          key={ 'fld_id' + item.fld_id }
          onClick={ data.is_lock || item.is_unique? this.showActionModal.bind(this, 'see', item) : this.showActionModal.bind(this, 'edit', item) }
          >
          <li className="u-col-3" data-id={findId(chooseId, item.fld_id)  }>
            <Checkbox
              onChange={ this.onChange.bind(this, item.fld_id)}
              lock={ data.data }
              checked={ !data.is_lock && findId(chooseId, item.fld_id) }
            />
          </li>
          <li className="u-col-2">
            { subString(item.name, 20) }
          </li>
          <li className="u-col-4">
            { subString(item.desc, 10)}
          </li>
          <li className="u-col-2">
            { item.type }
          </li>
          <li className="u-col-2">
            { item.is_unique? 'YES':'NO' }
          </li>
          <li className="u-col-3">
            { subString(item._create_operator_name, 10) }
          </li>
          <li className="u-col-2">
            { item._created }
          </li>
          <li className="u-col-3">
            { subString(item._update_operator_name, 10) }
          </li>
          <li className="u-col-2">
            { item._updated }
          </li>
          <li className="u-col-1">
            {
              !item.is_unique?
              <Icon type="remove-o" onClick={ this.showDelModal.bind(this, item.fld_id) } /> : null
            }

          </li>
        </ul>
      )
    })
  }

}

export default Fields
