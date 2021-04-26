import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/ApolloClient';
import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);