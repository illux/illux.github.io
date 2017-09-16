import React from 'react';
import { Header, Footer } from 'components';
import { browserHistory } from 'react-router';

class App extends React.Component {
    
    constructor(props){
        super(props);
    }
    
    componentWillMount(){
        if(this.props.location.search.split("/")[0] === "?p="){
            browserHistory.push("/" + this.props.location.search.slice(4));
        }
    }
    
    render() {
        const bodyStyle={
            "display": "-webkit-box",
            "display": "-moz-box",
            "display": "-ms-flexbox",
            "display": "-webkit-flex",
            "display": "flex",
            "minHeight": "100vh",
            "flexDirection": "column"
        };
        const mainStyle={
            "WebkitBoxFlex": "1 0 auto",
            "MozBoxFlex": "1 0 auto",
            "WebkitFlex": "1 0 auto",
            "MsFlex": "1 0 auto",
            "flex": "1 0 auto",
            "overflowX": "hidden"
        };
        
        
        return (
            <div style={bodyStyle}>
                <Header />
                <main style={mainStyle}>{this.props.children}</main>
                <Footer />
            </div>
        );
    }
}

export default App;