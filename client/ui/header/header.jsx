import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <h1 className="header__text">
                    Power Ballot
                </h1>
            </div>
        );
    }
}

export default Header;