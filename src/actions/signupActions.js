import axios from 'axios';

export function userSignupRequest(userData){
    return dispatch => {
        return axios.post('http://quixelsso-staging.us-west-2.elasticbeanstalk.com/api/v1/users', {
            email: userData.emailAddress,
            name: userData.username,
            password: userData.password,
            scope: ['all']
        });
    }
}