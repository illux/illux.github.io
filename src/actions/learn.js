import {
    GET_LEARNLIST,
    GET_LEARNLIST_SUCCESS,
    GET_LEARNLIST_FAILURE,
    GET_LEARN,
    GET_LEARN_SUCCESS,
    GET_LEARN_FAILURE,
    UPLOAD_LEARN,
    UPLOAD_LEARN_SUCCESS,
    UPLOAD_LEARN_FAILURE,
    MODIFY_LEARN,
    MODIFY_LEARN_SUCCESS,
    MODIFY_LEARN_FAILURE,
    DELETE_LEARN,
    DELETE_LEARN_SUCCESS,
    DELETE_LEARN_FAILURE,
    GET_USERLEARN,
    GET_USERLEARN_SUCCESS,
    GET_USERLEARN_FAILURE
} from './ActionTypes';
import * as firebase from 'firebase';

export function getLearnListRequest(){
    return (dispatch) => {
        dispatch(getLearnList());
        
        const dbRef = firebase.database().ref("learns/");
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
                return dispatch(getLearnListSuccess(data));
            }else {
                // 없음
                return dispatch(getLearnListFailure("no data"));    
            }
        })
    };
}

export function getLearnList() {
    return {
        type: GET_LEARNLIST
    };
}

export function getLearnListSuccess(data){
    return {
        type: GET_LEARNLIST_SUCCESS,
        data
    };
}

export function getLearnListFailure(err){
    return {
        type: GET_LEARNLIST_FAILURE,
        err: err
    };
}

export function getLearnRequest(uid){
    return (dispatch) => {
        dispatch(getLearn());
        
        const dbRef = firebase.database().ref("learns/" + uid);
        
        dbRef.once("value", (snapshot) => {
            return dispatch(getLearnSuccess(snapshot.val()))
        });
    };
}

export function getLearn() {
    return {
        type: GET_LEARN
    };
}

export function getLearnSuccess(data){
    return {
        type: GET_LEARN_SUCCESS,
        data
    };
}

export function getLearnFailure(err){
    return {
        type: GET_LEARN_FAILURE,
        err: err
    };
}

export function uploadLearnRequest(owner, title, description, files){
    return (dispatch) => {
        dispatch(uploadLearn());
        
        // storage 인스턴스
        var storageRef = firebase.storage().ref();
        var dbRef = firebase.database().ref("boards");
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
                        return dispatch(uploadLearnSuccess(snapshot.val()));
                    } else {
                        //다르면 실패
                        return dispatch(uploadLearnFailure("not match!"))
                    }
                });
            })
        })
    };
}

export function uploadLearn() {
    return {
        type: UPLOAD_LEARN
    };
}

export function uploadLearnSuccess(data){
    return {
        type: UPLOAD_LEARN_SUCCESS,
        data
    };
}

export function uploadLearnFailure(err){
    return {
        type: UPLOAD_LEARN_FAILURE,
        err: err
    };
}

export function getUserLearnRequest(uid){
    return (dispatch) => {
        dispatch(getUserLearn());
        if(uid === "undefined")
            return dispatch(getUserLearnSuccess([]))
        const dbRef = firebase.database().ref("learns/");
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
                return dispatch(getUserLearnSuccess(data));
            }else {
                // 없음
                return dispatch(getUserLearnFailure("no data"));    
            }
        })
    };
}

export function getUserLearn() {
    return {
        type: GET_USERLEARN
    };
}

export function getUserLearnSuccess(data){
    return {
        type: GET_USERLEARN_SUCCESS,
        data
    };
}

export function getUserLearnFailure(err){
    return {
        type: GET_USERLEARN_FAILURE,
        err: err
    };
}

