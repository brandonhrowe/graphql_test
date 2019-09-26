import React, { Component } from "react";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm(e) {
    e.preventDefault();
    const { addBookMutation } = this.props;
    const { name, genre, authorId } = this.state;
    addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    this.setState({
      name: "",
      genre: "",
      authorId: ""
    });
  }

  render() {
    const { authors } = this.props.getAuthorsQuery;
    return (
      <div>
        <form id="add-book" onSubmit={this.submitForm}>
          <div className="field">
            <label>Book Name:</label>
            <input
              type="text"
              onChange={e => this.setState({ name: e.target.value })}
            ></input>
          </div>
          <div className="field">
            <label>Genre:</label>
            <input
              type="text"
              onChange={e => this.setState({ genre: e.target.value })}
            ></input>
          </div>
          <div className="field">
            <label>Author:</label>
            <select onChange={e => this.setState({ authorId: e.target.value })}>
              <option>Select Author</option>
              {authors &&
                authors.map(author => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
            </select>
          </div>

          <button>+</button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
