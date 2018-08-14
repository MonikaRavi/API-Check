const express=require("express");
var app=express();
var firebase=require("firebase");
var bodyParser=require("body-parser");
var CryptoJS = require("crypto-js");
var refactoring=require("./refactoring/refactoring.js");
var moment=require('moment');
var aesjs=require('aes-js');
var readDatabase=require("./refactoring/readDatabase.js");

app.use(bodyParser.urlencoded({extended:true}));

var favicon = require('serve-favicon');
var path = require('path');
const http = require('http');
var cors=require('cors');

//app.set('view engine','hbs');
app.use(express.static(__dirname +'/public'));
app.use(cors());
app.use(favicon(path.join(__dirname, '/public', 'favicon.ico')));


var key1 = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
var iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ];



var firebase = require("firebase-admin");
	var fire=firebase.initializeApp({
	  	credential: firebase.credential.cert({
	    projectId: 'dummyfountain',
	    clientEmail: 'biplav@dummyfountain.iam.gserviceaccount.com',
	    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDfC299kJ+hVjAW\naUYHTVN31MiF3cyX9snjVrWSUlnVxTK4j/W6qlyxNz+5LJcouQ5GYGjNMpjUgUnG\nO541MM0M1LR0TArG0qRcK33LoIH0iRZHAdpLLZTFQEMTel2y76UcoEvFlx1AFiAF\np+q8h3TDDMV4wYEm1pTlUkje/gmjP1nET3KLsrznuRaxaw6AGJQHokbFdCYIgExr\nZMKbC/rutaNkhbcrP4jsNN2Bfi0oigxREAlRDs4D1TiAHjq/+ofBjbJKqQ2UsKEl\nNGNul/wgTEQAf5uHsPokLlYW356+jxsLH2dnq5wxWDjsuRT8CxoudOPNrqdwmcpi\nf+TP4ef7AgMBAAECggEAHZGbsqw+aqTilB4EVsnQA8YAMrWllAx3VZL0WD+1lsrh\nP1QfvKLYI0rn65Rh561SG09YUBe3Pg4eadAT2F5YrgJGzVdwDaKgKnM+O9qn+nNF\nXPLTGH35nTAN6beiU1XvcCeUqU8FZYO+tAaU7nBmBh5GfDc++BdLaZ6qeBwlH/Bx\n1wm9JKoki+AXop4jP4zZF/COHQHK4iwpwv9G7Cy/FCG/rxfgXpL8BoejkT6M2kzS\nZYXkLPUNlEw4ayNPjH1qmE2Exdtr02BV4koAwpnaWF8K32WxJCuz+VjfKXKfhU1Z\npMThKFjg8wuPEKyX5dXLs5WEc6myGom1PtufzqhWsQKBgQD2+KIPTeBPfAHeKRGl\n2nYLquLw2hEMHanHbheRYuYzFwPUVVPI/walq3FMQ5ewiFxtHLboRLqjbKNHxtKd\nK6Y1ddpsgxl0HSe9W8OpQ2q7+l+cND5osHUjkJaqeP5pm3upeWIWujgymk1KXCqB\n+SyzZi2VD1x4h+QutjMZHLKtCwKBgQDnMuCeID68Yy0uIUvBamvhR8D9MUlhloQ8\nB0tHhWfb7ABUYoz/w9hwkYYON7lQRR7D+1lHx6mvAKXPuMwq3KSwzylc1HxQXUqD\nhldZ5vnQwe6fWRZf3OuUgP6aOkdERku4Gxn4nRYvZKviGU+TP8DTtuR3CDI4Xs6m\ndJb4Stkm0QKBgEXKjUF16GWNzZlSUcJksecqK2eUuCyMVWYeHlrfb94QKuzeEAdE\nykQW5rV+hGdGoZfT/Xw1r+hu0tV9whbYNuf0nfz8Lz043/oK7IfwnUDxyAMEYH6F\nHxUlzu3tszd00MVbn/R8O1VRdXYGBZ0lJRStU0RESwVkoX7xzg7SpUtxAoGAN/X5\npmyZotHCotLOWl+fAyVyEhb28xcSpNEDKKmizPmfzs0X4eSOpBilQRW91i8U1k0l\nfBlY+hIHEHNjf9BuUJmkImMQQAeEvLcst4cP2rbGQm2227dGkmhyt/P5Qg5dz49H\nxwSG1Svh6tVDjJm228f+Hs2uEjTogiPgUvMTArECgYBZ96/F1Pm6zQdWbcA9uN4Q\ndv9AQuQo9EZEnSSvSu0WGMyFx9cjvK2wh5ewWU9HXdnAdDjfl1XlrtZ6WYMwfNJM\nolZlrSGVqD8SozT4OZmttUDAVTiboBsGkYtzQa05y1fnPSGbgNfx1EpbMtWoCQ87\nAaF35XF+tBfRJCbJNJpufA==\n-----END PRIVATE KEY-----\n'
	  	}),
	  	databaseURL: 'https://dummyfountain.firebaseio.com'
	});
	

	// ref.once('value')
	// 	.then(function(snap){
	// 		users=snap.val();
	// 	})
	var ref=firebase.database().ref('users');
	var users=[];
	ref.on("value",function(snapshot){
		//console.log(snapshot.val());
		users=snapshot.val();
		//console.log("type of users:",typeof(users));
	});

	var ref=firebase.database().ref('deviceAccount');
	var deviceAccount=[];
	ref.on('value',function(snapshot){
		deviceAccount=snapshot.val();
	});

	var ref=firebase.database().ref('device');
	var device=[];
	ref.on('value',function(snapshot){
		device=snapshot.val();
	});



