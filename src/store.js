import { createStore,applyMiddleware, combineReducers } from 'redux'
import thunk from "redux-thunk"
import logger from 'redux-logger'
import homePageReducer from './Reducers/homePageReducer'
import filteredReducer from './Reducers/filteredReducer'


const rootReducer=combineReducers({ 
    homePageReducer:homePageReducer,
    filteredReducer:filteredReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk,logger))
store.subscribe(()=>console.log("store filtered suggestion",store.getState()))

export default store 

 