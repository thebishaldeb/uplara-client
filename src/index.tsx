import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "apollo-link-ws";
import { BrowserRouter } from "react-router-dom";
require('dotenv').config()

const url: any = process.env.REACT_APP_URL;

const getToken = () => localStorage.getItem('auth_token')

const webLink: any = new WebSocketLink({
  uri: `wss://${url}`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: getToken()? {
         Authorization: `Bearer ${getToken()}`,
      }
      : {
        "x-hasura-role": "anonymous"
      }
    }
  },
});

const client = new ApolloClient({
  link: webLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
