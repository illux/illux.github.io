import React from 'react';
import { Image } from 'components';
import Dropzone from 'react-dropzone';

class Upload extends React.Component {
    
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
        
    }
    
    render() {
        return (
            <div className="row">
                <TextField
                    hintText="제목을 입력하세요"
                    floatingLabelText="title"
                    onChange={(e) => this.handleTitleChange.bind(e)}
                />
                
                
            </div>
        )
    }
}

export default Upload;