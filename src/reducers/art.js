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
        doing: false,
        success:false
    },
    userlist:{
        status: 'INIT',
        error: -1,
        data: []
    }
};

export default function art(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }
    
    switch(action.type){
        
        case types.UPLOAD_ART:
            // console.log("upload_art")
            return update(state, {
                post: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 },
                    doing: {$set: true}
                }
            });
        case types.UPLOAD_ART_SUCCESS:
            // console.log("upload_art_success")
            return update(state, {
                post: {
                    status: { $set: 'SUCCESS' },
                    success: { $set: true},
                    data:{ $set: action.data }
                }
            });
        case types.UPLOAD_ART_FAILURE:
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
        
        case types.GET_ARTLIST:
            // console.log("upload_art")
            return update(state, {
                list: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 },
                    doing: {$set: true}
                }
            });
        case types.GET_ARTLIST_SUCCESS:
            // console.log("upload_art_success")
            return update(state, {
                list: {
                    status: { $set: 'SUCCESS' },
                    success: { $set: true},
                    data:{ $set: action.data }
                }
            });
        case types.GET_ARTLIST_FAILURE:
            return update(state,{
                list: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        
        case types.GET_USERART:
            // console.log("upload_art")
            return update(state, {
                userlist: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 },
                    doing: {$set: true}
                }
            });
        case types.GET_USERART_SUCCESS:
            // console.log("upload_art_success")
            return update(state, {
                userlist: {
                    status: { $set: 'SUCCESS' },
                    success: { $set: true},
                    data:{ $set: action.data }
                }
            });
        case types.GET_USERART_FAILURE:
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