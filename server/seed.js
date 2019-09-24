const { db, Book, Author } = require("./db");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const books = [
    { name: "To The Lighthouse", genre: "Fiction", authorId: "1" },
    { name: "The Baron in the Trees", genre: "Fiction", authorId: "2" },
    { name: "The Powerbroker", genre: "Non-Fiction", authorId: "3" },
    { name: "Mrs. Dalloway", genre: "Fiction", authorId: "1" }
  ];

  const authors = [
    { name: "Virginia Woolf", age: 147 },
    { name: "Italo Calvino", age: 92 },
    { name: "Robert Caro", age: 80 }
  ];

  authors.forEach(async author => {
    await Author.create(author)
  })

  books.forEach(async book => {
    await Book.create(book)
  })
  console.log("db seeded!")
}

if (module === require.main){
  seed()
}
