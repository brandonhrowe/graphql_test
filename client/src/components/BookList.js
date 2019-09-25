import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

class BookList extends Component {
  render() {
    const { books } = this.props.data;
    return (
      <div>
        <ul id="book-list">
          {books ? (
            books.map(book => (
              <li key={book.id}>
                {book.name} by {book.author.name}
              </li>
            ))
          ) : (
            <div>Loading books...</div>
          )}
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
