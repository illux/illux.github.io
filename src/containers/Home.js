import React from 'react';
import { Image } from 'containers';

class Home extends React.Component {
    
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
    
    }
    
    render() {
        return (
            <div>
                <Image 
                    src="/images/geusan/tomato.png"
                    title="황당마토"
                    content="토마토 사진에 영감을 얻어 15분만에 완성"
                    author="규산"
                    authorImg="/images/geusan/tomato.png"
                />
            </div>
        )
    }
    
    /*
     src: React.PropTypes.string.isRequired,
   title: React.PropTypes.string.isRequired,
   content: React.PropTypes.string.isRequired,
   author: React.PropTypes.string,
   authorImg: React.PropTypes.string,
   allMode:
    */
}

export default Home;