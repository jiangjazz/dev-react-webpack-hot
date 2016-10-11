// 一级nav 设置当前tab
export const SETACTIVETAB = 'SETACTIVETAB'

export function setActiveTab ( activeTab = 'group' ) {
  console.log('%c setActiveTab', 'background: red;', activeTab)
  return {
    type: SETACTIVETAB,
    payload: {
      status: '设置当前tab',
      tab: activeTab
    }
  }
}

export const actions = {
  setActiveTab
}

const ACTION_HANDLERS = {
  [SETACTIVETAB]: (state, action) => {
    console.log(action)
    return ({
      ...state,
      activeTab: action.payload.tab
    })
  }
}

const initialState = {
  activeTab: 'group'
}

export default function layoutReducer( state=initialState, action ) {
  const handler = ACTION_HANDLERS[ action.type ]
  return handler? handler(state, action): state
}
