const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  console.log(req.body.cityName);

  const query = req.body.cityName;
  const units = "metric";
  const apiKey = "590ebb48c0078949a72866f234fbe42e";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      // console.log(imgURL);
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>");
      res.write("<h1>The waether is currently " + description +".</h1>");
      res.write("<img src=" + imgURL + " alt='Weather Image'>");
      res.send();
    });
  });
});

// // res.send("The server is up and running.")

app.listen(3000, function() {
  console.log("The server is running on port 3000.")
});
