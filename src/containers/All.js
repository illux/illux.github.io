import React from 'react';
import { Image } from 'components';
import * as firebase from 'firebase';
import {connect} from 'react-redux';
import {
    getArtListRequest
} from 'actions/art'
class All extends React.Component {
    
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
        this.props.getArtListRequest();
    }
    
    render() {
        
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
                {artList}
                <Image 
                    src="public/images/jiyun/005.png"
                    title="지구 달 토끼"
                    content="지구를 보고 있는 달토끼"
                    author="지윤"
                    authorImg="public/images/geusan/001.png"
                    allMode={true}
                />
                <Image 
                    src="public/images/gamrom/004.png"
                    title="소행성이 떨어진다."
                    content="소행성이 떨어지는 모습으로 엽서 뒷면"
                    author="감롬"
                    authorImg="public/images/geusan/001.png"
                    allMode={true}
                />
                <Image 
                    src="public/images/gamrom/003.png"
                    title="감롬이 떨어진다"
                    content="감롬이 떨어진다."
                    author="감롬"
                    authorImg="public/images/geusan/001.png"
                    allMode={true}
                />
                <Image 
                    src="public/images/chayeoi/004.png"
                    title="태양 포켓몬"
                    content="포켓몬을 그린건가"
                    author="찬연"
                    authorImg="public/images/geusan/001.png"
                    allMode={true}
                />
                
                <Image 
                    src="public/images/geusan/005.png"
                    title="토성이빨"
                    content="하늘로 던진 이빨이 토성이 되었다"
                    author="규산"
                    authorImg="public/images/geusan/001.png"
                    allMode={true}
                />
                <Image 
                    src="public/images/geusan/004.png"
                    title="토성레고"
                    content="토성을 떠올리며 만듦"
                    author="규산"
                    authorImg="public/images/geusan/001.png"
                    allMode={true}
                />
                
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
                <Image 
                    src="public/images/jiyun/001.png"
                    title="맥날이"
                    content="웃고있는 맥날이"
                    author="지윤"
                    authorImg="public/images/jiyun/001.png"
                    allMode={true}
                />
                <Image 
                    src="public/images/jiyun/002.png"
                    title="맥날이"
                    content="메롱하는 맥날이"
                    author="지윤"
                    authorImg="public/images/jiyun/001.png"
                    allMode={true}
                />
                <Image 
                    src="public/images/jiyun/003.png"
                    title="파이리"
                    content="지쳐쓰러진 파이리"
                    author="지윤"
                    authorImg="public/images/jiyun/001.png"
                    allMode={true}
                />
                <Image 
                    src="public/images/geusan/003.png"
                    title="메뉴판"
                    content="메뉴판"
                    author="규산"
                    authorImg="public/images/geusan/001.png"
                    allMode={true}
                />
                <Image 
                    src="public/images/chayeoi/003.png"
                    title="시계"
                    content="시계 광고"
                    author="찬연"
                    authorImg="public/images/chayeoi/001.png"
                    allMode={true}
                />
                <Image 
                    src="public/images/gamrom/002.png"
                    title="감롬의 레시피"
                    content="감롬의 레시피"
                    author="감롬"
                    authorImg="public/images/gamrom/001.png"
                    allMode={true}
                />
                <Image 
                    src="public/images/jiyun/004.png"
                    title="야채가게"
                    content="야채가게"
                    author="지윤"
                    authorImg="public/images/jiyun/001.png"
                    allMode={true}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        artList: state.art.list.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getArtListRequest: () => {
          return dispatch(getArtListRequest());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(All);