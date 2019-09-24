const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const PORT = process.env.PORT || 3000;
const schema = require("./schema/schema");
const { db } = require("./db");

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

db.sync().then(() => console.log("db connected"));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
