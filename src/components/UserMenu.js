import classNames from 'classnames';
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeUserMenu, openEditUserForm } from '../actions/popups.js';

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

  render () {
    let popupClass = classNames('user-menu-popup', {
      ' popup-visible': this.props.visibility
    });

    return (
      <div className={popupClass}>
        <a 
          href="#" 
          className="user-menu__item" 
          onClick={this.onEditUserClick.bind(this)}
        >
          edit user
        </a>
        <a 
          href="#" 
          className="user-menu__item"
        >
          delete user
        </a>
        <a 
          href="#" 
          className="user-menu__item"
        >
          sign out
        </a>
        <a 
          href="#" 
          className="user-menu__item" 
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
}

function mapStateToProps (state) {
  return {
    visibility: state.popups.userMenuVisibility
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeUserMenu: bindActionCreators(closeUserMenu, dispatch),
    openEditUserForm: bindActionCreators(openEditUserForm, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
