const express=require("express");
const cors=require('cors');
var bodyParser=require("body-parser");
//const hbs=require("hbs");
var app=express();
var firebase=require("firebase");

var favicon = require('serve-favicon');
var path = require('path');
const http = require('http');

//CORS 

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

//app.set('view engine','hbs');
app.use(express.static(__dirname +'/public'));

app.use(favicon(path.join(__dirname, '/public', 'favicon.ico')));



// firebase.initializeApp({
// 	serviceAccount:"./dummy-3538d-firebase-adminsdk-nta1a-f74d968f67.json",
// 	databaseURL:"https://dummy-3538d.firebaseio.com"
// });


var firebase = require("firebase-admin");

//var serviceAccount = require("./fountain-4a64ebe96d96.json");

firebase.initializeApp({
	credential: firebase.credential.cert({
	  projectId: 'dummyfountain',
	  clientEmail: 'biplav@dummyfountain.iam.gserviceaccount.com',
	  privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDfC299kJ+hVjAW\naUYHTVN31MiF3cyX9snjVrWSUlnVxTK4j/W6qlyxNz+5LJcouQ5GYGjNMpjUgUnG\nO541MM0M1LR0TArG0qRcK33LoIH0iRZHAdpLLZTFQEMTel2y76UcoEvFlx1AFiAF\np+q8h3TDDMV4wYEm1pTlUkje/gmjP1nET3KLsrznuRaxaw6AGJQHokbFdCYIgExr\nZMKbC/rutaNkhbcrP4jsNN2Bfi0oigxREAlRDs4D1TiAHjq/+ofBjbJKqQ2UsKEl\nNGNul/wgTEQAf5uHsPokLlYW356+jxsLH2dnq5wxWDjsuRT8CxoudOPNrqdwmcpi\nf+TP4ef7AgMBAAECggEAHZGbsqw+aqTilB4EVsnQA8YAMrWllAx3VZL0WD+1lsrh\nP1QfvKLYI0rn65Rh561SG09YUBe3Pg4eadAT2F5YrgJGzVdwDaKgKnM+O9qn+nNF\nXPLTGH35nTAN6beiU1XvcCeUqU8FZYO+tAaU7nBmBh5GfDc++BdLaZ6qeBwlH/Bx\n1wm9JKoki+AXop4jP4zZF/COHQHK4iwpwv9G7Cy/FCG/rxfgXpL8BoejkT6M2kzS\nZYXkLPUNlEw4ayNPjH1qmE2Exdtr02BV4koAwpnaWF8K32WxJCuz+VjfKXKfhU1Z\npMThKFjg8wuPEKyX5dXLs5WEc6myGom1PtufzqhWsQKBgQD2+KIPTeBPfAHeKRGl\n2nYLquLw2hEMHanHbheRYuYzFwPUVVPI/walq3FMQ5ewiFxtHLboRLqjbKNHxtKd\nK6Y1ddpsgxl0HSe9W8OpQ2q7+l+cND5osHUjkJaqeP5pm3upeWIWujgymk1KXCqB\n+SyzZi2VD1x4h+QutjMZHLKtCwKBgQDnMuCeID68Yy0uIUvBamvhR8D9MUlhloQ8\nB0tHhWfb7ABUYoz/w9hwkYYON7lQRR7D+1lHx6mvAKXPuMwq3KSwzylc1HxQXUqD\nhldZ5vnQwe6fWRZf3OuUgP6aOkdERku4Gxn4nRYvZKviGU+TP8DTtuR3CDI4Xs6m\ndJb4Stkm0QKBgEXKjUF16GWNzZlSUcJksecqK2eUuCyMVWYeHlrfb94QKuzeEAdE\nykQW5rV+hGdGoZfT/Xw1r+hu0tV9whbYNuf0nfz8Lz043/oK7IfwnUDxyAMEYH6F\nHxUlzu3tszd00MVbn/R8O1VRdXYGBZ0lJRStU0RESwVkoX7xzg7SpUtxAoGAN/X5\npmyZotHCotLOWl+fAyVyEhb28xcSpNEDKKmizPmfzs0X4eSOpBilQRW91i8U1k0l\nfBlY+hIHEHNjf9BuUJmkImMQQAeEvLcst4cP2rbGQm2227dGkmhyt/P5Qg5dz49H\nxwSG1Svh6tVDjJm228f+Hs2uEjTogiPgUvMTArECgYBZ96/F1Pm6zQdWbcA9uN4Q\ndv9AQuQo9EZEnSSvSu0WGMyFx9cjvK2wh5ewWU9HXdnAdDjfl1XlrtZ6WYMwfNJM\nolZlrSGVqD8SozT4OZmttUDAVTiboBsGkYtzQa05y1fnPSGbgNfx1EpbMtWoCQ87\nAaF35XF+tBfRJCbJNJpufA==\n-----END PRIVATE KEY-----\n'
	}),
	databaseURL: 'https://dummyfountain.firebaseio.com'
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
	res.send("Welcome to Haws Fountain API!!! <br><br> <br> <br> <br>  Copyright @Hawsco");
});


