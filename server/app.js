const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const PORT = process.env.PORT || 3000;
const schema = require("./schema/schema");

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
