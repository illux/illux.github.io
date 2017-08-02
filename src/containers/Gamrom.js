import React from 'react';
import { Image } from 'components';

class Gamrom extends React.Component {
    
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
    
    }
    
    render() {
        return (
            <div className="row">
                <Image 
                    src="public/images/gamrom/001.png"
                    title="감롬이"
                    content="감롬의 시그니쳐 캐릭터"
                    author="감롬"
                    authorImg="public/images/gamrom/001.png"
                    allMode={true}
                />
            </div>
        )
    }
}

export default Gamrom;