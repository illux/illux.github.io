import React from 'react';
import {FontIcon, AppBar, Drawer, Avatar, MenuItem, Subheader, Divider, Snackbar} from 'material-ui';
import {browserHistory} from 'react-router';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
import {connect} from 'react-redux';
import {UploadDialog} from 'components';
import {
    userSignUpRequest,
    userSignOutRequest,
    getUsersRequest
} from 'actions/user';
import * as firebase from 'firebase';
 
class Header extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            open: false,
            dialog: false,
            snack: false,
            snackMsg: ""
        };
    }
    
    componentDidMount(){
        this.props.getUsersRequest();
    }
    
    handleLeftIcon(){
        this.setState({
            open: true
        });
    }
    
    handleMenuItem(arg){
        browserHistory.push(arg);
        this.setState({
            open: false
        });
    }
    
    handleOpenUpload(){
        this.setState({
            dialog: true,
            open: false
        });
    }
    
    handleCloseUpload(){
        this.setState({
            dialog:false
        });
    }
    
    handleRequestClose(){
        this.setState({
            snack:false
        });
    }
    
    login(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((res) => {
            var token = res.credential.accessToken;
            var user = res.user;
  
            var userTemp = {
                uid: user.uid,
                name: user.displayName,
                img: user.photoURL,
                privilege: 1,
                email: user.email
            }
            this.props.userSignUpRequest(userTemp);
        }).catch((err) => {
            console.error(err)
        })
    }
    
    logout(){
        firebase.auth().signOut().then(() => {
            this.props.userSignOutRequest();
        }).catch((err) => {
          console.error(err)  
        })
    }
    
    onResult(flag){
        var msg = "";
        if(flag){
            msg = "성공적으로 업로드 되었습니다."
        }else{
            msg = "업로드 에러"
        }
        
        this.setState({
            snack: flag,
            snackMsg: msg
        })
    }
    
    render() {
            
        const userItems = this.props.users.map((item, i) => 
            <MenuItem 
            key={i} 
            primaryText={item.name} 
            onClick={this.handleMenuItem.bind(this,"/member/" +item.uid)} 
            rightIcon={<Avatar src={item.img} size={40} />}/>
        );
        // console.log(this.props.users);
        return (
            <div>
            {this.props.loggedIn ?
            <AppBar
            className="grey darken-4 notosans"
            title="ILLUX"
            onLeftIconButtonTouchTap={this.handleLeftIcon.bind(this)}
            iconElementRight={<FileFileUpload style={{margin:"auto",color:"white",marginTop:"8px"}}/>}
            onRightIconButtonTouchTap={this.handleOpenUpload.bind(this)}
            >
            </AppBar>
                :
            <AppBar
            className="grey darken-4 notosans"
            title="ILLUX"
            onLeftIconButtonTouchTap={this.handleLeftIcon.bind(this)}
            >
            </AppBar>
            }
            
            <UploadDialog 
                className={"notosans"}
                mode={"normal"}
                open={this.state.dialog}
                onResult={this.onResult.bind(this)}
                cancel={this.handleCloseUpload.bind(this)}
            />
            
            <Drawer
                className="notosans"
                docked={false}
                width={200}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
            >
            <MenuItem primaryText="ILLUX 일러스터디" disabled={true} className="red" style={{color:"white"}}/>
            { this.props.loggedIn ? 
                <MenuItem primaryText="로그아웃 하기" onClick={this.logout.bind(this)}/>
                :
                <MenuItem primaryText="로그인 하기" onClick={this.login.bind(this)}/>    
            }
            { this.props.loggedIn ? 
                <MenuItem primaryText={"업로드 하기"} leftIcon={<FontIcon className="material-icons">file_upload</FontIcon>}
                onClick={this.handleOpenUpload.bind(this)}/>    
                :
                ""
            }
            { this.props.loggedIn ? 
                <MenuItem primaryText={this.props.loginInfo.name} leftIcon={<Avatar src={this.props.loginInfo.img} size={40} />} />    
                :
                <MenuItem primaryText={"로그인 후 사용"} disabled={true} />
            }
            
            
            <Divider />
            <Subheader>Menus</Subheader>
            <MenuItem leftIcon={<FontIcon className="material-icons">home</FontIcon>} primaryText="홈으로" onClick={this.handleMenuItem.bind(this,"/")} />
            <MenuItem leftIcon={<FontIcon className="material-icons">developer_board</FontIcon>} primaryText="이벤트" onClick={this.handleMenuItem.bind(this,"/event")} />
            <MenuItem leftIcon={<FontIcon className="material-icons">gesture</FontIcon>} primaryText="배우기" onClick={this.handleMenuItem.bind(this,"/learn")} />
            <MenuItem leftIcon={<FontIcon className="material-icons">dashboard</FontIcon>} primaryText="작품보기" onClick={this.handleMenuItem.bind(this,"/all")} />
            <MenuItem disabled={true} />
            
            <Divider />
            <Subheader>Members</Subheader>
            {userItems}
            
            </Drawer>
            <Snackbar 
                open={this.state.snack}
                message={this.state.snackMsg}
                action="확인"
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose.bind(this)}
            />
            </div>
        );
    }
}

Header.propTypes = {
    isLoggedIn: React.PropTypes.bool
};

Header.defaultProps = {
    isLoggedIn: false,
}


const mapStateToProps = (state) => {
    return {
        loginInfo: state.user.loginInfo.data,
        loggedIn: state.user.loginInfo.loggedIn,
        users: state.user.list.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userSignUpRequest: (user) => {
          return dispatch(userSignUpRequest(user));
        },
        userSignOutRequest: () => {
            return dispatch(userSignOutRequest());
        },
        getUsersRequest:() => {
            return dispatch(getUsersRequest());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);