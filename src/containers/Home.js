import React from 'react';
import {Paper} from 'material-ui';

class Home extends React.Component {
    
    constructor(props){
        super(props);
        
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
                        <h1>어서오세요<br/> 일러스트 스터디 입니다.</h1>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default Home;