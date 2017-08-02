import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper red darken-3">
                    <Link to="/home" className="brand-logo left">일러스티</Link>
                    <ul className="right">
                        <li><Link to="/geusan">geusan</Link></li>
                        <li><Link to="/gamrom">gamrom</Link></li>
                        <li><Link to="/jiyun">jiyun</Link></li>
                        <li><Link to="/jeong">jeong</Link></li>
                        <li><Link to="/chayeoi">chayeoi</Link></li>
                    </ul>
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