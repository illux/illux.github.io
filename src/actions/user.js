import {
    USER_SIGN_UP,
    USER_SIGN_UP_SUCCESS,
    USER_SIGN_UP_FAILURE,
    USER_LOGOUT_SUCCESS,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    GET_USERLIST,
    GET_USERLIST_SUCCESS,
    GET_USERLIST_FAILURE,
    FORCE_PRIVILEGE,
    FORCE_PRIVILEGE_SUCCESS,
    FORCE_PRIVILEGE_FAILURE,
} from './ActionTypes';
import axios from 'axios';
import * as firebase from 'firebase';

// 회원가입 또는 로그인
export function userSignUpRequest(user){
    return (dispatch) => {
        dispatch(userSignUp());
        // console.log(JSON.stringify(firebase.auth().currentUser));
        
        const dbRef = firebase.database().ref("users/" + user.uid);
        
        var email = "";
        
        dbRef.on('value', (snapshot) => {
            // console.log(snapshot.val());
            
            if(snapshot.val() !== null){
                email = snapshot.val().email;    
            }
            
            if(email === user.email){
                // 이미 있으면
                dbRef.update({
                    "/uid": user.uid
                });
                
            } else {
                // 없으면
                dbRef.set({
                    name: user.name,
                    nick: "undefined",
                    nickImg: "undefined",
                    img: user.img,
                    privilege: 1,
                    email: user.email
                });
            }
        });
        
        dbRef.on("value", (data) => {
            console.log(data.val());
            if(data.val() !== null){
                // var temp = data.val();
                // temp["uid"] = user.uid;
                dbRef.off();
                return dispatch(userSignUpSuccess(data.val()));
            }
        })
    };
}

export function userSignUp() {
    return {
        type: USER_SIGN_UP
    };
}

export function userSignUpSuccess(data){
    return {
        type: USER_SIGN_UP_SUCCESS,
        data
    };
}

export function userSignUpFailure(err){
    return {
        type: USER_SIGN_UP_FAILURE,
        err: err
    };
}


// 회원가입 또는 로그인
export function userSignOutRequest(){
    const data = {};
    return {
            type: USER_LOGOUT_SUCCESS,
            data
    };
}


// 회원 받아오기
export function getUsersRequest(){
    return (dispatch) => {
        dispatch(getUsers());
        // console.log(JSON.stringify(firebase.auth().currentUser));
        
        const dbRef = firebase.database().ref("users/");
        
        dbRef.on("value", (snapshot) => {
            
            if(snapshot.val() !== null){
                var data = [];
                snapshot.forEach((child) => {
                    if(child.val().privilege > 1)
                        data.push(child.val())
                })
                data.sort((a,b) => {
                    return b["created"] > a["created"] ? -1 : b["created"] < a["created"] ? 1 : 0
                })
                dbRef.off();
                return dispatch(getUsersSuccess(data));
            }
        })
    };
}

export function getUsers() {
    return {
        type: GET_USERLIST
    };
}

export function getUsersSuccess(data){
    return {
        type: GET_USERLIST_SUCCESS,
        data
    };
}

export function getUsersFailure(err){
    return {
        type: GET_USERLIST_FAILURE,
        err: err
    };
}

// 회원 권한 올리기
export function forcePrivilegeRequest(uid){
    return (dispatch) => {
        dispatch(forcePrivilege());
        // console.log(JSON.stringify(firebase.auth().currentUser));
        
        const targetDBRef = firebase.database().ref("users/" + uid);
        const dbRef = firebase.database().ref("users/");
        
        targetDBRef.update({
            "/privilege": 2
        })
        
        
        dbRef.on("value", (snapshot) => {
            
            if(snapshot.val() !== null && snapshot.val()[uid].privilege === 2){
                var data = []
                snapshot.forEach((child) => {
                    data.push(child.val())
                })
                
                dbRef.off();
                return dispatch(forcePrivilegeSuccess(data));
            }
        }).catch((err) => {
            return dispatch(forcePrivilegeFailure(err));
        });
    };
}

export function forcePrivilege() {
    return {
        type: FORCE_PRIVILEGE
    };
}

export function forcePrivilegeSuccess(data){
    return {
        type: FORCE_PRIVILEGE_SUCCESS,
        data
    };
}

export function forcePrivilegeFailure(err){
    return {
        type: FORCE_PRIVILEGE_FAILURE,
        err: err
    };
}