const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} = graphql;
const _ = require("lodash");

const books = [
  { name: "To The Lighthouse", genre: "Fiction", id: "1" },
  { name: "The Baron in the Trees", genre: "Fiction", id: "2" },
  { name: "The Powerbroker", genre: "Non-Fiction", id: "3" },
  { name: "Mrs. Dalloway", genre: "Fiction", id: "4" }
];

const authors = [
  { name: "Virginia Woolf", age: 147, id: "1" },
  { name: "Italo Calvino", age: 92, id: "2" },
  { name: "Robert Caro", age: 80, id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
