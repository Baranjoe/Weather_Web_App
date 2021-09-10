const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=590ebb48c0078949a72866f234fbe42e"

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      res.write("<h1>The temperatur ein London is " + temp + " degrees Celsius.</h1>");
      res.write("<h1>The waether is currently " + description +"</h1>");
      res.send();
    });
  });
  // res.send("The server is up and running.")
});












app.listen(3000, function() {
  console.log("The server is running on port 3000.")
});
