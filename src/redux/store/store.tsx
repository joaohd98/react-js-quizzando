import { createBrowserHistory } from 'history'
import {applyMiddleware, createStore} from 'redux'
import createRootReducer from '../reducers/reducers'
import logger from 'redux-logger'

export const history = createBrowserHistory();

export default function configureStore() {
  return createStore(
    createRootReducer(history),
    applyMiddleware(logger)
  );
}
