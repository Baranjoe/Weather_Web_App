const express = require("express");

const app = express();

app.get("/", function(req, res){
  res.send("The server is up and running.")
});












app.listen(3000, function() {
  console.log("The server is running on port 3000.")
});
