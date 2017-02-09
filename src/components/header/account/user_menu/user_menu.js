import classNames from 'classnames';
import React, { Component } from 'react';
import { Link } from 'react-router';

import './user_menu.css';

export class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.onSignOutClick = this.onSignOutClick.bind(this);
  }

  onSignOutClick (e) {
    e.preventDefault();
    this.props.signOut();
  }

  render () {
    let popupClass = classNames('user-menu-popup', {
      ' popup-visible': this.props.expanded
    });

    return (
      <div className={popupClass}>
        <Link 
          to={{pathname: "/settings"}}
          className="user-menu__item user-menu__settings-btn" 
        >
          settings
        </Link>
        <a 
          href="#" 
          className="user-menu__item user-menu__sign-out-btn"
          onClick={this.onSignOutClick}
        >
          sign out
        </a>
      </div>
    );
  }
}

UserMenu.propTypes = {
  expanded: React.PropTypes.bool.isRequired,
  signOut: React.PropTypes.func.isRequired
}

export default UserMenu;
