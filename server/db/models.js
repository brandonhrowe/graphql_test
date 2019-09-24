const Sequelize = require("sequelize");
const db = require("./db");

const Book = db.define("book", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  genre: {
    type: Sequelize.STRING
  }
});

const Author = db.define("author", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER
  }
});

Book.belongsTo(Author);
Author.hasMany(Book);

module.exports = { Book, Author };
