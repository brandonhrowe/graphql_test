import React, { Component } from "react";
import { graphql } from "react-apollo";
import {getAuthorsQuery} from "../queries/queries"

class AddBook extends Component {
  render() {
    const { authors } = this.props.data;
    return (
      <div>
        <form id="add-book">
          <div className="field">
            <label>Book Name:</label>
            <input type="text"></input>
          </div>
          <div className="field">
            <label>Genre:</label>
            <input type="text"></input>
          </div>
          <div className="field">
            <label>Author:</label>
            <select>
              <option>Select Author</option>
              {authors && authors.map(author => <option key={author.id}>{author.name}</option>)}
            </select>
          </div>

          <button>+</button>
        </form>
      </div>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
