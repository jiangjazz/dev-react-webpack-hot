import axios from 'axios'
import _ from 'lodash'
import { Notification } from 'UI'
import { showCatchMessage } from '../../Filter/public/tool'
import baseState from '../stateConfig'

/**
* Constants
*/

const GET_FIELDS_LIST = 'GET_FIELDS_LIST'

/**
* axios 的基本配置
*/
let baseURL = 'http://api.dev.dmayun.com/rest/v1/'
axios.defaults.headers = {token: '4c3e8605fb1f404986d2b4a1c67805f5'}

/**
* 字段列表
* @param {array}  lists 字段的列表
* @oaram {number} total 总的过滤器数
*/
export const listData = ({lists = [], total = 0}) => ({
  type: GET_FIELDS_LIST,
  payload: {
    lists,
    total
  }
})

/**
* 获取字段列表
*/
export function getFields(options, fn) {
  let urlArg = []
  _.each(options, (key, val) => {
    urlArg.push(val + '=' + key)
  })

  return (dispatch, getState) => {
    return axios({
      url: baseURL + 'fields?' + urlArg.join('&'),
    })
    .then(res => {
      fn && fn();
      return dispatch(listData(res.data.data))
    })
    .catch(e => showCatchMessage(e))
  }
}

/**
* 增加字段
*/
export function addField(setState, options, callBackFn) {

  return (dispatch, getState) => {
    return axios({
      url: baseURL + 'fields',
      method: 'post',
      data: JSON.stringify({
        name: options.filedName,
        desc: options.filedDec,
        type: options.filedType,
        unique: options.is_unique,
      })
    })
    .then(res => {
      let { fields } = getState()

      //  提示 和 对数据修改
      Notification.init({iconType: 'check-circle', content: '添加完毕'})
      fields.listTotal.lists.unshift(res.data.data)
      setState({
        showActionModal: false,
        TotalCheckStatus: false,
        addFieldConfig: _.clone(baseState.addFieldConfig)
      })
      //callBackFn && callBackFn()
      // 更新 redux 上的数据
      return dispatch(listData({ lists: fields.listTotal.lists, total: Number(fields.listTotal.total) + 1}))
    })
    .catch(e => showCatchMessage(e))
    .then(res => {
        setState({
          FiledAjaxState: false
        })
    })
  }
}

/**
* 更新字段
*/
export function updateField(setState, options = {}) {
  let { desc, status, unique, id} = options

  return (dispatch, getState) => {
    return axios({
      url: baseURL + 'fields/'　+ id,
      method: 'put',
      data: JSON.stringify({
        desc,
        status,
        unique
      })
    })
    .then(res => {
       let { fields } = getState()

       //  关闭模态框
       setState({
         showActionModal: false,
         FiledAjaxState: false
       })

       // 修改原数组数据
       let dataIndex = _.findIndex(fields.listTotal.lists, {fld_id: id})
       fields.listTotal.lists[dataIndex] = res.data.data

       // 提示 和 关闭 modal
       Notification.init({iconType: 'check-circle', content: '编辑完毕'})

       // 更新 redux 上的数据
       return dispatch(listData({ lists: fields.listTotal.lists, total: Number(fields.listTotal.total)}))
  })
  .catch(e => showCatchMessage(e))
  }
}

/**
* 删除字段
*/
export function delField(_this, idArr=[], callBackFn) {

  return (dispatch, getState) => {
    return axios({
      url: baseURL + 'fields/' + idArr.join(','),
      method: 'delete'
    })
    .then(res => {
      let { fields } = getState()
      //  对原先的数据进行过滤
      let newData =  _.filter(fields.listTotal.lists, (n) => {
        return idArr.indexOf(n.fld_id) < 0
      })
      //callBackFn && callBackFn()
      //  成功的回调  | 重置 state 对应参数
      Notification.init({iconType: 'check-circle', content: '删除完毕'})

      /**
      * 删除成功后
      */
      newData.length === 0? _this.setState({TotalCheckStatus: false}) : null;
      //  传给 redux 对象
      return dispatch(listData({ lists: newData, total: Number(fields.listTotal.total) -  idArr.length}))
    })
    .catch(e => showCatchMessage(e))
    .then(res => {

      let { showDelAlertModal, chooseId, currentId} = _.cloneDeep(baseState)
      //  关闭模态框 重置id
      _this.setState({showDelAlertModal,chooseId,currentId, FiledAjaxState: false})
    })
  }
}

export const actions = {
  listData,
  getFields,
  addField,
  delField,
  updateField
}

/**
* action 回调
*/
const ACTION_HANDLERS = {
  [GET_FIELDS_LIST]: (state, action) => {
    return ({...state, fetching: true, listTotal: action.payload})
  }
}

/**
* reducer
*/

const initialState = {
  fetching: false,
  listTotal: {}
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
