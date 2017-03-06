import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { compose, createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';
import DevTools from './containers/DevTools';

export default function configureStore(middlewares = [], initialState = { }) {
  const pipeline = [
    applyMiddleware(
      promiseMiddleware(),
      thunkMiddleware,
      createLogger({
        predicate: () => process.env.NODE_ENV !== 'production'
      }),
      ...middlewares
    )
  ];

  if (process.env.NODE_ENV !== 'production') {
    pipeline.push(DevTools.instrument());
  }

  const finalCreateStore = compose(...pipeline)(createStore);
  const store = finalCreateStore(rootReducer, initialState);

  // Enable Webpack hot module replacement for reducers.
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
