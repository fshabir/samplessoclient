import React, { Component } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logout} from '../actions/loginActions';
import {browserHistory} from 'react-router';

class NavigationBar extends Component {
    constructor(props){
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout(e){
        e.preventDefault();
        this.props.logout();
        browserHistory.push("/login");
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/settings">Settings</Link></li>
                <li><a onClick={this.onLogout} href="#">Logout</a></li>
            </ul>
        );

        const guesLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        );
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Home</Link>
                    </div>

                    <div className="collapse navbar-collapse">
                        {isAuthenticated ? userLinks: guesLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

NavigationBar.propTypes = {
    auth: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state){
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps, {logout})(NavigationBar);