import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import {connect} from 'react-redux';
import {login} from '../../actions/loginActions';
import {browserHistory} from 'react-router';
import {addFlashMessage} from '../../actions/flashMessages.js';
import isEmpty from 'lodash/isEmpty';


class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            emailAddress: '',
            password: '',
            errors: [],
            isSubmitting: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isValid(){
        if(isEmpty(this.state.emailAddress) || isEmpty(this.state.password)){
            this.props.addFlashMessage({
                type: 'error',
                text: 'Please provide email address and password to login'
            });
            return false;
        }
        return true;
    }

    onSubmit(e){
        e.preventDefault();
        if(this.isValid()){
            this.setState({errors: [], isSubmitting: true});
            this.props.login(this.state).then(
                (response) => {
                    this.setState({isSubmitting: false});
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Welcome to Megascans!!!'
                    });
                    browserHistory.push('/settings');
                },
                (error) => {
                    const responseObject = JSON.parse(error.request.response);
                    this.setState({isSubmitting: false});
                    this.props.addFlashMessage({
                        type: 'error',
                        text: responseObject.message
                    });
                }
            );
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        const { errors, emailAddress, password, isSubmitting } = this.state;
        return(
            <form onSubmit={this.onSubmit}>

                <h1>Login</h1>

                <TextFieldGroup
                    field="emailAddress"
                    label="Email address"
                    value={emailAddress}
                    onChange={this.onChange}
                    />

                <TextFieldGroup
                    field="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={this.onChange}
                    />

                <div className="form-group">
                    <button className="btn btn-primary btn-lg" disabled={isSubmitting}>Login</button>
                </div>

            </form>
        );
    }
}

LoginForm.propTypes = {
    login: React.PropTypes.func.isRequired
};



export default connect(null, {login, addFlashMessage})(LoginForm);
