import React from 'react';

class Footer extends React.Component {
    render() {
        const pStyle = {
            margin: 0,
            fontSize:"1.2em"
        }
        return (
            <footer>
                <div className="grey darken-4 center-align notosans" style={{padding:"10px"}}>
                    <p className="brand-logo center white-text" style={pStyle}>Copyright 2017 동국대학교 일러스트 스터디 ILLUX</p>
                </div>
            </footer>
        );
    }
}

export default Footer;