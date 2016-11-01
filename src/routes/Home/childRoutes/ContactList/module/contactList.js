import {
  error_notification
} from 'Public'

/**
* Constants
*/
const CONTACT_LIST_LOADING = 'CONTACT_LIST_LOADING'
const CONTACT_LIST_GET = 'CONTACT_LIST_GET'
const CONTACT_LIST_ADD = 'CONTACT_LIST_ADD'
const CONTACT_LIST_DEL = 'CONTACT_LIST_DEL'
const CONTACT_MOVETOLIST_GET = 'CONTACT_MOVETOLIST_GET'
const CONTACT_FIELDS_GET = 'CONTACT_FIELDS_GET'


const baseURL = 'http://api.dev.dmayun.com/rest/v1/'

// 加载状态
const dataLoading = ( status ) => {
  return {
    type: CONTACT_LIST_LOADING,
    payload: {
      loading: status
    }
  }
}

// 获取 表单数据处理
const handleListData = (data) => {
  const {
    lists = [],
    listName = '',
    total = 0
  } = data
  return {
    type: CONTACT_LIST_GET,
    payload:{
      lists,
      listName,
      total
    }
  }
}

// 获取——添加  表单数据
const handleAddListData = (data) => {
  const {
    lists = [],
    total = 0
  } = data
  return {
    type: CONTACT_LIST_ADD,
    payload:{
      lists: lists,
      total: total
    }
  }
}

// 删除 表单数据处理
const handleDelList = (uidArr) => {
  return {
    type: CONTACT_LIST_DEL,
    payload:{
      delLists: uidArr
    }
  }
}

// 获取 复制下拉数据
const handleMoveToListData = (data) => {
  const {
    lists = []
  } = data
  return {
    type: CONTACT_MOVETOLIST_GET,
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
    type: CONTACT_FIELDS_GET,
    payload: {
      keywordArr: lists
    }
  }
}




// 获取数据
export const getList = ( config ) => {
  const {
    keyword = '',
    list_id,
    page = 1,
    page_size
  } = config

  return (dispatch) => {
    dispatch( dataLoading(true) )

    return $.get(
      baseURL + 'lists/'+ list_id +'/contacts',
      {
        keyword,
        list_id,
        page,
        page_size
    })
    .then( (res) => {
      dispatch( dataLoading(false) )

      if (res.success) {
        dispatch(handleListData(res.data))
      }
    })
    .catch( (res) => {
      dispatch( dataLoading(false) )
      console.log('%c获取 联系人列表 数据出错','background:red;')

      if (res.responseJSON) {
        // 前往报错
        error_notification(res.responseJSON)
      }
    })
  }
}

// 删除数据
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
        dispatch(handleDelList(user_ids))
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
      console.log('%c获取 复制下拉数据 出错','background:red;')

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

      if( res.success ) {
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

// 获取字段信息
export const getFields = (config,
  successFN = () => {}
) => {
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

      if ( res.success ) {
        dispatch( handleFields(res.data) )
        successFN()
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


/**
* action 操作
*/
export const actions = {
  // 获取数据
  getList,
  // 删除数据
  delList,
  // 获取 复制下拉数据
  getMoveToList,
  // 复制/移动 到联系人组
  copyToContact,
  // 导出联系人
  exportContact,
}
/**
* action 回调
*/
const ACTION_HANDLERS = {
  // loading状态
  [CONTACT_LIST_LOADING]: (state, action) => {
    return ({
      ...state,
      loading: action.payload.loading
    })
  },
  // 获取 数据
  [CONTACT_LIST_GET]: (state, action) => {
    return ({
      ...state,
      listData: action.payload.lists,
      listName: action.payload.listName,
      total: action.payload.total,
      totalPage: Math.ceil(parseInt(action.payload.total)/20)
    })
  },
  // 获取——增加 数据
  [CONTACT_LIST_ADD]: (state, action) => {
    let listData = state.listData.concat(action.payload.lists)
    return ({
      ...state,
      listData: listData,
      total: action.payload.total,
      totalPage: Math.ceil(parseInt(action.payload.total)/20)
    })
  },
  // 删除 数据
  [CONTACT_LIST_DEL]: (state, action) => {
    let listData = []
    const {
      delLists
    } = action.payload
    listData = state.listData.filter( (item) => {
      return !delLists.some( (filter) => item.id == filter )
    } )
    return ({
      ...state,
      listData: listData,
      total: state.total - delLists.length
    })
  },
  // 获取 复制下拉数据
  [CONTACT_MOVETOLIST_GET]: (state, action) => {
    return ({
      ...state,
      copyToList: action.payload.copyToList
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
    total: 0,
    // 总页数
    totalPage: 0,
    listData: [],
    listName: '',
    copyToList: [],
    fieldsArr: []
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
