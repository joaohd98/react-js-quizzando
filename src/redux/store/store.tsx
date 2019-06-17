import {applyMiddleware, createStore} from 'redux'
import createRootReducer from '../reducers'
import logger from 'redux-logger'
import browserHistory from "./browserHistory";
import thunk from "redux-thunk";

export default function configureStore() {
  return createStore(
    createRootReducer(browserHistory),
    applyMiddleware(logger, thunk),
  );
}
