import React from 'react';
import { Header, Footer } from 'components';

class App extends React.Component {
    render() {
        const bodyStyle={
            "display": "-webkit-box",
            "display": "-moz-box",
            "display": "-ms-flexbox",
            "display": "-webkit-flex",
            "display": "flex",
            "min-height": "100vh",
            "flex-direction": "column"
        };
        const mainStyle={
            "-webkit-box-flex": "1 0 auto",
            "-moz-box-flex": "1 0 auto",
            "-webkit-flex": "1 0 auto",
            "-ms-flex": "1 0 auto",
            "flex": "1 0 auto"
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