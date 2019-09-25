const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const PORT = process.env.PORT || 3001;
const schema = require("./schema/schema");
const { db } = require("./db");
const cors = require("cors");
const morgan = require("morgan");

app.use(morgan('dev'));
app.use(cors());

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

db.sync().then(() => console.log("db connected"));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
