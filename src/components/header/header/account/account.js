import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import enhanceWithClickOutside from '../../../../lib/components/enhance_with_click_outside';

import { openEditUserForm } from '../../../popups/edit_user_form/edit_user_form_actions.js';
import { openDeleteUserPopup } from '../../../popups/delete_user_popup/delete_user_popup_actions';
import { signOut } from '../../../../actions/authorization';
import UserMenu from './user_menu/user_menu';

import './account.css';

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.onAccountBtnClick = this.onAccountBtnClick.bind(this);
    this.onAccountClick = this.onAccountClick.bind(this);
  }

  onAccountBtnClick(e) {
    e.preventDefault();
    this.setState({ expanded: true });
  }

  onAccountClick(e) {
    e.preventDefault();
    if (e.target.dataset.name === 'account-btn') return;
    this.setState({ expanded: false });
  }

  handleClickOutside(e) {
    this.setState({ expanded: false });
  }

  render () {
    let username = this.props.username;
    return (
       <div className="account"  onClick={this.onAccountClick}>
         <a href="#" className="account-btn" data-name="account-btn" onClick={this.onAccountBtnClick}>{username}</a>
         <UserMenu 
           expanded={this.state.expanded}
           editUser={this.props.openEditUserForm}
           deleteUser={this.props.openDeleteUserPopup}
           signOut={this.props.signOut}
         />
       </div>
    );
  }
};

Account.propTypes = {
  username: React.PropTypes.string.isRequired,
  openEditUserForm: React.PropTypes.func.isRequired,
  openDeleteUserPopup: React.PropTypes.func.isRequired,
  signOut: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    username: state.authorization.username
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openEditUserForm: bindActionCreators(openEditUserForm, dispatch),
    signOut: bindActionCreators(signOut, dispatch),
    openDeleteUserPopup: bindActionCreators(openDeleteUserPopup, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(enhanceWithClickOutside(Account));

