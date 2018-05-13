import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

class Header extends Component {

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
          <li><a onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
        </div>
      );
    } else {
      return(
        <div>
          <li>
            <a onClick={() =>  this.props.history.push('/signup')}>Signup</a>
          </li>
          <li>
            <a onClick={() => this.props.history.push('/login')}>Login</a>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a
            className="brand-logo left"
            style={{cursor: 'pointer'}}
            onClick={() => this.props.history.push('/')}
          >
            Home
          </a>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

// graphql just recive one thing by time so that is why
export default graphql(mutation)(
  graphql(query)(Header)
);
