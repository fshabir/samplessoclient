import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import {connect} from 'react-redux';
import {addFlashMessage} from '../../actions/flashMessages.js';
import {getUserInfo, updateUserInfo} from '../../actions/userActions.js';
import isEmpty from 'lodash/isEmpty';

class SettingsForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirmation: '',
            etag: '',
            errors: [],
            isSubmitting: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        if(this.props.email !== undefined && !isEmpty(this.props.email)) {
            this.props.getUserInfo(this.props.email).then(
                (response) => {
                    const userObject = JSON.parse(response.request.response);
                    console.log(userObject);
                    this.setState({etag: response.headers.etag, username: userObject.name});
                }
            );
        }
    }

    isValid(){
        if(isEmpty(this.state.username) && isEmpty(this.state.password) && isEmpty(this.state.passwordConfirmation)){
            this.props.addFlashMessage({
                type: 'error',
                text: 'Please provide your full name and/or new password'
            });
            return false;
        } else if (!isEmpty(this.state.password) && this.state.password !== this.state.passwordConfirmation){
            this.props.addFlashMessage({
                type: 'error',
                text: 'The passwords mismatch'
            });
            return false;
        }
        return true;
    }

    onSubmit(e){
        e.preventDefault();
        if(this.isValid()){
            //this.setState({errors: [], isSubmitting: true});
            this.props.updateUserInfo({
                username: this.state.username,
                password: this.state.password,
                email: this.props.email
            }, this.state.etag).then(
                (response) => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Your settings have been saved successfully!!!'
                    });
                },
                (error) => {
                    this.props.addFlashMessage({
                        type: 'error',
                        text: 'A problem occurred while saving settings!!!'
                    });
                }
            );
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        const { errors, username, password, passwordConfirmation, isSubmitting } = this.state;
        return(
            <form onSubmit={this.onSubmit}>

                <h1>Account Settings</h1>

                <TextFieldGroup
                    field="username"
                    label="Your full name"
                    value={username}
                    onChange={this.onChange}
                    />

                <TextFieldGroup
                    field="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={this.onChange}
                    />

                <TextFieldGroup
                    field="passwordConfirmation"
                    label="Repeat Password"
                    type="password"
                    value={passwordConfirmation}
                    onChange={this.onChange}
                    />

                <div className="form-group">
                    <button className="btn btn-primary btn-lg" disabled={isSubmitting}>Save Settings</button>
                </div>

            </form>
        );
    }
}

SettingsForm.propTypes = {
    getUserInfo: React.PropTypes.func.isRequired,
    updateUserInfo: React.PropTypes.func.isRequired
};

function mapStateToProps(state){
    return{
        email: state.auth.user.email
    }
}



export default connect(mapStateToProps, {getUserInfo, updateUserInfo, addFlashMessage})(SettingsForm);
