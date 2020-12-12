import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import GraphqlProvider from './components/GraphQlProvider/GraphqlProvider';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <ErrorBoundary>
      <GraphqlProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </GraphqlProvider>
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById('root')
);
