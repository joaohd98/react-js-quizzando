import { createBrowserHistory } from 'history'
import { createStore } from 'redux'
import createRootReducer from '../reducers/reducers'

export const history = createBrowserHistory();

export default function configureStore() {
  return createStore(
    createRootReducer(history),
  );
}
