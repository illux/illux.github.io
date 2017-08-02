import React from 'react';


// List에 들어가는 Image 하나를 만듦

class Image extends React.Component {
    
    constructor(props){
        super(props);
    }
    render() {
        const author = (
                <div className="card-action">
                    <div className="chip">
                        <img src={this.props.authorImg} alt={this.props.author} />
                    </div>
                </div>
            )
        
        return (
            <div className="col s12 m4 l3">
                <div className="card hoverable">
                    <div className="card-image">
                        <img src={this.props.src} />
                        <span className="card-title gray-text">{this.props.title}</span>
                    </div>
                    <div className="card-content">
                        <p>{this.props.content}</p>
                    </div>
                    { this.props.allMode ? author : "" }
                </div>
            </div>
        );
    }
}

Image.propTypes = {
   src: React.PropTypes.string.isRequired,
   title: React.PropTypes.string.isRequired,
   content: React.PropTypes.string.isRequired,
   author: React.PropTypes.string,
   authorImg: React.PropTypes.string,
   allMode: React.PropTypes.bool
}

Image.defaultProps = {
   allMode: false
}

export default Image;