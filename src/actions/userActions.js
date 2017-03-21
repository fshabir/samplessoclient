import axios from 'axios';
import {SET_USERNAME} from '../actions/types';

export function setUsername(username){
    return{
        type: SET_USERNAME,
        username
    }
}

export function getUserInfo(email){
    return dispatch => {
        return axios.get('http://quixelsso-staging.us-west-2.elasticbeanstalk.com/api/v1/users/' + email);
    }
}

export function updateUserInfo(user, eTag){
    return dispatch => {
        console.log("..... In start of update user info.....");
        console.log(user);
        console.log(eTag);
        console.log("..... In end of update user info.......");
        const config = {
            headers: {'If-Match' : eTag}
        };

        var data = [{
            'op': "replace",
            'path': "/name",
            'value': user.username
        }];

        if(user.password !== ''){
            data.push({
                'op': "replace",
                'path': "/password",
                'value': user.password
            });
        }

        return axios.patch('http://quixelsso-staging.us-west-2.elasticbeanstalk.com/api/v1/users/' + user.email, data, config);
    }
}
