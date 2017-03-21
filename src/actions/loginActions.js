import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import {SET_CURRENT_USER} from '../actions/types';
import jwtDecode from 'jwt-decode';

export function setCurrentUser(user){
    return{
        type: SET_CURRENT_USER,
        user
    }
}

export function login(data){
    return dispatch => {
        localStorage.setItem('email', data.emailAddress);
        return axios.post('http://quixelsso-staging.us-west-2.elasticbeanstalk.com/api/v1/login', {
            email: data.emailAddress,
            password: data.password,
            realm: "all"
        }).then(
            res => {
                const token = res.data.token;
                const refreshToken = res.data.refreshToken;

                localStorage.setItem('jwtToken', token);
                localStorage.setItem('jwtRefreshToken', refreshToken);
                setAuthorizationToken(token);
                dispatch(setCurrentUser(jwtDecode(token)));
            }
        );
    }
}

export function logout(){
    return dispatch => {
        return axios.post('http://quixelsso-staging.us-west-2.elasticbeanstalk.com/api/v1/logout').then(
            (response) => {
                console.log("Logged out successfully");
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('jwtRefreshToken');
                setAuthorizationToken(false);
                dispatch(setCurrentUser({}));
            },
            (error) => {console.log(error);}
        );

    }
}
