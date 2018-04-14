import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const PrivateHeader = (props) => {
  const navImgSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';
  return (
    <div className="header">
      <div className="header__content">
        <img className="header__nav-toggle" onClick={props.handleNavToggle} src={navImgSrc} alt="menu bars" />
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => props.handleLougout()}>Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  handleLougout: React.PropTypes.func.isRequired,
  handleNavToggle: React.PropTypes.func.isRequired,
  isNavOpen: React.PropTypes.bool.isRequired
};

export default createContainer(() => {
  return {
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    handleLougout: () => Accounts.logout(),
    isNavOpen: Session.get('isNavOpen')
  };
}, PrivateHeader);

