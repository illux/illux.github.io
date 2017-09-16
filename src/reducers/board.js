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
    },
    userlist:{
        status: 'INIT',
        error: -1,
        data: []
    }
};

export default function board(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }
    
    switch(action.type){
        
        case types.INIT_BOARD:
            return update(state, {
                post: {
                    status: { $set: 'INIT'}
                }
            })
        case types.UPLOAD_BOARD:
            // console.log("UPLOAD_BOARD")
            return update(state, {
                post: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 },
                    doing: {$set: true}
                }
            });
        case types.UPLOAD_BOARD_SUCCESS:
            // console.log("UPLOAD_BOARD_success")
            return update(state, {
                post: {
                    status: { $set: 'SUCCESS' },
                    success: { $set: true},
                    data:{ $set: action.data }
                }
            });
        case types.UPLOAD_BOARD_FAILURE:
            return update(state,{
                post: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        
        case types.INIT_ART:
            return update(state, {
                post:{
                    status: {$set: 'INIT'},
                    success: {$set: false},
                    doing: {$set: false}
                }
            })
        
        case types.GET_BOARDLIST:
            // console.log("UPLOAD_BOARD")
            return update(state, {
                list: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 },
                    doing: {$set: true}
                }
            });
        case types.GET_BOARDLIST_SUCCESS:
            // console.log("UPLOAD_BOARD_success")
            return update(state, {
                list: {
                    status: { $set: 'SUCCESS' },
                    success: { $set: true},
                    data:{ $set: action.data }
                }
            });
        case types.GET_BOARDLIST_FAILURE:
            return update(state,{
                list: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        
        case types.GET_USERBOARD:
            // console.log("UPLOAD_BOARD")
            return update(state, {
                userlist: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 },
                    doing: {$set: true}
                }
            });
        case types.GET_USERBOARD_SUCCESS:
            // console.log("UPLOAD_BOARD_success")
            return update(state, {
                userlist: {
                    status: { $set: 'SUCCESS' },
                    success: { $set: true},
                    data:{ $set: action.data }
                }
            });
        case types.GET_USERBOARD_FAILURE:
            return update(state,{
                userlist: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        default:
            return state;
    }
}