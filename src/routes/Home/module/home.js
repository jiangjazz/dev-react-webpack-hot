import {
  error_notification
} from 'Public'

/**
* Constants
*/
const HOME_LIST_GET = 'HOME_LIST_GET'
const HOME_LIST_ADD = 'HOME_LIST_ADD'
const HOME_LIST_DEL = 'HOME_LIST_DEL'
const HOME_LIST_LOADING = 'HOME_LIST_LOADING'

const HOME_FIELDS_GET = 'HOME_FIELDS_GET'

const HOME_COPYTOLIST_GET = 'HOME_COPYTOLIST_GET'

const baseURL = 'http://api.dev.dmayun.com/rest/v1/'

// 加载状态
const dataLoading = ( status ) => {
  return {
    type: HOME_LIST_LOADING,
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
    type: HOME_FIELDS_GET,
    payload: {
      keywordArr: lists
    }
  }
}

// 获取 表单数据处理
const handleListData = (data) => {
  const {
    lists = [],
    total = 0
  } = data
  return {
    type: HOME_LIST_GET,
    payload:{
      lists: lists,
      total: total
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
    type: HOME_LIST_ADD,
    payload:{
      lists: lists,
      total: total
    }
  }
}

// 删除 表单数据处理
const handleDelList = (uidArr) => {
  return {
    type: HOME_LIST_DEL,
    payload:{
      delLists: uidArr
    }
  }
}


// 获取 复制下拉数据
const handleCopyToListData = (data) => {
  const {
    lists = []
  } = data
  return {
    type: HOME_COPYTOLIST_GET,
    payload:{
      copyToList: lists
    }
  }
}

// 获取数据
export const getList = ( config ) => {
  const {
    keyword = '',
    order_by,
    order_sort = 'desc',
    page = 1,
    page_size,
    isAdd = false
  } = config

  return (dispatch) => {
    dispatch( dataLoading(true) )

    return $.get(
        baseURL + 'lists', {
        keyword,
        order_by,
        order_sort,
        page,
        page_size
    })
    .then( (res) => {
      dispatch( dataLoading(false) )

      if ( res.success ) {
        if ( isAdd ) {
          dispatch(handleAddListData(res.data))
        } else {
          dispatch(handleListData(res.data))
        }
      }

    })
    .catch( (res) => {
      console.log('%c获取list数据出错','background:red;')
      dispatch( dataLoading(false) )

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
    is_user = false,
    list_ids
  } = config

  return ( dispatch ) => {
    dispatch( dataLoading(true) )

    // return dispatch(handleDelList(list_ids))
    return $.ajax({
      url: baseURL + 'lists',
      type: 'delete',
      dataType: 'json',
      data: JSON.stringify({
        is_user,
        list_ids
      })
    }).then( (res) => {
      // 加载图标
      dispatch( dataLoading(false) )

      if (res.success) {
        dispatch(handleDelList(list_ids))
        successFn()
      } else {
       // 前往报错
       error_notification(res)
     }
    })
    .catch( (res) => {
      console.log('%c删除list数据出错', 'background:red;')
      // 加载图标
      dispatch( dataLoading(false) )

      if (res.responseJSON) {
        // 前往报错
        error_notification(res.responseJSON)
      }
    })
  }
}

// 获取字段信息
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
      if (res.success) {
        dispatch( handleFields(res.data) )
      }
    })
    .catch( (res) => {
      console.log('%c获取字段出错','background:red;')
      console.log(res)
    })
  }
}

// 同步 导出联系人
export const exportContact = (config, syncSuccessFn) => {
  return (dispatch) => {
    return $.ajax({
      url: baseURL + 'lists/export',
      type: 'post',
      data: JSON.stringify(config)
    })
    .then( (res) => {
      console.log(res)
      if (res.success) {
        syncSuccessFn(res.data)
      }
    })
    .catch( (res) => {
      console.log('%c导出联系人组 出错','background:red;')
      if (res.responseJSON) {
        // 前往报错
        error_notification(res.responseJSON)
      }
    })
  }
}

// 导出联系人 预处理
export const exportContactPrev = (config, syncFn, syncSuccessFn, asyncFn) => {
  const {
    csv_head,
    list_ids
  } = config
  return (dispatch) => {
    return $.ajax({
      url: baseURL + 'lists/checkexport',
      type: 'post',
      data: JSON.stringify({
        csv_head,
        list_ids
      })
    })
    .then( (res) => {
      console.log(res)
      if (res.success) {
        if ( res.data.is_synchro ) {
          syncFn()
          dispatch( exportContact(config, syncSuccessFn) )
        } else {
          asyncFn()
        }
      }

    })
    .catch( (res) => {
      console.log('%c导出联系人预处理 出错','background:red;')
      if (res.responseJSON) {
        // 前往报错
        error_notification(res.responseJSON)
      }
    })
  }
}

