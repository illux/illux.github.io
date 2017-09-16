import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    loginInfo:{
        status: 'INIT',
        error: -1,
        loggedIn: false,
        data: {
        }
    },
    post:{
        status: 'INIT',
        error: -1,
        success:false
    },
    list:{
      status: 'INIT',
      error: -1,
      data: []
    },
    userInfo:{
        status: 'INIT',
        error: -1,
        loggedIn: false,
        data: {
        }
    },
};

export default function user(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }
    // console.log(action.type);
    switch(action.type){
        
        // 회원가입 또는 로그인
        case types.USER_SIGN_UP:
            return update(state, {
                loginInfo: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.USER_SIGN_UP_SUCCESS:
            return update(state, {
                loginInfo: {
                    status: { $set: 'SUCCESS' },
                    loggedIn: { $set: true},
                    data:{ $set: action.data }
                }
            });
        case types.USER_SIGN_UP_FAILURE:
            return update(state,{
                loginInfo: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
            
        case types.USER_LOGOUT_SUCCESS:
            return update(state,{
                loginInfo: {
                    status: { $set: 'FAILURE' },
                    loggedIn: { $set: false },
                    data:{ $set: action.data }
                }
            });
        
        case types.GET_USERLIST:
            return update(state,{
                list: {
                    status: { $set: 'WAITING' }
                }
            });
        
        case types.GET_USERLIST_SUCCESS:
            return update(state,{
                list: {
                    status: { $set: 'SUCCESS' },
                    data:{ $set: action.data }
                }
            });
            
        case types.GET_USERLIST_FAILURE:
            return update(state,{
                list: {
                    status: { $set: 'FAILURE' }
                }
            });
            
        
        default:
            return state;
    }
}