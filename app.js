const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const city=req.body.city;
  const apiKey="efc7ca08ae4a725844ef60a343ce6ba1";
  const unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit+"#";

https.get(url,function(resp){
  resp.on("data",function(data){
    const weather=JSON.parse(data);
    const temp=weather.main.temp;
    const descrip=weather.weather[0].description;
    const iconloc=weather.weather[0].icon;
    const iconUrl="http://openweathermap.org/img/wn/"+ iconloc +"@2x.png";

    res.write("<p>Weather In "+ city +" is " + descrip+"<p>");
    res.write("<h1>Temperature In "+ city +" is " + temp +" degree celcius</h1>");
    res.write("<img src="+iconUrl+">");
    res.send();
  });

});

});

app.listen(3000,function(){
  console.log("Server is running on port 3000");

});
