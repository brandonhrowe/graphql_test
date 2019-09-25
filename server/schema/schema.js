const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;
// const _ = require("lodash");
const { Book, Author } = require("../db");

// const books = [
//   { name: "To The Lighthouse", genre: "Fiction", id: "1", authorId: "1" },
//   { name: "The Baron in the Trees", genre: "Fiction", id: "2", authorId: "2" },
//   { name: "The Powerbroker", genre: "Non-Fiction", id: "3", authorId: "3" },
//   { name: "Mrs. Dalloway", genre: "Fiction", id: "4", authorId: "1" }
// ];

// const authors = [
//   { name: "Virginia Woolf", age: 147, id: "1" },
//   { name: "Italo Calvino", age: 92, id: "2" },
//   { name: "Robert Caro", age: 80, id: "3" }
// ];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
        let author = await Author.findByPk(parent.authorId);
        return author;
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
        let books = await Book.findAll({
          where: {
            authorId: parent.id
          }
        });
        return books;
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        // return _.find(books, { id: args.id });
        let book = await Book.findByPk(args.id);
        return book;
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        let author = await Author.findByPk(args.id);
        return author;
      }
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        // return books;
        let books = await Book.findAll();
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve(parent, args) {
        // return authors;
        let authors = await Author.findAll();
        return authors;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      async resolve(parent, args) {
        const { name, age } = args;
        const author = await Author.create({ name, age });
        return author;
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        genre: {
          type: new GraphQLNonNull(GraphQLString)
        },
        authorId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      async resolve(parent, args) {
        const { name, genre, authorId } = args;
        const book = await Book.create({ name, genre, authorId });
        return book;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
