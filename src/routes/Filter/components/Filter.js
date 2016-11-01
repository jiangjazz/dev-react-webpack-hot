import React, { Component } from 'react'
import _ from 'lodash'
import {
  Checkbox,
  Icon
 } from 'UI'

 import Nav from './Nav'
 import Navplug from './Navplug'
 import TableList from './TableList'
 import Loding from './Loding'
 import ScrollDown from './ScrollDown'
 import NoData from 'Common/NoData'
 import DelModal from './DelModal'
 import AlertModal from './AlertModal'
 import ActionModal from './ActionModal'

import { createName, UpperFirst, pushAllId, findId, subString, compacts } from '../public/tool'

import baseState from '../stateConfig'


class Filter extends Component{
  constructor(props) {
    super(props);

    this._renderCHild.bind(this)
    this.state = {
      // 编辑和创建模态框
      showActionModal: false,
      // 删除模态框
      showDelModal: false,
      // 是否要保存的模态框
      showSaveAlertModal: false,
      // 当前选择的id
      currentId: -1,
      // 当前选择中的id组
      chooseId: [],
      // 编辑器状态  ( edit | create )
      filterState: 'create',
      // 全选的状态
      TotalCheckStatus: false,
       // 获取列表的配置
      getListConfig: {
        page: 1,
        page_size: 20,
        keyword: '',
        order_by: '',
        order_sort: 'asc'
      },
      //  当前的编辑的名字
      currentFilterName: '',
      //  当前过滤器的默认配置
      currentFilterCom: [
        {"content":[{"name":"","operate":"","value":"","cate":"","type":""}]}
      ],
       // 搜索结果是否为无数据
      searchResult: false,
      //  打开检测后的错误信息提示
      errorOf: false,
      //  是否在获取数据
      isAjax: false,
      //  数据添加删除时候
      filterAjaxState: false
    }
  }

  componentDidMount() {
    let {
      getFieldsType,
      getFilter,
      getAllField,
      fieldType,
      fieldAll
    } = this.props

    getFilter(this.state.getListConfig)
    getAllField()
    _.isEmpty(fieldType) ? getFieldsType() : null
  }

  //  页面状态重置
  componentWillUnmount() {
    this.setState(_.assign(baseState))
  }

  render() {
    let {
      filterList,
      fieldType,
      fieldAll
    } = this.props
    let {
      filterState,
      showActionModal,
      currentFilterName,
      errorOf,
      chooseId,
      currentFilterCom,
      showDelModal,
      showSaveAlertModal
    } = this.state

    return (
      <div className="m-nav__content__filter">
        {/* 导航标签 */}
        <div className="m-nav__content">
          <Nav
            addFilterModal= { this.showModal.bind(this, 'showActionModal', 'create') }
            keyword= { this.state.getListConfig.keyword }
            onSearchTextChange= { this.onSearchTextChange.bind(this)}
            onkeyEnter= { this.onkeyEnter.bind(this) }
            onSearchSure= { this.onSearchSure.bind(this) }
          />
          {
            !this.state.searchResult  && filterList.listTotal.total == 0?
            null:
            <Navplug
              chooseFilterTotal={ this.state.chooseId.length }
              filterDelete={ this.showDelModal.bind(this, -1) }
              filterTotal={ filterList.listTotal.total }
            />
          }
        </div>
        {
          !this.state.searchResult  && filterList.listTotal.total == 0?
          <NoData
            type="filter"
            onClick={  this.showModal.bind(this, 'showActionModal', 'create') }
          /> :
          <ScrollDown onChange={ this.pageChange.bind(this) } >
            <TableList
              searchResult={ this.state.searchResult }
              addFilterModal={ this.showModal.bind(this, 'showActionModal', 'create') }
              getFieldsList={ this.getFilterList.bind(this) }
              orderSortChange={ this.orderSortChange.bind(this) }
              onChange={ this.chooseAll.bind(this) }
              checked={ this.state.TotalCheckStatus}>
                {this._renderCHild(filterList.listTotal)}
            </TableList>
          </ScrollDown>
        }
        {/* 模态框区 */}
        <ActionModal
          onSureLoding = {this.state.filterAjaxState}
          ref="action_modal"
          parentThis= { this }
          filterState= { filterState }
          onSure= { this.ModalActionFilter.bind(this) }
          showModal= { showActionModal }
          errorOf={ errorOf }
          currentFilterName={ currentFilterName }
          currentFilterCom={ currentFilterCom }
          fieldType={ fieldType }
          fieldAll={ fieldAll }
        />
        <DelModal
          onSureLoding = {this.state.filterAjaxState}
          onSure= { this.sureDel.bind(this) }
          onClose={ this.hideModal.bind(this) }
          showModal={ showDelModal }
        />
        <AlertModal
          onSureLoding = {this.state.filterAjaxState}
          parentThis = { this }
          currentFilterCom = { _.assign(baseState).currentFilterCom }
          showModal = { showSaveAlertModal }
        />
        {/* 加载 */}
        <Loding show={ !filterList.fetching || this.state.isAjax} />
      </div>
    )
  }

  //  获取字段全局方法
  getFilterList(config, searchStatus) {
    if (searchStatus) {
      this.setState({searchResult: true})
    } else {
      this.setState({searchResult: false})
    }

    //  ajax 之前
    this.setState({isAjax: true})
    //  后面添加一个配置 是否合并原来的数据
    this.props.getFilter(_.merge(this.state.getListConfig, config), () => {
      this.setState({isAjax: false, TotalCheckStatus: false})
    })
  }

