const express=require("express");
const hbs=require("hbs");
var app=express();

app.set('view engine','hbs');
app.use(express.static(__dirname +'/public'));

app.get("/sample",function(req,res){
	//res.send('<h1>Hello Express!</h1>');
	res.send({
		name:'Andrew',
		likes:[
		'biking',
		'cities'
		]
	});
});

app.get("/",function(req,res){
	
	res.send('<h1> API Home </h1>');
});


app.get("/about",function(req,res){
	res.render("about",{
		pageTitle:'About Page1',
		currentYear:new Date().getFullYear()
	});
});

app.get("/bad",function(req,res){
	res.send({
		name:'Error Message'
	});
});

app.listen(3000,function(){
	console.log("Server starting..");
});