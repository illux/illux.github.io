import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    
    list:{
        status: 'INIT',
        error: -1,
        data: []
    },
    item:{
        status: 'INIT',
        error: -1,
        data: {}
    },
    post:{
        status: 'INIT',
        error: -1,
        success:false
    }
};

export default function learn(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }
    
    switch(action.type){
        
        // 회원가입 또는 로그인
        // case types.USER_SIGN_UP:
        //     return update(state, {
        //         user: {
        //             status: { $set: 'WAITING' },
        //             error: { $set: -1 }
        //         }
        //     });
        // case types.USER_SIGN_UP_SUCCESS:
        //     return update(state, {
        //         user: {
        //             status: { $set: 'SUCCESS' },
        //             loggedIn: { $set: true},
        //             data:{ $set: action.data }
        //         }
        //     });
        // case types.USER_SIGN_UP_FAILURE:
        //     return update(state,{
        //         user: {
        //             status: { $set: 'FAILURE' },
        //             error: { $set: action.error }
        //         }
        //     });
        default:
            return state;
    }
}