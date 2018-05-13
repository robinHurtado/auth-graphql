import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router';

import query from '../queries/CurrentUser';

class Header extends Component {
  constructor(){
    super();
    this.state = {
      home: false,
      signup: false,
      login: false
    }
  }

  renderButtons(){
    const { loading, user } = this.props.data;

    if(loading){
      return <div />;
    }

    if (user) {
      return <div>Logout</div>;
    } else {
      return(
        <div>
          <li>
            <span style={{cursor: 'pointer'}} onClick={() => this.redirect('signup')}>Signup-</span>
          </li>
          <li>
            <span style={{cursor: 'pointer'}} onClick={() => this.redirect('login')}>Login</span>
          </li>
        </div>
      );
    }
  }

  redirect(page){
    this.setState({[page]: true});
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <span
            className="brand-logo left"
            style={{cursor: 'pointer'}}
            onClick={() => this.redirect('home')}
          >
            Home
          </span>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
        {this.state.home && (<Redirect to="/" push />)}
        {this.state.signup && (<Redirect to="/signup" push />)}
        {this.state.login && (<Redirect to="/login" push />)}
      </nav>
    );
  }
}

export default graphql(query)(Header);
