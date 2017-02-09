import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import enhanceWithClickOutside from '../../../lib/components/enhance_with_click_outside';

import { signOut } from '../../../actions/authorization';
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
           signOut={this.props.signOut}
         />
       </div>
    );
  }
};

Account.propTypes = {
  username: React.PropTypes.string.isRequired,
  signOut: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    username: state.authorization.username
  };
}

function mapDispatchToProps (dispatch) {
  return {
    signOut: bindActionCreators(signOut, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(enhanceWithClickOutside(Account));

