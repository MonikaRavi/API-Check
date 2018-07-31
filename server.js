const express=require("express");
//const ejs=require("ejs");
var app=express();
var firebase=require("firebase");
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname +'/public'));


// firebase.initializeApp({
// 	serviceAccount:"./dummy-3538d-firebase-adminsdk-nta1a-f74d968f67.json",
// 	databaseURL:"https://dummy-3538d.firebaseio.com"
// });


var firebase = require("firebase-admin");

var serviceAccount = require("./dummyfountain-88e720e735ec.json");

// firebase.initializeApp({
//   credential: firebase.credential.cert(serviceAccount),
//   databaseURL: "https://dummyfountain.firebaseio.com/"
// });

firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: 'dummyfountain',
    clientEmail: 'biplav@dummyfountain.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDfC299kJ+hVjAW\naUYHTVN31MiF3cyX9snjVrWSUlnVxTK4j/W6qlyxNz+5LJcouQ5GYGjNMpjUgUnG\nO541MM0M1LR0TArG0qRcK33LoIH0iRZHAdpLLZTFQEMTel2y76UcoEvFlx1AFiAF\np+q8h3TDDMV4wYEm1pTlUkje/gmjP1nET3KLsrznuRaxaw6AGJQHokbFdCYIgExr\nZMKbC/rutaNkhbcrP4jsNN2Bfi0oigxREAlRDs4D1TiAHjq/+ofBjbJKqQ2UsKEl\nNGNul/wgTEQAf5uHsPokLlYW356+jxsLH2dnq5wxWDjsuRT8CxoudOPNrqdwmcpi\nf+TP4ef7AgMBAAECggEAHZGbsqw+aqTilB4EVsnQA8YAMrWllAx3VZL0WD+1lsrh\nP1QfvKLYI0rn65Rh561SG09YUBe3Pg4eadAT2F5YrgJGzVdwDaKgKnM+O9qn+nNF\nXPLTGH35nTAN6beiU1XvcCeUqU8FZYO+tAaU7nBmBh5GfDc++BdLaZ6qeBwlH/Bx\n1wm9JKoki+AXop4jP4zZF/COHQHK4iwpwv9G7Cy/FCG/rxfgXpL8BoejkT6M2kzS\nZYXkLPUNlEw4ayNPjH1qmE2Exdtr02BV4koAwpnaWF8K32WxJCuz+VjfKXKfhU1Z\npMThKFjg8wuPEKyX5dXLs5WEc6myGom1PtufzqhWsQKBgQD2+KIPTeBPfAHeKRGl\n2nYLquLw2hEMHanHbheRYuYzFwPUVVPI/walq3FMQ5ewiFxtHLboRLqjbKNHxtKd\nK6Y1ddpsgxl0HSe9W8OpQ2q7+l+cND5osHUjkJaqeP5pm3upeWIWujgymk1KXCqB\n+SyzZi2VD1x4h+QutjMZHLKtCwKBgQDnMuCeID68Yy0uIUvBamvhR8D9MUlhloQ8\nB0tHhWfb7ABUYoz/w9hwkYYON7lQRR7D+1lHx6mvAKXPuMwq3KSwzylc1HxQXUqD\nhldZ5vnQwe6fWRZf3OuUgP6aOkdERku4Gxn4nRYvZKviGU+TP8DTtuR3CDI4Xs6m\ndJb4Stkm0QKBgEXKjUF16GWNzZlSUcJksecqK2eUuCyMVWYeHlrfb94QKuzeEAdE\nykQW5rV+hGdGoZfT/Xw1r+hu0tV9whbYNuf0nfz8Lz043/oK7IfwnUDxyAMEYH6F\nHxUlzu3tszd00MVbn/R8O1VRdXYGBZ0lJRStU0RESwVkoX7xzg7SpUtxAoGAN/X5\npmyZotHCotLOWl+fAyVyEhb28xcSpNEDKKmizPmfzs0X4eSOpBilQRW91i8U1k0l\nfBlY+hIHEHNjf9BuUJmkImMQQAeEvLcst4cP2rbGQm2227dGkmhyt/P5Qg5dz49H\nxwSG1Svh6tVDjJm228f+Hs2uEjTogiPgUvMTArECgYBZ96/F1Pm6zQdWbcA9uN4Q\ndv9AQuQo9EZEnSSvSu0WGMyFx9cjvK2wh5ewWU9HXdnAdDjfl1XlrtZ6WYMwfNJM\nolZlrSGVqD8SozT4OZmttUDAVTiboBsGkYtzQa05y1fnPSGbgNfx1EpbMtWoCQ87\nAaF35XF+tBfRJCbJNJpufA==\n-----END PRIVATE KEY-----\n'
  }),
  databaseURL: 'https://dummyfountain.firebaseio.com'
});


