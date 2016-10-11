import axios from 'axios'
export const COUNT_INCREMENT = 'COUNT_INCREMENT'
export const COUNT_LIST = 'COUNT_LIST'

export function increment (value = 1) {
  return {
    type: COUNT_INCREMENT,
    payload: {
      count: value
    }
  }
}

function requireList(value = {}) {
  return {
    type: COUNT_LIST,
    payload: {
      data: value
    }
  }
}

export function fetchList() {
  return (dispatch, getState) => {
    return axios.post('http://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312')
    .then(res => dispatch(requireList(res)))
  }
}

export const actions = {
  increment,
  fetchList
}

const ACTION_HANDLERS = {
  [COUNT_INCREMENT]: (state, action) => {
    return ({...state, count: state.count + action.payload.count})
  },
  [COUNT_LIST]: (state, action) => {
    return ({...state, data: action.payload, fetched: true})
  }
}

const initialState = {
  count: 0,
  data: {},
  fetched: false
}

export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler? handler(state, action) : state
}
