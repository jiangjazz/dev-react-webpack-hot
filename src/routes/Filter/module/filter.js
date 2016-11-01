import axios from 'axios'
import _ from 'lodash'
import { Notification } from 'UI'
import { showCatchMessage } from '../public/tool'
import baseState from '../stateConfig'

/**
* Constants
*/
const GET_FILTER_LIST = 'GET_FILTER_LIST'
const ADD_FILTER_LIST = 'ADD_FILTER_LIST'
const UPDATA_FILTER_LIST = 'UPDATA_FILTER_LIST'
const DELETE_FILTER_LIST = 'DELETE_FILTER_LIST'

const GET_FIELDTYPE = 'GET_FIELDTYPE'
const GET_FIELDALl = 'GET_FIELDALl'


/**
* axios 的基本配置
*/
let baseURL = 'http://api.dev.dmayun.com/rest/v1/'
axios.defaults.headers = {token: '4c3e8605fb1f404986d2b4a1c67805f5'}

/**
* 过滤器列表
* @param {array}  lists 字段的列表
* @oaram {number} total 总的过滤器数
*/
export const listData = ({lists = [], total = 0}) => ({
  type: GET_FILTER_LIST,
  payload: {
    lists,
    total
  }
})

/**
* 字段列表类别
* @param {array} fieldType 字段的列表
*/
export const fieldType = (fieldType = []) => ({
  type: GET_FIELDTYPE,
  payload: fieldType
})

/**
* 获取全部字段
* @param {object} fieldAll 字段列表数据  {lists | total}
*/
export const fieldAll = (fieldAll = {}) => ({
  type: GET_FIELDALl,
  payload: fieldAll
})

/**
* 删除过滤器
* @param {object}  _this   react对象
* @param {array}  idArr   选中的id组
*/
export function deleteFilter(_this, idArr = [], callBackFn) {
  return (dispatch, getState) => {
    if (_.isEmpty(idArr)) return false;
    return axios({
      url: baseURL + 'filters/' + idArr.join(','),
      method: 'delete'
    })
    .then(res => {
      let { filter } = getState()
      let {
        showDelModal,
        chooseId,
        currentId
      }  = _.cloneDeep(baseState)
      //  对原先的数据进行过滤
      let newData =  _.filter(filter.listTotal.lists, (n) => {
        return idArr.indexOf(n.flt_id) < 0
      })

      //  重置数据
      //callBackFn && callBackFn()

      //  成功的回调  | 重置 state 对应参数
      _this.setState({showDelModal, chooseId, currentId, filterAjaxState: false}, function() {
        /**
        * 如果删除完单页，数据为0的时候
        * 重置全选按钮
        */
        if (newData.length == 0) _this.setState({TotalCheckStatus: false})
      })
      Notification.init({iconType: 'check-circle', content: '删除完毕'})

      //  传给 redux 对象
      return dispatch(listData({ lists: newData, total: Number(filter.listTotal.total) -  idArr.length}))
    })
    .catch(e => showCatchMessage(e))
  }
}

/**
* 添加过滤器
*  @param {object}  _this   react对象
* @param {object} options  给 api 的数据 {data | name}
*/
export function addFilter(_this, options = {}, callBackFn) {
  let {data, name} = options
  return (dispatch, getState) => {
    return axios({
      url: baseURL + 'filters',
      method: 'post',
      data: JSON.stringify({
        data,
        name
      })
    })
    .then(res => {
      let { filter } = getState()

      let {
        showActionModal,
        currentFilterName,
        currentFilterCom
      }  = _.cloneDeep(baseState)

      //  重置 state 参数
      _this.setState({
        showActionModal,
        currentFilterName,
        currentFilterCom,
        filterAjaxState: false,
        TotalCheckStatus: false
      })

      //  重置数据
      filter.listTotal.lists.unshift(res.data.data)
      //callBackFn && callBackFn()

      //  提示 和 对数据修改
      Notification.init({iconType: 'check-circle', content: '添加完毕'})

      //  传给 redux 对象
      return dispatch(listData({ lists: filter.listTotal.lists, total: Number(filter.listTotal.total) + 1}))
    })
    .catch(e => showCatchMessage(e))
  }
}

/**
* 更新过滤器
* @param {object}   _this     react组件 对象
* @param {object}   options   给 api 的数据 {data | name | id}
*/
export function updateFilter(_this, options = {}) {
  let {data, id, name} = options

  return (dispatch, getState) => {
    return axios({
      url: baseURL + 'filters/' + id,
      data: JSON.stringify({
        data,
        name
      }),
      method: 'put'
    })
    .then(res => {
      let { filter } = getState()

      let {
        currentId,
        showActionModal,
        currentFilterName,
        currentFilterCom
      }  = _.cloneDeep(baseState)

      //  重置 state 参数
      _this.setState({
        showActionModal,
        currentFilterName,
        currentId,
        currentFilterCom,
        filterAjaxState: false
      })

      //  提示
      Notification.init({iconType: 'check-circle', content: '编辑成功'})

      // 对相应数据进行更新
      let lists = filter.listTotal.lists
      let findData = _.findIndex(lists, {flt_id: id})
      lists[findData] = res.data.data

      //  传给 redux 对象
      return dispatch(listData({ lists: lists, total: Number(filter.listTotal.total)}))
    })
    .catch(e => showCatchMessage(e))
  }
}

/**
* 获取过滤器列表
*/
export function getFilter(options, fn) {
  let urlArg = []
  _.each(options, (key, val) => {
    urlArg.push(val + '=' + key)
  })

  return (dispatch, getState) => {
    return axios({
      url: baseURL + 'filters?' + urlArg.join('&'),
    })
    .then(res => {
      fn && fn()
      return dispatch(listData(res.data.data))
    })
    .catch(e => showCatchMessage(e))
  }
}

/**
* 获取字段参数
*/
export function getFieldsType() {
  return (dispatch, getState) => {
    return axios({
      url: baseURL + 'fields/type'
    })
    .then(res => {
      return dispatch(fieldType(res.data.data))
    })
    .catch(e => showCatchMessage(e))
  }
}

/**
* 获取全部字段
**/
export function getAllField() {
  return (dispatch, getState) => {
    return axios({
      url: baseURL + 'fields?page=1&page_size=99999999&keyword=&order_by='
    })
    .then(res => dispatch(fieldAll(res.data.data)))
    .catch(e => showCatchMessage(e))
  }
}

export const actions = {
  listData,
  getFilter,
  deleteFilter,
  getFieldsType,
  getAllField,
  addFilter,
  updateFilter
}

/**
* action 回调
*/
const ACTION_HANDLERS = {
  [GET_FILTER_LIST]: (state, action) => {
    return ({...state, fetching: true, listTotal: action.payload})
  },

  [DELETE_FILTER_LIST]: (state, action) => {
    return ({...state, fetching: true, listTotal: action.payload})
  },

  [GET_FIELDTYPE]: (state, action) => {
    return ({...state, fetching: true, fieldType: action.payload})
  },

  [GET_FIELDALl]: (state, action) => {
    return ({...state, fetching: true, fieldAll: action.payload})
  }
}

/**
* reducer
*/

const initialState = {
  fetching: false,
  listTotal: {},
  fieldType: {},
  fieldAll: {}
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
