export const TESTSSS = 'TEST'

export function test ( msg = 1 ) {
  return {
    type: TESTSSS,
    msg: msg
  }
}

const ACTION_HANDLERS = {
  [TESTSSS]: ( state, action ) => {
    return ( { ...state, msg: action.msg + state.text } )
  }
}

const initialState = {
  text: '测试数据'
}

export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler? handler(state, action) : state
}
