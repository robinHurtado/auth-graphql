import React, { Component } from 'react';

import Header from './Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header history={this.props.history} />
      </div>
    );
  }
}

export default App;
