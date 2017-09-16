import {
    GET_ARTLIST,
    GET_ARTLIST_SUCCESS,
    GET_ARTLIST_FAILURE,
    GET_ART,
    GET_ART_SUCCESS,
    GET_ART_FAILURE,
    UPLOAD_ART,
    UPLOAD_ART_SUCCESS,
    UPLOAD_ART_FAILURE,
    MODIFY_ART,
    MODIFY_ART_SUCCESS,
    MODIFY_ART_FAILURE,
    DELETE_ART,
    DELETE_ART_SUCCESS,
    DELETE_ART_FAILURE,
    INIT_ART,
    GET_USERART,
    GET_USERART_SUCCESS,
    GET_USERART_FAILURE
} from './ActionTypes';
import axios from 'axios';
import * as firebase from 'firebase';

// ART 가져오기
/*
    ART 구조
    {
        id: ObjectID,
        owner: name,
        title: title,
        description: description,
        img: url,
        created: date
    }
*/
export function getArtListRequest(){
    return (dispatch) => {
        dispatch(getArtList());
        
        const dbRef = firebase.database().ref("arts");
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
                // console.log("gtlr", data);
                return dispatch(getArtListSuccess(data));
            }else {
                // 없음
                return dispatch(getArtListFailure("no data"));    
            }
        })
    };
}

export function getArtList() {
    return {
        type: GET_ARTLIST
    };
}

export function getArtListSuccess(data){
    return {
        type: GET_ARTLIST_SUCCESS,
        data
    };
}

export function getArtListFailure(err){
    return {
        type: GET_ARTLIST_FAILURE,
        err: err
    };
}

export function getArtRequest(uid){
    return (dispatch) => {
        dispatch(getArt());
        
        const dbRef = firebase.database().ref("arts/" + uid);
        
        dbRef.once("value", (snapshot) => {
            return dispatch(getArtSuccess(snapshot.val()))
        });
    };
}

export function getArt() {
    return {
        type: GET_ART
    };
}

export function getArtSuccess(data){
    return {
        type: GET_ART_SUCCESS,
        data
    };
}

export function getArtFailure(err){
    return {
        type: GET_ART_FAILURE,
        err: err
    };
}

export function uploadArtRequest(owner, title, description, files){
    return (dispatch) => {
        dispatch(uploadArt());
        
        // storage 인스턴스
        var storageRef = firebase.storage().ref();
        var dbRef = firebase.database().ref("/arts");
        // 업로드 데이터
        var postData = {};
        var updates = {};
        // console.log(files[0]);
        // 파일 이름
        const filename = owner.name + "_" + title + "_" + Date.now() + "." + files[0].name.split(".")[1];
        
        // 스토리지 저장 위치
        var target = storageRef.child("/arts/" + filename)
        
        // 이미지 업로드
        target.put(files[0]).then((snapshot) => {
            // console.log("firebase uploaded");
            target.getDownloadURL().then((url) => {
                var newPostKey = dbRef.push().key;
                postData = {
                    owner: owner,
                    title: title,
                    description: description,
                    img: url,
                    created: new Date()
                }
                
                updates[newPostKey] = postData;
                dbRef.update(updates);
                
                dbRef.child(newPostKey).on("value", (snapshot) => {
                    if(snapshot.val() !== null && snapshot.val().title === postData.title){
                        //같으면 성공
                        dbRef.child(newPostKey).off();
                        dispatch(getArtListRequest());
                        return dispatch(uploadArtSuccess(snapshot.val()));
                    } else {
                        //다르면 실패
                        return dispatch(uploadArtFailure("not match!"))
                    }
                });
            })
        })
    };
}

export function initArt(){
    return {
        type: INIT_ART
    }
}

export function uploadArt() {
    return {
        type: UPLOAD_ART
    };
}

export function uploadArtSuccess(data){
    return {
        type: UPLOAD_ART_SUCCESS,
        data
    };
}

export function uploadArtFailure(err){
    return {
        type: UPLOAD_ART_FAILURE,
        err: err
    };
}

export function getUserArtRequest(uid){
    return (dispatch) => {
        dispatch(getUserArt());
        if(uid === "undefined")
            return dispatch(getUserArtSuccess([]))
        const dbRef = firebase.database().ref("arts/");
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
                return dispatch(getUserArtSuccess(data));
            }else {
                // 없음
                return dispatch(getUserArtFailure("no data"));    
            }
        })
    };
}

export function getUserArt() {
    return {
        type: GET_USERART
    };
}

export function getUserArtSuccess(data){
    return {
        type: GET_USERART_SUCCESS,
        data
    };
}

export function getUserArtFailure(err){
    return {
        type: GET_USERART_FAILURE,
        err: err
    };
}
