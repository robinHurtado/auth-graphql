import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client'; // interacts with the backend
import { ApolloProvider } from 'react-apollo'; // glue layer between apollo and react
import { Router, Route, IndexRoute } from 'react-router';
import  createBrowserHistory  from 'history/createBrowserHistory';

import App from './components/App';

const history = createBrowserHistory();
console.log(history)
const client = new ApolloClient({
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
