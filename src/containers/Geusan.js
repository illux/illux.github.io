import React from 'react';
import { Image } from 'components';

class Geusan extends React.Component {
    
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
    
    }
    
    render() {
        return (
            <div className="row">
                <Image 
                    src="public/images/geusan/001.png"
                    title="황당마토"
                    content="토마토 사진에 영감을 얻어 15분만에 완성"
                    author="규산"
                    authorImg="public/images/geusan/001.png"
                    allMode={true}
                />
                <Image 
                    src="public/images/geusan/002.png"
                    title="나봉군"
                    content="한라봉을 먹으며 만든 캐릭터"
                    author="규산"
                    authorImg="public/images/geusan/001.png"
                    allMode={true}
                />
            </div>
        )
    }
}

export default Geusan;