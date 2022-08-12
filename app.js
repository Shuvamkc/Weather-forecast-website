const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const  {request}= require("http");



const app=express();
app.use(express.static("publ"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(request,response){
    response.sendFile(__dirname+"/index.html");
});
app.post("/",function(request , response){
    console.log(request.body.cityname);
    const input=request.body.cityname;
    const api_id="16d9ea0132915be2e323a80702d726ed";
    const unit="metric";

    const url="https://api.openweathermap.org/data/2.5/weather?q="+ input +"&appid="+ api_id +"&units="+ unit ;
    https.get(url,function(res){
    res.on("data",function(data){
        const we=JSON.parse(data);
        const v=we.main.temp;
        const w=we.weather[0].description;
        const icon=we.weather[0].icon;
        const f=we.main.feels_like;
        const min=we.main.temp_min;
        const pressure=we.main.pressure;
        const humidity=we.main.humidity;
        const clouds=we.clouds.all;
        const country=we.sys.country;
        const img= "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
        response.write("<h1>The temperature in "+ input +" is :" + v +" degree celsius" + "<h1>");
        response.write(" Feels like : " + f + " degree celsius"+"<br>");
        response.write(" Max temperature : " + min + " degree celsius"+"<br>");
        response.write(" Pressure : " +pressure + " hpa "+"<br>");
        response.write(" Humidity : " + humidity + " % "+"<br>");
        response.write(" Clouds : " + clouds + " %"+"<br>");
        response.write("The sky in "+input+" has " + w +"<br>" );
        response.write("<img src= "+ img +">" +"<br>");
        response.write(" Country: "+ country);
        response.send();
    })
    console.log(res);
    

   })
})

   

app.listen(process.env.PORT || 3000,function(){
    console.log("Server started");
});