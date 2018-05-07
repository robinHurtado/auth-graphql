import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client'; // interacts with the backend
import { ApolloProvider } from 'react-apollo'; // glue layer between apollo and react
import { Router, Route, IndexRoute } from 'react-router';
import  createBrowserHistory  from 'history/createBrowserHistory';

import App from './components/App';

const history = createBrowserHistory();

// check the apollo api docs to understand this
const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <Route path="/" component={App}>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
