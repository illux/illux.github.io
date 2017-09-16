import React from 'react';
import {Paper} from 'material-ui';
import {connect} from 'react-redux';
import {Image} from 'components';
import {
    getUserArtRequest
} from 'actions/art';
class Member extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            curr: props.params.what
        }

    }
    
    componentDidMount(){
        this.props.getUserArtRequest(this.props.params.what);
    }
    
    componentDidUpdate(){
        if(this.state.curr !== this.props.params.what){
            this.setState({
                curr: this.props.params.what
            },() => {
                this.componentDidMount();
            })
        }
    }
   
    render() {
        const style = {
          height: "100%",
          width: "auto",
          margin: 20,
          textAlign: 'center',
          display: 'inline-block',
        };
        
        const artList = this.props.artList.map((item, i) => 
            <Image 
                key={i}
                src={item.img}
                title={item.title}
                content={item.description}
                author={item.owner.name}
                authorImg={item.owner.img}
                created={item.created}
                allMode={true}
            />
        )
        
        return (
            <div className="row">
                {this.props.artList.length > 0 ? 
                artList
                    :
                    <Paper style={style}
                        zDepth={3}>
                        <p>아직 내용이 없습니다</p>
                    </Paper>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        artList: state.art.userlist.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserArtRequest: (uid) => {
          return dispatch(getUserArtRequest(uid));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Member);