import {
    GET_BOARDLIST,
    GET_BOARDLIST_SUCCESS,
    GET_BOARDLIST_FAILURE,
    GET_BOARD,
    GET_BOARD_SUCCESS,
    GET_BOARD_FAILURE,
    UPLOAD_BOARD,
    UPLOAD_BOARD_SUCCESS,
    UPLOAD_BOARD_FAILURE,
    MODIFY_BOARD,
    MODIFY_BOARD_SUCCESS,
    MODIFY_BOARD_FAILURE,
    DELETE_BOARD,
    DELETE_BOARD_SUCCESS,
    DELETE_BOARD_FAILURE,
    GET_USERBOARD,
    GET_USERBOARD_SUCCESS,
    GET_USERBOARD_FAILURE,
    INIT_BOARD
} from './ActionTypes';
import * as firebase from 'firebase';

export function getBoardListRequest(){
    return (dispatch) => {
        dispatch(getBoardList());
        
        const dbRef = firebase.database().ref("boards");
        dbRef.orderByChild("created").once('value', (snapshot) => {
            if(snapshot !== null){
                // 있음
                var data = [];
                snapshot.forEach((child) => {
                    data.push(child.val());
                })
                data.sort((a,b) => {
                    return b["created"] < a["created"] ? -1 : b["created"] > a["created"] ? 1 : 0
                })
                console.log("gtlr", data);
                return dispatch(getBoardListSuccess(data));
            }else {
                // 없음
                return dispatch(getBoardListFailure("no data"));    
            }
        })
    };
}

export function getBoardList() {
    return {
        type: GET_BOARDLIST
    };
}

export function getBoardListSuccess(data){
    return {
        type: GET_BOARDLIST_SUCCESS,
        data
    };
}

export function getBoardListFailure(err){
    return {
        type: GET_BOARDLIST_FAILURE,
        err: err
    };
}

export function getBoardRequest(uid){
    return (dispatch) => {
        dispatch(getBoard());
        
        const dbRef = firebase.database().ref("boards/" + uid);
        
        dbRef.once("value", (snapshot) => {
            return dispatch(getBoardSuccess(snapshot.val()))
        });
    };
}

export function getBoard() {
    return {
        type: GET_BOARD
    };
}

export function getBoardSuccess(data){
    return {
        type: GET_BOARD_SUCCESS,
        data
    };
}

export function getBoardFailure(err){
    return {
        type: GET_BOARD_FAILURE,
        err: err
    };
}

export function uploadBoardRequest(owner, title, description, url){
    return (dispatch) => {
        dispatch(uploadBoard());
        
        // storage 인스턴스
        
        var dbRef = firebase.database().ref("boards");
        // 업로드 데이터
        
        // console.log(files[0]);
        // 파일 이름
        var newPostKey = dbRef.push().key;
        var postData = {
                owner: owner,
                title: title,
                description: description,
                url: url,
                created: new Date()
            }
        var updates = {};
        updates[newPostKey] = postData;
        dbRef.update(updates);
        
        dbRef.child(newPostKey).on("value", (snapshot) => {
            if(snapshot.val() !== null && snapshot.val().title === postData.title){
                //같으면 성공
                dbRef.child(newPostKey).off();
                console.log(":::",snapshot.val());
                return dispatch(uploadBoardSuccess(snapshot.val()));
            } else {
                //다르면 실패
                return dispatch(uploadBoardFailure("not match!"))
            }
        });
    };
}
export function initBoard(){
    return {
        type: INIT_BOARD
    };
}
export function uploadBoard() {
    return {
        type: UPLOAD_BOARD
    };
}

export function uploadBoardSuccess(data){
    return {
        type: UPLOAD_BOARD_SUCCESS,
        data
    };
}

export function uploadBoardFailure(err){
    return {
        type: UPLOAD_BOARD_FAILURE,
        err: err
    };
}

export function getUserBoardRequest(uid){
    return (dispatch) => {
        dispatch(getUserBoard());
        if(uid === "undefined")
            return dispatch(getUserBoardSuccess([]))
        const dbRef = firebase.database().ref("boards/");
        dbRef.orderByChild("created").once('value', (snapshot) => {
            if(snapshot !== null){
                // 있음
                var data = [];
                snapshot.forEach((child) => {
                    if(child.val().owner.uid === uid)
                        data.push(child.val());
                })
                data.sort((a,b) => {
                    return b["created"] < a["created"] ? -1 : b["created"] > a["created"] ? 1 : 0
                })
                // console.log("gtlr", data);
                return dispatch(getUserBoardSuccess(data));
            }else {
                // 없음
                return dispatch(getUserBoardFailure("no data"));    
            }
        })
    };
}

export function getUserBoard() {
    return {
        type: GET_USERBOARD
    };
}

export function getUserBoardSuccess(data){
    return {
        type: GET_USERBOARD_SUCCESS,
        data
    };
}

export function getUserBoardFailure(err){
    return {
        type: GET_USERBOARD_FAILURE,
        err: err
    };
}
