import React from 'react';

class ShareBallot extends React.Component {
    constructor(props) {
        super(props);
    }

    copyToClipboard() {
        this.refs['textarea'].select();
        document.execCommand("copy");
        if (document.selection) document.selection.empty();
        if (window.getSelection) window.getSelection().removeAllRanges();
    }

    render() {
        return (
            <div className="share-ballot">
                <p className="share-ballot__header">
                    Share this ballot
                </p>
                <div className="share-ballot__text-and-button" ref="btn-container">
                    <textarea className="share-ballot__text-area"
                                defaultValue={this.props.url}
                                ref="textarea" 
                                readOnly />
                    <button className="share-ballot__copy-button"
                            onClick={this.copyToClipboard.bind(this)}> 
                                C 
                    </button>
                </div>
            </div>
        );
    }
}

export default ShareBallot;