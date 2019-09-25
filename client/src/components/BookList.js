import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBooksQuery = gql`
  {
    books {
      name
      id
      genre
      author {
        name
        age
      }
    }
  }
`;

class BookList extends Component {
  render() {
    const { books } = this.props.data;
    return (
      <div>
        <ul id="book-list">
          {books ?
            books.map(book => (
              <li key={book.id}>
                {book.name} by {book.author.name}
              </li>
            )) : <div>Loading books...</div>}
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