// //code for writing data to the database
// var ref=firebase.database().ref('device');
// var messagesRef=ref.child('MPRlog');
// var stillRef=messagesRef.child('office');
//  messagesRef.push({
// 	filterExpired:"0",
// 	filterLeft:"20000",
// 	flow:"24",
// 	rfid:"845fderf",
// 	temp:"2.0",
// 	timestamp:"2018-07-21-21T12:45:43:554Z"
// });

// var ref1=firebase.database().ref('users');
// var messagesRef=ref1.child('f25fderf').set({
// 	email:"jackD@hawsco.com",
// 	name:"Jack Daniels"
// });




//var stillRef=messagesRef.child('office');

// var ref=firebase.database().ref('users');
// var users=[];

// ref.once('value')
// 	.then(function(snap){
// 		users=snap.val();
// 	})

// var ref=firebase.database().ref('deviceAccount');
// var deviceAccount=[];
// ref.once('value')
// 	.then(function(snap){
// 		deviceAccount=(snap.val());		
// 	})

// var ref=firebase.database().ref('device');
// var device=[];
// ref.once('value')
// 	.then(function(snap){
// 		device=(snap.val());
// })

app.get("/",function(req,res){
	res.send("Welcome to Haws Fountain API!!! <br><br> <br> <br> <br>  Copyright @Hawsco");
});


app.get("/allData",function(req,res){
	res.send(users);
 });

app.get("/bad",function(req,res){
	res.send({
		name:'Error Message'
	});
});

app.get("/details/rfid/:rfid",function(req,res){
	var option=0;	//option=1 indicates summary , 0 indicates details
	var returned=refactoring.rfidCalculation(req,device,option);
	res.send(returned);
});

app.get("/details/rfid/:rfid/:days",function(req,res){
	var option=0;
	var returned=refactoring.rfidCalculationWithDays(req,device,option);
	res.send(returned);
});

app.get("/summary/rfid/:rfid",function(req,res){
	var option=1;	//option=1 indicates summary , 0 indicates details
	var returned=refactoring.rfidCalculation(req,device,option);
	res.send(returned);
});

app.get("/summary/rfid/:rfid/:days",function(req,res){
	var option=1;
	var returned=refactoring.rfidCalculationWithDays(req,device,option);
	res.send(returned);
});

app.get("/details/email/:emailId",function(req,res){
	var option=0;	//option=1 indicates summary , 0 indicates details
	var returned=refactoring.emailCalculation(req,users,device,option);
	res.send(returned);
});

app.get("/summary/email/:emailId",function(req,res){
	var option=1;	//option=1 indicates summary , 0 indicates details
	var returned=refactoring.emailCalculation(req,users,device,option);
	res.send(returned);
});

app.get("/details/email/:emailId/:days",function(req,res){
	var option=0;	//option=1 indicates summary , 0 indicates details
	var returned=refactoring.emailCalculationWithDays(req,users,device,option);
	res.send(returned);
});

app.get("/summary/email/:emailId/:days/:authenticationKey",function(req,res){
	var authenticationKey=req.params.authenticationKey;
	var option=1;
	if(authenticationKey.length%16!==0){
		//res.status(333).json({error:"Length of Authorization Key Invalid"});
		res.status(401).json({
			'code':401,
			'error':"Length of Authorization Key is invalid"});
	}else{
		console.log("authenticationKey: ",authenticationKey, typeof(authenticationKey));
		var encryptedBytes = aesjs.utils.hex.toBytes(authenticationKey);;
		var aesCbc = new aesjs.ModeOfOperation.cbc(key1, iv);
		var decryptedBytes = aesCbc.decrypt(encryptedBytes);
		var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
		console.log("decrypted Text: ",decryptedText);
		if(decryptedText==='hell@1herehoware')
		{
			var returned=refactoring.emailCalculationWithDays(req,users,device,option);
			res.send(returned);
		}else{
			res.status(400).send({error:"Incorrect User Authorization Key"});
		}
	}
});

app.get("/access/:key",function(req,res){
});

app.get("*",function(req,res){
	res.send("You are trying to reach an end point which doesn't exist!!! Please try again");
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

module.exports = app;