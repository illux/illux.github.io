import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {ListItem, List} from 'material-ui/List';
import {MenuItem, Avatar, Divider, Dialog, FlatButton} from 'material-ui';

// List에 들어가는 Image 하나를 만듦

class Image extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            hovered: false,
            dialog: false
        }
     
    }
    
    changeDateFormat(date){
        var year = date.getFullYear();
    	var month = (1 + date.getMonth());
    	month = month >= 10 ? month : '0' + month;
    	var day = date.getDate();         
    	day = day >= 10 ? day : '0' + day;
    	return  year + '-' + month + '-' + day;
    }
    
    handleMouseEnter(){
        this.setState({
            hovered:true
        })
    }
    
    handleMouseOut(){
        this.setState({
            hovered:false
        })
    }
    
    handleDialog(dialog){
        this.setState({
            dialog: dialog
        })
    }
    
    render() {
      
        const imgStyle={
            backgroundImage:"url("+this.props.src+")", 
            backgroundRepeat:"no-repeat",
            backgroundSize:"100%",
            backgroundPosition:"center", 
            backgroundBlendMode:"color-dodge",
            backgroundAttachment:"local"
        }
       
        return (
            <div className="col s12 m6 l4 xl3 hanna" style={{padding:0,minHeight:"450px",maxHeight:"450px"}}>
                <Card 
                    onMouseEnter={this.handleMouseEnter.bind(this)} 
                    onMouseLeave={this.handleMouseOut.bind(this)} 
                    zDepth={this.state.hovered ? 3 : 1} 
                    style={{margin:"5px", borderRadius:"7px"}}>
                    <List className="cyan lighten-5"> 
                        <ListItem 
                        style={{color:"black", fontFamily:"BM HANNA", fontSize:"1.8em", margin:"5px"}}
                        leftAvatar={<Avatar src={this.props.authorImg} size={40} />}
                        primaryText={this.props.author} 
                        disabled={true}
                        />
                    </List>
                  
                    <Divider />
                    <CardMedia className="center" style={{height:"200px"}}>
                        <a href="#!" onClick={this.handleDialog.bind(this, true)}>
                            <img style={{margin:"auto",width:"auto", height:"200px", maxHeight:"100%", maxWidth:"100%",minWidth:"auto"}} src={this.props.src} alt={this.props.title} />
                        </a>
                    </CardMedia>
                    <Divider />
                    <CardTitle 
                        title={this.props.title}
                        subtitle={this.changeDateFormat(new Date(this.props.created))}
                    />
                    <CardText>
                        {this.props.content}
                    </CardText>
                </Card>
                <Dialog 
                    title={<div className="row">
                                <span className="left hanna">{this.props.title}</span>
                                <FlatButton label="X" className="right" onTouchTap={this.handleDialog.bind(this, false)}/>
                            </div>}
                    modal={false}
                    open={this.state.dialog}
                    autoScrollBodyContent={true}
                    onRequestClose={this.handleDialog.bind(this, false)}
                >
                    <img width="100%" src={this.props.src} alt={this.props.title} />
                </Dialog>
            </div>
        );
    }
}

Image.propTypes = {
   src: React.PropTypes.string.isRequired,
   title: React.PropTypes.string.isRequired,
   content: React.PropTypes.string.isRequired,
   author: React.PropTypes.string,
   authorImg: React.PropTypes.string,
   allMode: React.PropTypes.bool
}

Image.defaultProps = {
   allMode: false
}

export default Image;