  //  删除 | 新增 的时候重新获取第一页数据
  resetPageData = () => {
    this.getFilterList({
      page:1,
      page_size: 20,
    })
  }

  //  下拉刷新回调执行
  pageChange() {
    let { isAjax, getListConfig } = this.state
    let totalPage = Math.ceil(parseInt(this.props.filterList.listTotal.total)/20)

    //  判断页数 等于总页数的话 停止
    if ( (getListConfig.page_size/20 >= totalPage) || isAjax ) return false;
    let newPage = (getListConfig.page_size/20) + 1
    this.getFilterList({page: 1, page_size: newPage * 20}, false)

    console.log('%c 当前加载页数和总页数 ', 'background: green;color:#fff', newPage + ' | ' + totalPage)
  }

  /**
  * Nav 区域方法
  */
  //  搜索改变 keyword 值
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
    this.getFilterList({page: 1, page_size: 20}, true)
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

    this.getFilterList({order_sort: currentSortRule})

    this.setState({
      order_sort: currentSortRule
    })
  }

  onChange(id, props, state, el, e) {
    let arr = this.state.chooseId
    let data = this.props.filterList.listTotal.lists

    state? arr.push(id): arr = _.filter(arr, (n) => n != id)
    let status = arr.length == data.length

    this.setState({chooseId: arr, TotalCheckStatus: status})
  }

  chooseAll(props, state, el) {
    let arr = this.state.chooseId
    let data = this.props.filterList.listTotal

    state? arr = pushAllId(data, 'flt_id') : arr = []

    this.setState({chooseId: arr, TotalCheckStatus: state})
  }

  /**
  * Modal 区域方法
  */
  showModal(type, state = 'create', id) {
    let action = { filterState: 'create'}
    action[type] = true
    action.currentId = id? id : -1;
    this.setState(action)

  }

  //  编辑单个过滤器的时候
  showFilterActionModal( type, item) {
    this.setState({
      showActionModal: true,
      filterState: 'edit',
      currentId: item.flt_id,
      currentFilterCom: JSON.parse(item.raw_data),
      currentFilterName: item.name
    })
  }

  /**
  * 显示删除模态框
  * id   true 批量删除  false 单个删除
  */
  showDelModal(id, e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()

    if (_.isNumber(id)) {
      this.setState({
        currentId: id,
        showDelModal: true
      })
      return false;
    }
    this.setState({showDelModal: true})
  }

  sureDel() {
    let { currentId, chooseId } = this.state
    let { deleteFilter } = this.props
    this.setState({filterAjaxState: true})
    deleteFilter(this, currentId < 0? chooseId : [currentId], this.resetPageData)
  }

  hideModal() {
    this.setState({
      currentId: -1,
      showModal: false,
      showDelModal: false
    })
  }

  ModalActionFilter() {
    const {
      currentFilterName,
      currentFilterCom,
      filterState,
      currentId
    }  = this.state

    let modalRefInputCom = this.refs.action_modal.refs.page_filter_name
    let defaultValue = modalRefInputCom.refs.u_ipt.value

    let errArr = []
    // 1. 判断是否写全?
    _.each(currentFilterCom, (val, k) => {
      _.each(val.content, (item, i) => {
        if (item.operate != 'is empty' && item.operate != 'is not empty') {

          if (!item.value) {
            errArr.push(item)
          } else if (item.operate == 'is between') {
            item.value === ','? errArr.push(item) : null;
            (item.value !== ',' && compacts(item.value.split(',')).length !==2)? errArr.push(item) : null;
          }

        }
      })
    })

    if (errArr.length > 0 || !defaultValue) {
      this.setState({errorOf: true, currentFilterName: defaultValue})
      return false;
    }

    // 2. 保存
    if (filterState == 'create') {
      this.props.addFilter(this, {name: defaultValue, data: currentFilterCom}, this.resetPageData)

    } else {
      this.props.updateFilter(this, {name: defaultValue, data: currentFilterCom, id: currentId})
    }

    this.setState({errorOf: false, filterAjaxState: true})
  }

  //  注入列表
  _renderCHild(data) {
    const { chooseId } = this.state
    return _.map(data.lists, (item, index) => {
      return (
        <ul
          className={'u-row' + (findId(chooseId, item.flt_id)? ' active' : '')} key={ 'flt_id' + item.flt_id }
          onClick={this.showFilterActionModal.bind(this, 'edit', item)} >
          <li className="u-col-3">
            <Checkbox
              onChange={ this.onChange.bind(this, item.flt_id)}
              checked={ findId(chooseId, item.flt_id)}
            />
          </li>
          <li className="u-col-4"> { subString(item.name, 20) } </li>

          <li className="u-col-4"> { subString(item._create_operator_name, 5)} </li>

          <li className="u-col-3"> { item._created } </li>

          <li className="u-col-3"> { subString(item._update_operator_name, 5) } </li>

          <li className="u-col-3"> { item._updated } </li>

          <li className="u-col-4">
            <Icon type="remove-o" onClick={this.showDelModal.bind(this, item.flt_id)}/>
          </li>
        </ul>
      )
    })
  }
}

export default Filter