// var ref=firebase.database().ref('Email_Ids');
// ref.push({
// 	email:'maxl@hawsco.com'
// });
// ref.push({
// 	email:'richardf@hawsco.com'
// });


//code for writing data to the database
var ref=firebase.database().ref('users');
var data=[];

ref.once('value')
	.then(function(snap){
		// console.log(snap.key,"\n\n");
		// console.log(snap.ref.toString(),"\n");
		data=snap.val();
		//console.log("*************");
		//console.log(data);
		//console.log(snap.val(),"\n\n")
	})


var ref=firebase.database().ref('deviceAccount');
var data1=[];
ref.once('value')
	.then(function(snap){
		// console.log(snap.key,"\n\n");
		// console.log(snap.ref.toString(),"\n");
		data1=(snap.val());
		//console.log("*************");
		//console.log(data1);
		//console.log(snap.val(),"\n\n")
	})

var ref=firebase.database().ref('device');
var data2=[];
ref.once('value')
	.then(function(snap){
		// console.log(snap.key,"\n\n");
		// console.log(snap.ref.toString(),"\n");
		data2=(snap.val());
		//console.log("*************");
		//console.log(data2);
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

// app.get("/:emailId",function(req,res){
// 	var reqEmailId=req.params.emailId;
// 	console.log("reqEmail= "+reqEmailId);
// 	var matchingLog=[];
// 	console.log("matching log= "+matchingLog);
// 	console.log("__________________________________________");
// 	Object.keys(data).forEach(function(key){
// 		//console.log("key= "+key);
// 		console.log("key.email= "+ data[key].email);
// 		// console.log("type of email:"+ typeof(data[key].email));
// 		// console.log("type of req:"+typeof(reqEmailId));
// 		if(data[key].email===reqEmailId){
// 			matchingLog.push(data[key]);
// 		}
// 	});
// 	console.log("matching log= ");
// 	console.log(matchingLog);
// 	//console.log(data["2740efeb"]);
// 	//var data=[1,2,3];
// 	console.log("__________________________________________");
// 	//console.log(JSON.stringify(res.body));

// 	 res.render("emailId",{data:data["2740efeb"]});
// });

app.get("/:emailId",function(req,res){
	var reqEmailId=req.params.emailId;

	console.log("reqEmail= "+reqEmailId);
	var matchingLog=[];
	console.log("matching log= "+matchingLog);
	console.log("__________________________________________");
	Object.keys(data).forEach(function(key){
		//console.log("key= "+key);
		console.log("key.email= "+ data[key].email);
		// console.log("type of email:"+ typeof(data[key].email));
		// console.log("type of req:"+typeof(reqEmailId));
		if(data[key].email===reqEmailId){
			matchingLog.push(data[key]);
		}
	});
	console.log("matching log= ");
	console.log(matchingLog);
	var reqRfid=matchingLog[0].rfid;
	console.log("matching rfid: "+reqRfid);
	//console.log(data["2740efeb"]);
	//var data=[1,2,3];
	console.log("__________________________________________");
	//console.log(JSON.stringify(res.body));
	var allMatchingLog=[];

	//extract all the transaction of this reqRfid
	//console.log(data2["MPRLog"]["-LFZjowOUbZszA9x7YFH"]["filterExpired"]);
	console.log(data2["MPRlog"]["-LFZjowOUbZszA9x7YFH"]);
	//var collection="MPRlog";
	//console.log(data2.collection["-LFZjowOUbZszA9x7YFH"]);
	Object.keys(data2["MPRlog"]).forEach(function(key){
		//console.log("Key= "+key);
		//console.log("data2.collection.key.rfid: "+ data2["MPRlog"][key]["rfid"]);
		var tempRfid=data2["MPRlog"][key]["rfid"];
		if(tempRfid===reqRfid)
		{
			allMatchingLog.push(data2["MPRlog"][key]);
		}

	});
	console.log(allMatchingLog);
	res.send(allMatchingLog);
	//res.render("emailId",{data:data["2740efeb"]});
});


app.listen(3000,function(){
	console.log("Server starting..");
});