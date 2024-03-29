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

export const getBookQuery = gql`
  query($id: ID){
    book(id: $id){
      name
      id
      genre
      author{
        name
        id
        age
        books{
          name
          id
        }
      }
    }
  }
`;

export const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      genre
      id
      author{
        name
      }
    }
  }
`
