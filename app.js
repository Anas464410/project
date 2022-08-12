const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const cityName = req.body.cityName;
  const apiKey = "ba91c1f6f6e586319c7db87845f7c3e3";
  const unit = "metric";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const json_data = JSON.parse(data);
      const temp = json_data.main.temp;
      const description = json_data.weather[0].description;
      const icon = json_data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(`<h1>The temperature in ${cityName} is ${temp} degress celsius.</h1>`);
      res.write(`<h4>The weather description in ${cityName} is ${description}.</h4>`);
      res.write(`<img src=${iconUrl} alt=icon></img>`);
      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log("Port is currently running on 3000.");
});
