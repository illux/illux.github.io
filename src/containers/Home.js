import React from 'react';
import { Image } from 'components';

class Home extends React.Component {
    
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
    
    }
    
    render() {
        return (
            <div className="row">
                <Image 
                    src="public/images/geusan/tomato.png"
                    title="황당마토"
                    content="토마토 사진에 영감을 얻어 15분만에 완성"
                    author="규산"
                    authorImg="public/images/geusan/tomato.png"
                    allMode={true}
                />
            </div>
        )
    }
}

export default Home;