import { gql } from "apollo-boost";

export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
      age
      books {
        name
        id
        genre
      }
    }
  }
`;

export const getBooksQuery = gql`
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
