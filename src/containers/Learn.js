import React from 'react';
import {Paper} from 'material-ui';

class Learn extends React.Component {
    
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
    
    }
    
    render() {
        const style = {
          height: "100%",
          width: "100%",
          margin: 20,
          textAlign: 'center',
          display: 'inline-block',
        };
        return (
            <div className="container">
                <div className="row center">
                    <Paper style={style} zDepth={2} className="hanna">
                        <h1>일러스트를 배우고 싶나요?<br/> ILLUX의 멤버가 되어보세요</h1>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default Learn;