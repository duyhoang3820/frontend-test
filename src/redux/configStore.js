import { applyMiddleware, combineReducers, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import ToDoListReducer from './reducer/ToDoListReducer'

const rootReducer = combineReducers({
    ToDoListReducer,
  

})

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default store;