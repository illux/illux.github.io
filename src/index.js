import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { App, Home, Admin, Learn, LearnDetail, Event, 
        EventDetail, Upload, All, Member
} from 'containers';
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

import * as firebase from 'firebase';
injectTapEventPlugin();
firebase.initializeApp({
    apiKey: "AIzaSyDcizX5xPZcFHVTYhK77PIsa0xZXXa4JU0",
    authDomain: "illustudee.firebaseapp.com",
    databaseURL: "https://illustudee.firebaseio.com",
    projectId: "illustudee",
    storageBucket: "illustudee.appspot.com",
    messagingSenderId: "156073224567"
});

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');
ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home}/>
                    <Route path="admin" component={Admin}/>
                    <Route path="event" component={Event}/>
                    <Route path="learn" component={Learn}/>
                    <Route path="event/detail/:what" component={EventDetail}/>
                    <Route path="learn/detail/:what" component={LearnDetail}/>
                    <Route path="all" component={All}/>
                    <Route path="member/:what" component={Member} />
                    <Route component={Home} />
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>
    , rootElement);