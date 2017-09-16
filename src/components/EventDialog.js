import React from 'react';
import {Dialog, FlatButton, TextField, RaisedButton, CircularProgress, FontIcon} from 'material-ui';
import {connect} from 'react-redux';
import {
    uploadBoardRequest,
    initBoard
} from 'actions/board';

class EventDialog extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            title:"",
            description: "",
            url:"",
        }
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }
    
    componentDidUpdate(){
        // console.log("cdu",this.props.post.status);
        if (this.props.post.status === "SUCCESS"){
            this.initialize(this.props.cancel);
            this.props.initBoard();
            this.props.onResult(true);
        } else if (this.props.post.status === "FAILURE"){
            this.props.onResult(false);
        }
    }
    
   
    initialize(func){
        this.setState({
            title:"",
            description: "",
            url:""
        }, () => {
            func();
            // console.log("initialize!!");
        })
    }
    
    handleCancel(){
        this.initialize(this.props.cancel)
    }
    
    upload(){
        if(this.state.title === "" 
        || this.state.description === ""){
           alert("내용을 채워주세요 ") 
       
        }
        else if(this.props.loginInfo.privilege < 5){
            alert("권한이 없어요! 관리자에게 문의하세요>.<");
            this.initialize(this.props.cancel);
        } else {
            const owner = {
                uid: this.props.loginInfo.uid,
                name: this.props.loginInfo.name,
                img: this.props.loginInfo.img
            };
            this.props.uploadBoardRequest(
                    owner, this.state.title, this.state.description, this.state.url
                )
        }
    }
    
    handleTitleChange(e,v){
        this.setState({
            title: v
        })
    }
    
    handleDescriptionChange(e,v){
        this.setState({
            description: v
        })
    }
    
    handleLinkChange(e,v){
        this.setState({
            url: v
        })
    }
    
    render() {
        const actions = [
            <FlatButton label="write" onClick={this.upload.bind(this)}/>,
            <FlatButton label="cancel" onClick={this.handleCancel.bind(this)}/>
            ];
        // console.log("r",this.props.post.status)
        return (
            <Dialog
                title="이벤트 작성하기"
                actions={this.props.post.status === "WAITING" ? [] : actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.cancel}
            >
                {this.props.post.status === "WAITING" ? 
                <CircularProgress className="center" size={80} thickness={7} />
                : 
                <div className="row">
                    <TextField 
                        hintText="제목을 입력하세요"
                        floatingLabelText="TITLE"
                        value={this.state.title}
                        onChange={(e, v) => this.handleTitleChange(e,v)}
                        fullWidth={true}
                    />
                    <TextField 
                        hintText="내용을 입력하세요"
                        floatingLabelText="DESCRIPTION"
                        value={this.state.description}
                        onChange={(e, v) => this.handleDescriptionChange(e,v)}
                        multiLine={true}
                        rowsMax={4}
                        rows={2}
                        fullWidth={true}
                    />
                    <TextField 
                        hintText="링크를 입력하세요"
                        floatingLabelText="LINK"
                        type="email"
                        value={this.state.url}
                        onChange={(e, v) => this.handleLinkChange(e,v)}
                        fullWidth={true}
                    />
                </div>
                    
                }
                
            </Dialog>
        )
    }
}

EventDialog.propTypes ={
    open: React.PropTypes.bool,
    cancel: React.PropTypes.func
}

EventDialog.defaultProps = {
    open: false,
    cancel: () => {console.log("cancel!! not defined")}
}

const mapStateToProps = (state) => {
    return {
        loginInfo: state.user.loginInfo.data,
        post: state.board.post
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadBoardRequest: (owner, title, description, url) => {
            return dispatch(uploadBoardRequest(owner, title, description, url));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EventDialog);