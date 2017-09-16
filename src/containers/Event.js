import React from 'react';
import { EventItem, EventDialog } from 'components';
import {Snackbar, FontIcon, RaisedButton, FloatingActionButton, Paper} from 'material-ui';
import {Toolbar, ToolbarGroup, ToolbarSeparator,ToolbarTitle} from 'material-ui/Toolbar';
import {connect} from 'react-redux';
import {
    getBoardListRequest
} from 'actions/board';
class Event extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            dialog: false,
            snack: false,
            snackMsg: ""
        }
    }
    
    componentDidMount(){
        this.props.getBoardListRequest();
    }
    
    handleOpenDialog(){
        this.setState({
            dialog: true
        });
    }
    
    handleCloseDialog(){
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
    }
    
    render() {

        const boardList = this.props.boardList.map((item, i) => 
            <EventItem
                key={i}
                className="col s12 m6 l4 xl3"
                idx={this.props.boardList.length - i}
                title={item.title}
                owner={item.owner}
                description={item.description}
                url={item.url}
                date={item.created}
            />
        )

        return (
            <div className="container" style={{marginTop:"30px", marginBottom:"30px"}}>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <ToolbarTitle className="grey-text text-darken-3" style={{marginLeft:"15px"}} text="이벤트" />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarTitle text="Options" />
                        <FontIcon className="material-icons">dashboard</FontIcon>
                        <FontIcon className="material-icons">view_headline</FontIcon>
                        <ToolbarSeparator />
                        <RaisedButton label="refresh" primary={true}/>
                    </ToolbarGroup>
                </Toolbar>
                
                <div className="row" style={{margin:"15px"}}>
                    <Paper className="col s12" style={{marginBottom:"30px"}} zDepth={2}>
                        <h5>이 곳은 과제(?)에 대해서 정보를 공유하는 곳 입니다. 어떻게 글을 올리는지는 비밀입니다.</h5>
                    </Paper>
                    
                    {boardList}
                </div>
                {this.props.loggedIn && this.props.loginInfo.privilege > 3 ?
                <FloatingActionButton onClick={this.handleOpenDialog.bind(this)} style={{position:"absolute", bottom:0,right:0, marginRight:"30px",marginBottom:"40px"}}>
                    <FontIcon className="material-icons">add</FontIcon>
                </FloatingActionButton>
                :
                ""}
                <EventDialog 
                    open={this.state.dialog}
                    onResult={this.onResult.bind(this)}
                    cancel={this.handleCloseDialog.bind(this)}
                />
                <Snackbar 
                    open={this.state.snack}
                    message={this.state.snackMsg}
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
        boardList: state.board.list.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBoardListRequest:() => {
            dispatch(getBoardListRequest());
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Event);