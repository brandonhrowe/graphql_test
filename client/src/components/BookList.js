import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: null
    };
  }
  render() {
    const { books } = this.props.data;
    return (
      <div>
        <ul id="book-list">
          {books ? (
            books.map(book => (
              <li
                key={book.id}
                onClick={() => this.setState({ bookId: book.id })}
              >
                {book.name} by {book.author.name}
              </li>
            ))
          ) : (
            <div>Loading books...</div>
          )}
        </ul>
        <BookDetails bookId={this.state.bookId}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
