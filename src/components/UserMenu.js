import classNames from 'classnames';
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeUserMenu, openEditUserForm, openDeleteUserPopup } from '../actions/popups.js';
import { signOut } from '../actions/authorization.js';

import '../stylesheets/components/userMenu.css';

export class UserMenu extends Component {
  onBtnCloseClick (e) {
    e.preventDefault();
    this.props.closeUserMenu();
  }

  onEditUserClick (e) {
    e.preventDefault();
    this.props.openEditUserForm();
    this.props.closeUserMenu();
  }

  onSignOutClick (e) {
    e.preventDefault();
    this.props.signOut();
    this.props.closeUserMenu();
  }

  onDeleteUserClick (e) {
    e.preventDefault();
    this.props.openDeleteUserPopup();
    this.props.closeUserMenu();
  }

  render () {
    let popupClass = classNames('user-menu-popup', {
      ' popup-visible': this.props.visibility
    });

    return (
      <div className={popupClass}>
        <a 
          href="#" 
          className="user-menu__item user-menu__edit-user-btn" 
          onClick={this.onEditUserClick.bind(this)}
        >
          edit user
        </a>
        <a 
          href="#" 
          className="user-menu__item user-menu__delete-user-btn"
          onClick={this.onDeleteUserClick.bind(this)}
        >
          delete user
        </a>
        <a 
          href="#" 
          className="user-menu__item user-menu__sign-out-btn"
          onClick={this.onSignOutClick.bind(this)}
        >
          sign out
        </a>
        <a 
          href="#" 
          className="user-menu__item user-menu__close-btn" 
          onClick={this.onBtnCloseClick.bind(this)}
        >
          close
        </a>
      </div>
    );
  }
}

UserMenu.propTypes = {
  visibility: React.PropTypes.bool.isRequired,
  closeUserMenu: React.PropTypes.func.isRequired,
  openEditUserForm: React.PropTypes.func.isRequired,
  openDeleteUserPopup: React.PropTypes.func.isRequired,
  signOut: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    visibility: state.popups.userMenuVisibility
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeUserMenu: bindActionCreators(closeUserMenu, dispatch),
    openEditUserForm: bindActionCreators(openEditUserForm, dispatch),
    openDeleteUserPopup: bindActionCreators(openDeleteUserPopup, dispatch),
    signOut: bindActionCreators(signOut, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