app.get("/allData",function(req,res){
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
app.get("/rfid/:rfid",function(req,res){
	var reqRfid=req.params.rfid;
	var regexRfid=RegExp('([a-zA-Z0-9]{8}$)');
	console.log(reqRfid.length);
	console.log("regexRfid.test(reqRfid)=" + regexRfid.test(reqRfid));
	if(regexRfid.test(reqRfid)==true && reqRfid.length===8){
		//console.log(reqRfid);
		var allmatchingLog=[];
		var totalConsumption=0;
		var totalLogs=0;
		Object.keys(data2["MPRlog"]).forEach(function(key){
			//console.log("Key= "+key);
			//console.log("data2.collection.key.rfid: "+ data2["MPRlog"][key]["rfid"]);
			var tempRfid=data2["MPRlog"][key]["rfid"];
			if(tempRfid===reqRfid)
			{
				allmatchingLog.push(data2["MPRlog"][key]);
				//totalConsumption+=parseInt(data2["MPRlog"][key]["flow"]);
				var tempVal= (Number(data2["MPRlog"][key]["flow"]));
				//console.log(tempVal);
				//console.log(typeof(tempVal));
				totalConsumption=totalConsumption+tempVal;
				//console.log('partial consumption:' + totalConsumption);
				 totalLogs=Number(totalLogs)+1;
			}
		});
		//console.log(allmatchingLog);
		//console.log( totalConsumption);
		var logData={
			'totalLogs':totalLogs,
			'totalConsumption':totalConsumption
		};

		allmatchingLog.push(logData);
		//console.log(allmatchingLog);
		res.send(allmatchingLog);
	}else{
		res.send("Invalid Rfid tag. Please re-check your rfid. It must have 8 alphanumeric characters!!!");
	}

	
	
});


app.get("/:emailId",function(req,res){
	var reqEmailId=req.params.emailId;
	var regexEmail=RegExp('([a-z0-9][-a-z0-9_\+\.]*[a-z0-9])@([a-z0-9][-a-z0-9\.]*[a-z0-9]\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\.{3}[0-9]{1,3}))');
	//console.log(regexEmail.test("biplav.timalsina@gmail.com"));
	//console.log("reqEmail= "+reqEmailId);
	if(regexEmail.test(reqEmailId)){
		var matchingLog=[];
		//console.log("matching log= "+matchingLog);
		//console.log("__________________________________________");
		Object.keys(data).forEach(function(key){
			//console.log("key= "+key);
			//console.log("key.email= "+ data[key].email);
			// console.log("type of email:"+ typeof(data[key].email));
			// console.log("type of req:"+typeof(reqEmailId));
			if(data[key].email===reqEmailId){
				matchingLog.push(data[key]);
			}
		});
		//console.log("matching log= ");
		//console.log(matchingLog);
		var reqRfid=matchingLog[0].rfid;
		//console.log("matching rfid: "+reqRfid);
		//console.log(data["2740efeb"]);
		//var data=[1,2,3];
		//console.log("__________________________________________");
		//console.log(JSON.stringify(res.body));
		var allMatchingLog=[];

		//extract all the transaction of this reqRfid
		//console.log(data2["MPRLog"]["-LFZjowOUbZszA9x7YFH"]["filterExpired"]);
		//console.log(data2["MPRlog"]["-LFZjowOUbZszA9x7YFH"]);
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
		//console.log(allMatchingLog);
		res.send(allMatchingLog);
		//res.render("emailId",{data:data["2740efeb"]});
	}else{
		res.send("Invalid Email address");
	}
	
});

app.get("*",function(req,res){
	res.send("You are trying to reach an end point which doesn't exist!!! Please try again");
});
/*
app.listen(3000,function(){
	console.log("Server starting..");
});
*/
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

module.exports = app;