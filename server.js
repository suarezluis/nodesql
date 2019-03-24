const express = require("express");
const app = express();
const port = 3000;

// MySql connectioon settings
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "todo"
});

express.static("./frontend");

app.use(express.static("frontend"));

app.get("/", (req, res) => {
  res.send("No file found");
});
connection.connect();
app.get("/getData", (req, res) => {
  connection.query("SELECT * FROM todo.todos;", function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });

  //   connection.end();
});

app.get("/addData/:task", (req, res) => {
  connection.query(
    "INSERT INTO `todo`.`todos` (`task`) VALUES ('" + req.params.task + "');",
    function(error, results, fields) {
      if (error) throw error;
      console.log(req.params);
      res.send(results);
    }
  );

  //   connection.end();
});

app.get("/deleteData/:id", (req, res) => {
  connection.query(
    "DELETE FROM `todo`.`todos` WHERE (`id` = '" + req.params.id + "');",
    function(error, results, fields) {
      if (error) throw error;
      console.log(req.params);
      res.send(results);
    }
  );

  //   connection.end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
