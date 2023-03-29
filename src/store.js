import { createStore,applyMiddleware, combineReducers } from 'redux'
import thunk from "redux-thunk"
import logger from 'redux-logger'
import homePageReducer from './Reducers/homePageReducer'
import filteredReducer from './Reducers/filteredReducer'
import cartReducer from './Reducers/cartReducer'
import cartQuantityReducer from './Reducers/cartQuantityReducer'
import wishlistQuantityReducer from './Reducers/wishlistQuantityReducer'


const rootReducer=combineReducers({ 
    homePageReducer:homePageReducer,
    filteredReducer:filteredReducer,
    cartReducer:cartReducer,
    cartQuantityReducer:cartQuantityReducer,
    wishlistQuantityReducer:wishlistQuantityReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk))
store.subscribe(()=>console.log("store ",store.getState()))

export default store 

 