// 获取 复制下拉数据
export const getCopyToList = ( config ) => {
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
        baseURL + 'lists', {
        keyword,
        order_by,
        order_sort,
        page,
        page_size
    })
    .then( (res) => {
      dispatch( dataLoading(false) )

      if (res.success) {
        dispatch(handleCopyToListData(res.data))
      }
    })
    .catch( (res) => {
      console.log('%c获取 复制下拉数据 出错','background:red;')
      dispatch( dataLoading(false) )

      if (res.responseJSON) {
        // 前往报错
        error_notification(res.responseJSON)
      }
    })
  }
}

// 复制 复制到联系人
export const copyToContact = (config, successFn = () => {}) => {
  const {
    list_ids,
    type,
    type_data
  } = config
  return (dispatch) => {
    dispatch( dataLoading(true) )
    return  $.ajax({
      url: baseURL + 'lists/copy',
      type: 'put',
      dataType: 'json',
      data: JSON.stringify({
        list_ids,
        type,
        type_data
      })
    })
    .then( (res) => {
      dispatch( dataLoading(false) )

      if ( res.success ) {
        successFn()
      }
    })
    .catch( (res) => {
      console.log('%c复制到联系人出错','background:red;')
      dispatch( dataLoading(false) )

      if (res.responseJSON) {
        // 前往报错
        error_notification(res.responseJSON)
      }
    })
  }
}

// 添加 导入联系人
export const addContact = (config, successFn = () => {}) => {
  const {
    csv_head,
    list_id,
    type = 1,
    type_data
  } = config

  return (dispatch) => {
    return $.post(
      baseURL + 'lists/'+ list_id +'/contacts',
      {
        csv_head,
        list_id,
        type,
        type_data
      }
    )
    .then( (res) => {
      dispatch( dataLoading(false) )
      if ( res.success ) {
        successFn()
      }
    })
    .catch( (res) => {
      console.log('%c添加联系人','background:red;')
      dispatch( dataLoading(false) )

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
  // 获取字段信息
  getFields,
  // 导出联系人
  exportContactPrev,
  // 获取 复制下拉数据
  getCopyToList,
  // 复制 复制到联系人
  copyToContact,
  //添加 导入联系人
  addContact
}
/**
* action 回调
*/
const ACTION_HANDLERS = {
  // 删除 数据
  [HOME_LIST_DEL]: (state, action) => {
    let listData = []
    const {
      delLists
    } = action.payload
    listData = state.listData.filter( (item) => {
      return !delLists.some( (filter) => item.id == filter )
    } )

    let total = state.total - delLists.length
    return ({
      ...state,
      listData: listData,
      total: total,
      totalPage: Math.ceil(parseInt(total)/20)
    })
  },
  // 获取 数据
  [HOME_LIST_GET]: (state, action) => {
    return ({
      ...state,
      listData: action.payload.lists,
      total: action.payload.total,
      totalPage: Math.ceil(parseInt(action.payload.total)/20)
    })
  },
  // 获取——增加 数据
  [HOME_LIST_ADD]: (state, action) => {
    let listData = state.listData.concat(action.payload.lists)
    return ({
      ...state,
      listData: listData,
      total: action.payload.total,
      totalPage: Math.ceil(parseInt(action.payload.total)/20)
    })
  },
  // loading状态
  [HOME_LIST_LOADING]: (state, action) => {
    return ({
      ...state,
      loading: action.payload.loading
    })
  },
  // 获取 字段数据
  [HOME_FIELDS_GET]: (state, action) => {
    return ({
      ...state,
      fieldsArr: action.payload.keywordArr
    })
  },
  // 获取 复制下拉数据
  [HOME_COPYTOLIST_GET]: (state, action) => {
    return ({
      ...state,
      copyToList: action.payload.copyToList
    })
  },
}

/**
* reducer
*/
const initialState = {
  loading: false,
  listData: [],
  total: 0,
  // 总页数
  totalPage: 0,
  // 单页数
  // pageSize: 20,

  // 字段列表
  fieldsArr: [],
  // 导出联系人 是否完毕
  exportLoaded: false,
  copyToList: []
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
