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
                    <Link to="/home" className="brand-logo">MONSTER EATING</Link>
                    <ul>
                        <li><a><i className="material-icons">search</i></a></li>
                        <li><Link to="/geusan">geusan</Link></li>
                        <li><Link to="/gamrom">gamrom</Link></li>
                        <li><Link to="/jiyun">jiyun</Link></li>
                        <li><Link to="/jeong">jeong</Link></li>
                        <li><Link to="/chayeoi">chayeoi</Link></li>
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