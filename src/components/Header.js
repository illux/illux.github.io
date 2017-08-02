import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
    render() {
        const loginButton = (
            <li><a><i className="material-icons">vpn_key</i></a></li>
            );
        
        const logoutButton = (
            <li><a><i className="material-icons">lock_open</i></a></li>
            );
        
        return (
            <nav>
                <div className="nav-wrapper red darken-3">
                    <Link to="/home" className="brand-logo center">MONSTER EATING</Link>

                    <ul>
                        <li><a><i className="material-icons">search</i></a></li>
                        <Link to="/geusan">geusan</Link>
                        <Link to="/gamrom">gamrom</Link>
                        <Link to="/jiyun">jiyun</Link>
                        <Link to="/jeong">jeong</Link>
                        <Link to="/chayeoi">chayeoi</Link>
                    </ul>

                    <div className="right">
                        <ul>
                            {this.props.isLoggedIn ? logoutButton: loginButton}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    isLoggedIn: React.PropTypes.bool,
    onLogout: React.PropTypes.func
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.log('logout function is not defined'); }
}
export default Header;