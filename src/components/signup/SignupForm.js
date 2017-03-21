import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import {browserHistory} from 'react-router';
import isEmpty from 'lodash/isEmpty';

class SignupForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            emailAddress: '',
            username: '',
            password: '',
            passwordConfirmation: '',
            errors: {},
            isSubmitting: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    isValid(){
        if(isEmpty(this.state.emailAddress) || isEmpty(this.state.username) || isEmpty(this.state.password) || isEmpty(this.state.passwordConfirmation)){
            this.props.addFlashMessage({
                type: 'error',
                text: 'Please fill all the fields to signup'
            });
            return false;
        } else if(this.state.password !== this.state.passwordConfirmation){
            this.props.addFlashMessage({
                type: 'error',
                text: 'Provided passwords mismatch'
            });
            return false;
        }
        return true;
    }

    onSubmit(e){
        e.preventDefault();

        if(this.isValid()) {
            this.setState({errors: {}, isSubmitting: true});
            console.log(this.state);
            this.props.userSignupRequest(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You signed up successfully'
                    });
                    browserHistory.push('/');
                },
                ({ data }) => {
                    this.setState({errors: data, isSubmitting: false})
                    this.props.addFlashMessage({
                        type: 'error',
                        text: data.message
                    });
                }
            );
        }
    }

    render(){
        //const { errors } = this.state;
        return(
            <form onSubmit={this.onSubmit}>
                <h1>Join us at Quixel!</h1>

                <TextFieldGroup
                    label="Email address"
                    onChange={this.onChange}
                    value={this.state.emailAddress}
                    field="emailAddress"
                    />

                <TextFieldGroup
                    label="Your full name"
                    onChange={this.onChange}
                    value={this.state.username}
                    field="username"
                    />

                <TextFieldGroup
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    type="password"
                    field="password"
                    />

                <TextFieldGroup
                    label="Repeat password"
                    onChange={this.onChange}
                    value={this.state.passwordConfirmation}
                    type="password"
                    field="passwordConfirmation"
                    />

                <div className="form-group">
                    <button disabled={this.state.isSubmitting} className="btn btn-primary btn-lg">
                        Sign Up
                    </button>
                </div>
            </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
};

export default SignupForm;