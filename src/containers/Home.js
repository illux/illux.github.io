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
                    src="public/images/geusan/001.png"
                    title="황당마토"
                    content="토마토 사진에 영감을 얻어 15분만에 완성"
                    author="규산"
                    authorImg="public/images/geusan/001.png"
                    allMode={true}
                />
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
                <Image 
                    src="public/images/gamrom/001.png"
                    title="감롬이"
                    content="감롬의 시그니쳐 캐릭터"
                    author="감롬"
                    authorImg="public/images/gamrom/001.png"
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

export default Home;