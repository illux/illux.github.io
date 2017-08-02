import React from 'react';


// List에 들어가는 Image 하나를 만듦

class Image extends React.Component {
    
    constructor(props){
        super(props);
    }
    
    
    render() {
        return (
            <div className="col s12 m4 l3">
            </div>
        );
    }
}

Image.propTypes = {
   
}

Image.defaultProps = {
   
}

export default Image;