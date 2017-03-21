import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/loginActions';
import jwtDecode from 'jwt-decode';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

if(localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes}/>
    </Provider>  ,document.getElementById('root')
);
