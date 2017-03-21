import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import SettingsPage from './components/settings/SettingsPage';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import Home from './components/Home';
import requireAuth from './utils/requireAuth';

export default(
    <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="signup" component={SignupPage} />
        <Route path="login" component={LoginPage}/>
        <Route path="settings" component={requireAuth(SettingsPage)}/>
    </Route>
)