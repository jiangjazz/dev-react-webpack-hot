import {
  error_notification
} from 'Public'

/**
* Constants
*/

const DATA_LOADING = 'DATA_LOADING'
const DETAILS_SET_DATA = 'DETAILS_SET_DATA'
const DETAILS_MOVETOLIST_GET = 'DETAILS_MOVETOLIST_GET'
const DETAILS_FIELDS_GET = 'DETAILS_FIELDS_GET'

const baseURL = 'http://api.dev.dmayun.com/rest/v1/'

// 加载状态
const dataLoading = ( status ) => {
  return {
    type: DATA_LOADING,
    payload: {
      loading: status
    }
  }
}
// 数据处理
const handleData = (data) => {
  return {
    type: DETAILS_SET_DATA,
    payload: {
      data
    }
  }
}

// 获取 复制下拉数据
const handleMoveToListData = (data) => {
  const {
    lists = []
  } = data
  return {
    type: DETAILS_MOVETOLIST_GET,
    payload:{
      copyToList: lists
    }
  }
}

// 获取 字段数据处理
const handleFields = (data) => {
  console.log(data)
  const {
    lists = []
  } = data
  return {
    type: DETAILS_FIELDS_GET,
    payload: {
      keywordArr: lists
    }
  }
}

// 获取 个人数据
export const getContactDetails = (config,
  errorFN = () => {}
) => {
  const {
    list_id,
    user_id
  } = config

  return (dispatch) => {
    dispatch( dataLoading(true) )

    return $.get(
      baseURL + 'lists/'+ list_id +'/contacts/' + user_id,
      {
        list_id,
        user_id
    } )
    .then( (res) => {
      dispatch( dataLoading(false) )

      if ( res.success ) {
        dispatch( handleData(res.data) )
      }
    })
    .catch( (res) => {
      dispatch( dataLoading(false) )

      if (res.responseJSON) {
        errorFN()
        // 前往报错
        error_notification(res.responseJSON)
      }
      console.log('%c获取 联系人详情 数据出错','background:red;')
      console.log(res)
    })
  }
}

// 保存 跟人数据
export const putContactDetails = (config) => {
  const {
    list_id,
    user_id
  } = config
  return (dispatch) => {
    dispatch( dataLoading(true) )

    return $.ajax({
      url: baseURL + 'lists/'+ list_id +'/contacts/'+ user_id,
      type: 'put',
      dataType: 'json',
      data: JSON.stringify(config)
    })
    .then( (res) => {
      dispatch( dataLoading(false) )

      if ( res.success ) {
        console.log('成功')
      }
    })
    .catch( (res) => {
      console.log('%c保存 联系人详情 数据出错','background:red;')
      dispatch( dataLoading(false) )

      if (res.responseJSON) {
        // 前往报错
        error_notification(res.responseJSON)
      }
    })
  }
}

// 删除 个人数据
export const delList = ( config , successFn = () => {} ) => {
  let {
    status = 1,
    list_id,
    user_ids
  } = config

  return ( dispatch ) => {
    dispatch( dataLoading(true) )

    // return dispatch(handleDelList(list_ids))
    return $.ajax({
      url: baseURL + 'lists/'+ list_id +'/contacts',
      type: 'delete',
      dataType: 'json',
      data: JSON.stringify({
        status,
        list_id,
        user_ids
      })
    }).then( (res) => {
      // 加载图标
      dispatch( dataLoading(false) )

      if ( res.success ) {
        successFn(res)
      }
    })
    .catch( (res) => {
      // 加载图标
      dispatch( dataLoading(false) )
      console.log('%c删除list数据出错', 'background:red;')

      if (res.responseJSON) {
        // 前往报错
        error_notification(res.responseJSON)
      }
    })
  }
}

