const express = require('express');
const https = require('https');

const app = express();
const bodyParser = require("body-parser");
const { text } = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req , res){
    res.sendFile(__dirname+"/weather.html")
})

app.post("/", function(req, res){
    console.log(req.body.city);
    let location = req.body.city;
    const unit ="metric";
    const key="6e7999bc3ca0f4ea3ce334bb79ecf9e3";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+key+"&units="+unit;
      https.get(url, function(response){
                  response.on("data", function(data){
                      const weatherdata = JSON.parse(data);
                      const weatherDiscription = weatherdata.weather[0].description;
                      const temp = weatherdata.main.temp;
                      const tempk = temp;
                      const icon = weatherdata.weather[0].icon;
                      console.log(icon);
                      const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
                      res.write("<h1>The Tempreture in "+location+" is "+tempk+"</h1>");
                      res.write("<p>Weather is like "+weatherDiscription+ "</p>");
                      res.write("<img src="+imgurl+">");
                      res.send();
                  })
      })
})

app.listen(100, function(){
    console.log("Server is listerning at port 100")
})