import React, { Component } from "react";
import BookList from "./components/BookList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
// import logo from './logo.svg';
// import './App.css';

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <h1>Book List</h1>
            <BookList />
          </header>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
