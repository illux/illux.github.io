import React from 'react';
import {connect} from "react-redux";
import {Snackbar, Avatar} from 'material-ui';
import {List, ListItem} from 'material-ui/List';
import {UploadDialog} from 'components';
import {
    getUsersRequest
} from 'actions/user';

class Admin extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            currentUser: "",
            dialog: false,
            snack: false,
            snackMsg: ""
        }
        
    }
    componentDidMount(){
        this.props.getUsersRequest();
    }
    
    handleOpenUpload(user){
        this.setState({
            dialog: true,
            currentUser: user
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
        
        this.handleRequestClose();
    }
    
    render() {
        
        const listItems = this.props.users.map((item, i) =>
            <ListItem key={i} 
                primaryText={item.name}
                leftAvatar={<Avatar src={item.img} />}
                onClick={this.handleOpenUpload.bind(this, item)}
                />
        )
        return (
            <div>
                <h2>ADMIN</h2>
                <p>유저 선택</p>
                <List>
                    {listItems}
                </List>
                {console.log(this.props.loginInfo.privilege)}
                {this.props.loginInfo.privilege>7 ?
                <UploadDialog 
                    lassName={"notosans"}
                    mode={"admin"}
                    semiUser={this.state.currentUser}
                    open={this.state.dialog}
                    onResult={this.onResult.bind(this)}
                    cancel={this.handleCloseUpload.bind(this)}
                />: <p>관리자 권한이 없습니다.</p>}
                <Snackbar 
                    open={this.state.snack}
                    message={this.state.snackMsg}
                    action="확인"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose.bind(this)}
                />
                
            </div>
        )
    }
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
        getUsersRequest:() => {
            return dispatch(getUsersRequest());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Admin);