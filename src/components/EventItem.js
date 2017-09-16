import React from 'react';
import {Paper, Divider} from 'material-ui';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class EventItem extends React.Component {
    
    constructor(props){
        super(props);
        
    }
    
    changeDateFormat(date){
        var year = date.getFullYear();
    	var month = (1 + date.getMonth());
    	month = month >= 10 ? month : '0' + month;
    	var day = date.getDate();         
    	day = day >= 10 ? day : '0' + day;
    	return  year + '-' + month + '-' + day;
    }
    
    render() {
        const date = new Date(this.props.date);
        
        return (
            <div className={this.props.className} >
                <Card zDepth={2} style={{margin:"3px"}}>
                    <CardHeader
                      title={this.props.owner.name}
                      subtitle={"작성자"}
                      avatar={this.props.owner.img}
                    />
                    <CardTitle title={this.props.title} subtitle={this.changeDateFormat(date)} />
                    <CardText>
                      {this.props.description}
                    </CardText>
                    <Divider />
                    <CardActions>
                      <a href={this.props.url} target="_blank">LINK</a>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default EventItem;