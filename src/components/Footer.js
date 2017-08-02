import React from 'react';

class Footer extends React.Component {
    render() {
        const pStyle = {
            margin: 0
        }
        return (
            <footer>
                <div className="red darken-3 center-align">
                    <p className="brand-logo center white-text" style={pStyle}>Copyright2017 동국대학교 일러스트 스터디</p>
                </div>
            </footer>
        );
    }
}

export default Footer;