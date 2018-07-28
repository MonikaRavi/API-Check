const express=require("express");
const hbs=require("hbs");
var app=express();
var firebase=require("firebase");

app.set('view engine','hbs');
app.use(express.static(__dirname +'/public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// firebase.initializeApp({
// 	serviceAccount:"./dummy-3538d-firebase-adminsdk-nta1a-f74d968f67.json",
// 	databaseURL:"https://dummy-3538d.firebaseio.com"
// });


var firebase = require("firebase-admin");

var serviceAccount = require("./fountain-4a64ebe96d96.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://fountain-7bdcc.firebaseio.com/"
});


// var ref=firebase.database().ref('Email_Ids');
// var messagesRef=ref.child('users');
// var stillRef=messagesRef.child('office');

// stillRef.push({
// 	name:'Adele',
// 	age:30,
// 	salary:true,
// 	email:'adele@company.com'
// });

var ref=firebase.database().ref('users');
var data=[];

ref.once('value')
	.then(function(snap){
		console.log(snap.key,"\n\n");
		console.log(snap.ref.toString(),"\n");
		data=snap.val();
		console.log("*************");
		console.log(data);
		//console.log(snap.val(),"\n\n")
	})


var ref=firebase.database().ref('deviceAccount');
var data1=[];
ref.once('value')
	.then(function(snap){
		console.log(snap.key,"\n\n");
		console.log(snap.ref.toString(),"\n");
		data1=(snap.val());
		console.log("*************");
		console.log(data1);
		//console.log(snap.val(),"\n\n")
	})

var ref=firebase.database().ref('device');
var data2=[];
ref.once('value')
	.then(function(snap){
		console.log(snap.key,"\n\n");
		console.log(snap.ref.toString(),"\n");
		data2=(snap.val());
		console.log("*************");
		console.log(data2);
		//console.log(snap.val(),"\n\n")
	})






app.get("/",function(req,res){
	//res.send('<h1>Hello Express!</h1>');
	// res.send({
	// 	name:'Andrew',
	// 	likes:[
	// 	'biking',
	// 	'cities'
	// 	]
	// });
	res.send({data,data1,data2});
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