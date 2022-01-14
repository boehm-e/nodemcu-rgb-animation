
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import settingsReducer from './reducers/settings-reducer';
import defaultSettings from './defaultSettings';
import Home from './components/Home';
import "./css/index.css"

const run = async () => {



  const allReducers = combineReducers({
    settingsReducer: settingsReducer,
  });

  const allStoreEnhancers = composeWithDevTools(
    applyMiddleware(thunk),
  );



  const store = createStore(
    allReducers,
    {
      settingsReducer: defaultSettings,
    },
    allStoreEnhancers
  );

  // RENDER BOTTOM WIDGET
  ReactDOM.render(
    <Provider store={store}>
      <Home />
    </Provider>
    , document.body);


}



run();
