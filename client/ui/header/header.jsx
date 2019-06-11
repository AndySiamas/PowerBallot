import React from 'react';
import Icons from '../utilities/icons.jsx';

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
                <img src={Icons.LOGO} className="header__logo" alt="Power Ballot Logo" />
            </div>
        );
    }
}

export default Header;