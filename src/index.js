import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { App, Home, Geusan, Jeong, Jiyun, Gamrom, Chayeoi} from 'containers';


const rootElement = document.getElementById('root');
ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="home" component={Home}/>
                <Route path="geusan" component={Geusan}/>
                <Route path="jeong" component={Jeong}/>
                <Route path="jiyun" component={Jiyun}/>
                <Route path="gamrom" component={Gamrom}/>
                <Route path="chayeoi" component={Chayeoi}/>
            </Route>
        </Router>
    , rootElement);