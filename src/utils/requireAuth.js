import React from 'react';
import {connect} from 'react-redux';
import {addFlashMessage} from '../actions/flashMessages';
import {browserHistory} from 'react-router';

export default function(ChildComponent){
    class Authenticate extends React.Component{

        componentWillMount(){
            if(!this.props.isAuthenticated){
                this.props.addFlashMessage({
                    type: 'error',
                    text: 'Please login to view this page'
                });
                browserHistory.push("/login");
            }
        }

        componentWillUpdate(nextProps){
            if(!nextProps.isAuthenticated){
                browserHistory.push("/login");
            }
        }

        render(){
            return(
                <ChildComponent {...this.props} />
            );
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired,
        addFlashMessage: React.PropTypes.func.isRequired
    };

    function mapStateToProps(state){
        return{
            isAuthenticated: state.auth.isAuthenticated
        };
    }

    return connect(mapStateToProps, {addFlashMessage})(Authenticate);
}

