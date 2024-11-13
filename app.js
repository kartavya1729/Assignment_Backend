const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Simulated database
const items = [
  { name: "The Great Gatsby", type: "book" },
  { name: "Inception", type: "movie" },
  { name: "MacBook Pro", type: "product" },
  { name: "The Dark Knight", type: "movie" },
  { name: "1984", type: "book" },
  { name: "iPhone", type: "product" }
];

// Set up EJS
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Search route with query string handling
app.get("/search", (req, res) => {
  const query = req.query.q || "";
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  res.render("results", { query, results: filteredItems });
});

// Render search form
app.get("/", (req, res) => {
  res.render("search");
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
