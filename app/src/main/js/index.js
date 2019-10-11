import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { AppContainer } from 'react-hot-loader';
import thunk from 'redux-thunk';
import { createHashHistory as createHistory } from 'history';
import reducers from './reducers/index';
import App from './app';


const history = createHistory();
/*
Here we are getting the initial state injected by the server. See routes/index.js for more details
 */
 const initialState = window.__INITIAL_STATE__; // eslint-disable-line

const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ // eslint-disable-line
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    maxAge: 15,
  })
  : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, routerMiddleware(history)),
  // other store enhancers if any
);
const store = createStore(
  reducers(history),
  initialState, enhancer,
);

/*
While creating a store, we will inject the initial state we received from the server to our app.
 */
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('reactbody'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line
    const nextApp = require('./app').default;
    render(nextApp);
  });
  module.hot.accept('./reducers', () => {
    // eslint-disable-next-line
     const nextRootReducer = require('./reducers/index');
    store.replaceReducer(nextRootReducer);
  });
}
