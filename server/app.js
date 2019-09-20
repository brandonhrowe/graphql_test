const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/graphql", graphqlHTTP({}));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
