import { combineReducers } from 'redux'
import locationReducer from './location'
import publicReducer from './public'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    public: publicReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