// 获取 复制下拉数据
export const getMoveToList = ( config ) => {
  const {
    keyword = '',
    order_by,
    order_sort = 'desc',
    page = 1,
    page_size
  } = config

  return (dispatch) => {
    dispatch( dataLoading(true) )

    return $.get(
      baseURL + 'lists',
      {
        keyword,
        order_by,
        order_sort,
        page,
        page_size
    })
    .then( (res) => {
      dispatch( dataLoading(false) )

      if ( res.success ) {
        dispatch(handleMoveToListData(res.data))
      }
    })
    .catch( (res) => {
      dispatch( dataLoading(false) )
      console.log('%c获取 下拉数据 出错','background:red;')

      if (res.responseJSON) {
        // 前往报错
        error_notification(res.responseJSON)
      }
    })
  }
}

// 复制/移动 到联系人组
export const copyToContact = (config, successFn) => {
  const {
    delete_source=false,
    list_id,
    type,
    type_data,
    user_ids
  } = config
  return (dispatch) => {
    dispatch( dataLoading(true) )

    return  $.ajax({
      url: baseURL + 'lists/'+ list_id +'/contacts/merge',
      type: 'put',
      dataType: 'json',
      data: JSON.stringify({
        delete_source,
        list_id,
        type,
        type_data,
        user_ids
      })
    })
    .then( (res) => {
      dispatch( dataLoading(false) )

      if ( res.success ) {
        successFn()
      }
    })
    .catch( (res) => {
      dispatch( dataLoading(false) )
      console.log('%c复制/移动联系人出错','background:red;')

      if (res.responseJSON) {
        // 前往报错
        error_notification(res.responseJSON)
      }
    })
  }
}

// 获取 字段信息
export const getFields = (config) => {
  const {
    keyword = '',
    page_size = 9999999
  } = config

  return ( dispatch ) => {
    return $.get(
      baseURL + 'fields',
      {
        keyword,
        page_size
    })
    .then( (res) => {

      if( res.success ) {
        dispatch( handleFields(res.data) )
      }
    })
    .catch( (res) => {
      console.log('%c获取字段出错','background:red;')

      if (res.responseJSON) {
        // 前往报错
        error_notification(res.responseJSON)
      }
    })
  }
}

// 导出 联系人
export const exportContact = (config,
  beforeSend = () => {},
  successFn = () => {},
  errorFn = () => {}
) => {
  const {
    csv_head,
    list_id,
    user_ids
  } = config

  return (dispatch) => {

    return $.ajax({
      url: baseURL + 'lists/'+ list_id +'/contacts/export',
      type: 'post',
      data: JSON.stringify({
        csv_head,
        list_id,
        user_ids
      }),
      beforeSend
    })
    .then( (res) => {
      console.log(res)
      if( res.success ) {
        successFn(res.data)
      }
    })
    .catch( (res) => {
      console.log('%c导出联系人组 出错','background:red;')
      
      if (res.responseJSON) {
        errorFn()
        // 前往报错
        error_notification(res.responseJSON)
      }
    })
  }
}


/**
* action 操作
*/
export const actions = {
  // 获取 个人数据
  getContactDetails,
  // 保存 个人数据
  putContactDetails,
  // 删除 个人数据
  delList,
  // 获取 复制下拉数据
  getMoveToList,
  // 复制/移动 到联系人组
  copyToContact,
  // 获取 字段信息
  getFields,
  // 导出联系人
  exportContact,
}
/**
* action 回调
*/
const ACTION_HANDLERS = {
  // loading状态
  [DATA_LOADING]: (state, action) => {
    return ({
      ...state,
      loading: action.payload.loading
    })
  },
  // 数据处理
  [DETAILS_SET_DATA]: (state, action) => {
    return ({
      ...state,
      _data: action.payload.data
    })
  },
  // 获取 复制下拉数据
  [DETAILS_MOVETOLIST_GET]: (state, action) => {
    return ({
      ...state,
      copyToList: action.payload.copyToList
    })
  },
  // 获取 字段数据
  [DETAILS_FIELDS_GET]: (state, action) => {
    return ({
      ...state,
      fieldsArr: action.payload.keywordArr
    })
  },
}

/**
* reducer
*/
const initialState = {
  loading: false,
  _data: '',
  copyToList: [],
  fieldsArr: []
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
