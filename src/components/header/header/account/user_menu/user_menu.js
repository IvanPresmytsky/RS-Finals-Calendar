import classNames from 'classnames';
import React, { Component } from 'react';

import './user_menu.css';

export class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.onEditUserBtnClick = this.onEditUserBtnClick.bind(this);
    this.onDeleteUserBtnClick = this.onDeleteUserBtnClick.bind(this);
    this.onSignOutClick = this.onSignOutClick.bind(this);
  }

  onEditUserBtnClick (e) {
    console.log('edit user');
    e.preventDefault();
    
    this.props.editUser();
  }

  onSignOutClick (e) {
    e.preventDefault();
    this.props.signOut();
  }

  onDeleteUserBtnClick (e) {
    e.preventDefault();
    this.props.deleteUser();
  }

  render () {
    let popupClass = classNames('user-menu-popup', {
      ' popup-visible': this.props.expanded
    });

    return (
      <div className={popupClass}>
        <a 
          href="#" 
          className="user-menu__item user-menu__edit-user-btn" 
          onClick={this.onEditUserBtnClick}
        >
          edit user
        </a>
        <a 
          href="#" 
          className="user-menu__item user-menu__delete-user-btn"
          onClick={this.onDeleteUserBtnClick}
        >
          delete user
        </a>
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
  editUser: React.PropTypes.func.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  signOut: React.PropTypes.func.isRequired
}

export default UserMenu;
