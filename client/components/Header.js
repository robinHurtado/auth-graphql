import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router';

import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

class Header extends Component {
  constructor(){
    super();
    this.state = {
      home: false,
      signup: false,
      login: false
    }
  }

  onLogoutClick(){
    this.props.mutate({
      refetchQueries: [{ query }]
    });
  }


  renderButtons(){
    const { loading, user } = this.props.data;

    if(loading){
      return <div />;
    }

    if (user) {
      return(
        <div>
          <li><a onClick={() => this.onLogoutClick.bind(this)}>Logout</a></li>
        </div>
      );
    } else {
      return(
        <div>
          <li>
            <a onClick={() => this.redirect('signup')}>Signup</a>
          </li>
          <li>
            <a onClick={() => this.redirect('login')}>Login</a>
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
          <a
            className="brand-logo left"
            style={{cursor: 'pointer'}}
            onClick={() => this.redirect('home')}
          >
            Home
          </a>
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

// graphql just recive one thing by time so that is why
export default graphql(mutation)(
  graphql(query)(Header)
);
