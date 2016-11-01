// ------------------------------------
// Constants
// ------------------------------------

import Notification from 'UI'

import Cookies from 'js-cookie'

// // 设置当前浏览的联系人组
export const SET_COOKIE_CSV = 'SET_COOKIE_CSV'
export const GET_COOKIE_CSV = 'GET_COOKIE_CSV'
export const REMOVE_COOKIE_CSV = 'REMOVE_COOKIE_CSV'

export const SET_COOKIE_ADDCONTACTS = 'SET_COOKIE_ADDCONTACTS'
export const GET_COOKIE_ADDCONTACTS = 'GET_COOKIE_ADDCONTACTS'
export const REMOVE_COOKIE_ADDCONTACTS = 'REMOVE_COOKIE_ADDCONTACTS'

export const ERROR_CODE_NOTIFICATION = 'ERROR_CODE_NOTIFICATION'

// ------------------------------------
// Actions
// ------------------------------------

// 设置当前浏览的联系人组
// export function setViewGroupData (data = null) {
//   return {
//     type    : SET_VIEWGROUPDATA,
//     payload : data
//   }
// }

export const Set_LocalCSV = (res, other) => {
  return {
    type: SET_COOKIE_CSV,
    data: {
      res,
      other
    }
  }
}
export const Get_LocalCSV = (successFN) => {
  return {
    type: GET_COOKIE_CSV,
    successFN
  }
}
export const Remove_LocalCSV = (successFN) => {
  return {
    type: REMOVE_COOKIE_CSV
  }
}

// 手动添加联系人系列
export const Set_Local_ADDCONTACTS = (other) => {
  return {
    type: SET_COOKIE_ADDCONTACTS,
    data: {
      other
    }
  }
}
export const Get_Local_ADDCONTACTS = (successFN) => {
  return {
    type: GET_COOKIE_ADDCONTACTS,
    successFN
  }
}
export const Remove_Local_ADDCONTACTS = (successFN) => {
  return {
    type: REMOVE_COOKIE_ADDCONTACTS
  }
}

// 错误码报错,以及对应处理
export const error_notification = (res) => {
  console.log('%c出错了', 'background: red;', res)
}
// 错误码报错,以及对应处理
// export const error_notification = () => {
//   return {
//     type: ERROR_CODE_NOTIFICATION,
//     data: {
//
//     }
//   }
// }

/**
* action 回调
*/
const ACTION_HANDLERS = {
  [SET_COOKIE_CSV]: (state, action) => {
    Cookies.set('_localCSV', action.data.res)
    Cookies.set('_CSVData', action.data.other)
    console.log('设置本地cookie', action.data.res, action.data.other)
    return ({
      ...state
    })
  },
  [GET_COOKIE_CSV]: (state, action) => {
    let res = Cookies.getJSON('_localCSV')
    let _CSVData = Cookies.getJSON('_CSVData')
    console.log('获取本地cookie', res, _CSVData)
    action.successFN(res, _CSVData)
    return ({
      ...state,
      _localCSV: res,
      _CSVData: _CSVData
    })
  },
  [REMOVE_COOKIE_CSV]: (state, action) => {
    Cookies.remove('_localCSV')
    Cookies.remove('_CSVData')
    console.log('删除本地cookie')
    return ({
      ...state
    })
  },
  // 手动添加联系人系列
  [SET_COOKIE_ADDCONTACTS]: (state, action) => {
    Cookies.set('_ADDCONTACTS_Data', action.data.other)
    console.log('设置本地cookie', action.data.other)
    return ({
      ...state
    })
  },
  [GET_COOKIE_ADDCONTACTS]: (state, action) => {
    let _ADDCONTACTS_Data = Cookies.getJSON('_ADDCONTACTS_Data')
    console.log('获取本地cookie', _ADDCONTACTS_Data)
    action.successFN(_ADDCONTACTS_Data)
    return ({
      ...state,
      _ADDCONTACTS_Data: _ADDCONTACTS_Data
    })
  },
  [REMOVE_COOKIE_ADDCONTACTS]: (state, action) => {
    Cookies.remove('_local_ADDCONTACTS')
    Cookies.remove('_ADDCONTACTS_Data')
    console.log('删除本地cookie')
    return ({
      ...state
    })
  },
  // 错误码报错,以及对应处理
  // [ERROR_CODE_NOTIFICATION]: (state, action) => {
  //   return ({
  //     ...state
  //   })
  // }
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  // // 当前查看的联系人组数据
  // contactGroup: null
  _localCSV: undefined,
  // 一些其他需要传输的数据
  _CSVData: undefined,

  _ADDCONTACTS_Data: undefined,
}

export default function publicReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
