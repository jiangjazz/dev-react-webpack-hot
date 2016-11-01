// ------------------------------------
// Constants
// ------------------------------------
export const LOCATION_CHANGE = 'LOCATION_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange (location = '/') {
  return {
    type    : LOCATION_CHANGE,
    payload : location
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(locationChange(nextLocation))
}

/**
* action 回调
*/
const ACTION_HANDLERS = {
  [LOCATION_CHANGE]: (state, action) => {
    return ({
      ...state,
      ...action.payload
    })
  }
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
}
// export default function locationReducer (state = initialState, action) {
//   return action.type === LOCATION_CHANGE
//     ? {...action.payload, ...initialState}
//     : state
// }

export default function locationReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
