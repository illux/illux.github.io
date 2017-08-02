import React from 'react';
import { Image } from 'components';

class Chayeoi extends React.Component {
    
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
    
    }
    
    render() {
        return (
            <div className="row">
                <Image 
                    src="public/images/chayeoi/001.png"
                    title="김찬연 캐릭터"
                    content="여자친구 어릴적 사진을 보고 그림"
                    author="찬연"
                    authorImg="public/images/chayeoi/001.png"
                    allMode={true}
                />
                <Image 
                    src="public/images/chayeoi/002.png"
                    title="루리리"
                    content="킹왕짱 귀요미 루리리를 그렸습니다."
                    author="찬연"
                    authorImg="public/images/chayeoi/001.png"
                    allMode={true}
                />
            </div>
        )
    }
}

export default Chayeoi;