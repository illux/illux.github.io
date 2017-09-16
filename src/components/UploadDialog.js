import React from 'react';
import { Image } from 'components';
import Dropzone from 'react-dropzone';
import {Dialog, FlatButton, TextField, RaisedButton, CircularProgress, FontIcon} from 'material-ui';
import {connect} from 'react-redux';
import {
    uploadArtRequest,
    initArt
} from 'actions/art';
class UploadDialog extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            title:"",
            owner: "",
            description: "",
            files:[],
            imageUri:""
        }
        
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        
    }
    
    componentDidUpdate(){
        console.log("cdu",this.props.post.status);
        if (this.props.post.status === "SUCCESS"){
            this.handleCancel()
            this.props.initArt();
            this.props.onResult(true);
        } else if (this.props.post.status === "FAILURE"){
            this.props.onResult(false);
        }
    }
    
    onDrop(files){
        let reader = new FileReader();
        reader.onloadend = () => {
                this.setState({
                files: files,
                imageUri: reader.result
            });
        }
        reader.readAsDataURL(files[0]);
    }
    
    initialize(func){
        this.setState({
            title:"",
            owner: "",
            description: "",
            files:[],
            imageUri:""
        }, () => {
            func();
            // console.log("initialize!!");
        })
    }
    
    handleCancel(){
        this.initialize(this.props.cancel)
    }
    
    deleteImage(){
        this.setState({
            files:[],
            imageUri: ""
        })
    }
    
    uploadArt(){
        if(this.state.title === "" 
        || this.state.description === ""
        || this.state.files < 1
        || this.state.imageUri === ""){
           alert("내용을 채워주세요 ") 
       
        }
        else if(this.props.loginInfo.privilege < 2){
            alert("권한이 없어요! 관리자에게 문의하세요>.<");
            this.initialize(this.props.cancel);
        } else {
            var owner ={}
            if(this.props.mode === "admin"){
                owner = {
                    uid: this.props.semiUser.uid,
                    name: this.props.semiUser.name,
                    img: this.props.semiUser.img
                }   
            } else {
                owner = {
                    uid: this.props.loginInfo.uid,
                    name: this.props.loginInfo.name,
                    img: this.props.loginInfo.img
                };    
            }
            this.props.uploadArtRequest(
                    owner, this.state.title, this.state.description, this.state.files
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
    
    render() {
        const actions = [
            <FlatButton label="upload" onClick={this.uploadArt.bind(this)}/>,
            <FlatButton label="cancel" onClick={this.handleCancel.bind(this)}/>
            ];
        // console.log("r",this.props.post.status)
        return (
            <Dialog
                className={this.props.className}
                title="업로드하기"
                actions={this.props.post.status === "WAITING" ? [] : actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.cancel}
                autoScrollBodyContent={true}
            >
                {this.props.post.status === "WAITING" ? 
                <CircularProgress className="center" size={80} thickness={7} />
                : 
                <div className="row">
                    <div style={{width:"100%", height:"200px"}}>
                        {this.state.imageUri === "" && this.state.files.length < 1 ? 
                            <Dropzone accept="image/jpeg, image/png, image/gif" onDrop={this.onDrop.bind(this)} style={{height:"100%",width:"100%",border:"3px dotted black"}}>
                                <p style={{textAlign:"center"}}>여기를 누르거나 이미지를 드래그 해주세요</p>
                                <p style={{textAlign:"center"}}><FontIcon className="material-icons">insert_photo</FontIcon><br/> .jpeg, .png, .gif 형식만 지원합니다.</p>
                            </Dropzone>    
                            :
                            <div style={{position:"relative", margin:"auto", width:"200px"}}>
                            <img src={this.state.imageUri} width="200px" height="200px" style={{position:"relative"}}/>    
                            <RaisedButton label="이미지 삭제" secondary={true} onTouchTap={this.deleteImage.bind(this)} style={{position:"absolute", left:0,top:0}} />
                            </div>
                        }
                    </div>
                   
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
                        fullWidth={true}
                    />
                </div>
                    
                }
                
            </Dialog>
        )
    }
}

UploadDialog.propTypes ={
    open: React.PropTypes.bool,
    cancel: React.PropTypes.func
}

UploadDialog.defaultProps = {
    open: false,
    cancel: () => {console.log("cancel!! not defined")}
}

const mapStateToProps = (state) => {
    return {
        loginInfo: state.user.loginInfo.data,
        post: state.art.post
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadArtRequest: (owner, title, description, files) => {
            return dispatch(uploadArtRequest(owner, title, description, files));
        },
        initArt: () => {
            return dispatch(initArt());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(UploadDialog);