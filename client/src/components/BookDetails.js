import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

class BookDetails extends Component {
  render() {
    const { book } = this.props.data;
    return (
      <div id="book-details">
        {book ? (
          <div>
            <h1>
              {book.name} by {book.author.name}
            </h1>
            <p>Genre: {book.genre}</p>
            <p>Other books by {book.author.name}:</p>
            <ul>
              {book.author.books.map(authorBook => (
                <li key={authorBook.id}>{authorBook.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No book selected</p>
        )}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: props => ({
    variables: {
      id: props.bookId
    }
  })
})(BookDetails);
