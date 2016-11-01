import {
  error_notification
} from 'Public'

/**
* Constants
*/
const CONTACT_FIELDS_GET = 'CONTACT_FIELDS_GET'
const CONTACT_LOADING = 'CONTACT_LOADING'

const baseURL = 'http://api.dev.dmayun.com/rest/v1/'

// 加载状态
const dataLoading = ( status ) => {
  return {
    type: CONTACT_LOADING,
    payload: {
      loading: status
    }
  }
}

// 获取 字段数据处理
const handleFields = (data) => {
  const {
    lists = []
  } = data
  return {
    type: CONTACT_FIELDS_GET,
    payload: {
      keywordArr: lists
    }
  }
}

// 获取字段信息
export const getFields = (config,
  successFN = () => {}
) => {
  const {
    keyword = '',
    page_size = 9999999
  } = config

  return ( dispatch ) => {
    dispatch( dataLoading(true) )

    return $.get(
      baseURL + 'fields',
      {
        keyword,
        page_size
    })
    .then( (res) => {
      dispatch( dataLoading(false) )

      if (res.success) {
        dispatch( handleFields(res.data) )
        successFN()
      }
    })
    .catch( (res) => {
      dispatch( dataLoading(false) )
      console.log('%c获取字段出错','background:red;')

      if (res.responseJSON) {
        // 前往报错
        error_notification(res.responseJSON)
      }
    })
  }
}

// 添加联系人组
export const addToGroup = (config, successFN = () => {}, errorFN) => {
  const {
    character_set,
    csv_head,
    name,
    status,
    type,
    type_data
  } = config

  return (dispatch) => {
    dispatch( dataLoading(true) )

    return $.ajax({
      url: baseURL + 'lists',
      type: 'post',
      dataType: 'json',
      data: JSON.stringify({
          character_set,
          csv_head,
          name,
          status,
          type,
          type_data
      })
    })
    .then( (res) => {
      console.log('添加联系人组成功')
      dispatch( dataLoading(false) )

      if ( res.success ) {
        successFN(res)
      }
    })
    .catch( (res) => {
      dispatch( dataLoading(false) )
      console.log('%c添加联系人组出错','background:red;')

      if (res.responseJSON) {
        // 前往报错
        error_notification(res.responseJSON)
      }
    })
  }
}

// 添加联系人
export const addToSingle = (config, successFN = () => {}, errorFN) => {
  const {
    character_set,
    csv_head,
    list_id,
    status,
    type,
    type_data
  } = config

  return (dispatch) => {
    dispatch( dataLoading(true) )

    return $.ajax({
      url: baseURL + 'lists/' + list_id + '/contacts',
      type: 'post',
      dataType: 'json',
      data: JSON.stringify({
          character_set,
          csv_head,
          list_id,
          status,
          type,
          type_data
      })
    })
    .then( (res) => {
      console.log('添加联系人成功')
      dispatch( dataLoading(false) )

      if ( res.success ) {
        successFN(res)
      }
    })
    .catch( (res) => {
      dispatch( dataLoading(false) )
      console.log('%c添加联系人出错','background:red;')

      if (res.responseJSON) {
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
  // 获取字段信息
  getFields,
  // 添加联系人组
  addToGroup,
  // 添加联系人
  addToSingle
}
/**
* action 回调
*/
const ACTION_HANDLERS = {
  // loading状态
  [CONTACT_LOADING]: (state, action) => {
    return ({
      ...state,
      loading: action.payload.loading
    })
  },
  // 获取 字段数据
  [CONTACT_FIELDS_GET]: (state, action) => {
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
  fieldsArr: []
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
