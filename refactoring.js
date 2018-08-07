var moment=require('moment');

var calculateDays=function(logs){
		var end=logs[0].timestamp;
		var now=moment(new Date());
		//console.log('now.year: ',now.year);
		//console.log('Current time: ',now);
		//console.log("matching timestamp: ",end);
		var duration=moment.duration(now.diff(end));
		var days=duration.asDays();
		//console.log('days: ',days);
		return days;

}

function countUnique(datess){
		return new Set(datess).size;
	}

function calculateActualDays(logs){
	var dates=[];
	logs.forEach(function(log){
		var tempDate=log.timestamp;
		//console.log('tempDate: ',tempDate, ' Type: ',typeof(tempDate));
		dates.push(tempDate.substring(0,10));
		//console.log(tempDate.substring(0,10));
	});	
	var countUniqueDates=countUnique(dates);
	//console.log('countDates:',countDates);
	return countUniqueDates;
}

module.exports.rfidCalculation=function(req,data2,option){
	var reqRfid=req.params.rfid;
	var regexRfid=RegExp('([a-zA-Z0-9]{8}$)');
	//console.log(reqRfid.length);
	//console.log("regexRfid.test(reqRfid)=" + regexRfid.test(reqRfid));
	if((regexRfid.test(reqRfid)==true && reqRfid.length===8) || reqRfid==='000000'){
		var allMatchingLog=[];
		var totalConsumption=0;
		var totalLogs=0;
		Object.keys(data2["MPRlog"]).forEach(function(key){
			var tempRfid=data2["MPRlog"][key]["rfid"];
			if(tempRfid===reqRfid)
			{
				allMatchingLog.push(data2["MPRlog"][key]);
				var tempVal= (Number(data2["MPRlog"][key]["flow"]));
				totalConsumption=totalConsumption+tempVal;
     			totalLogs=Number(totalLogs)+1;
			}
		});
		//find out the total number of days of data available for this user
		
		var sinceDays=parseInt(calculateDays(allMatchingLog));
		//console.log(sinceDays);

		var uniqueDays=parseInt(calculateActualDays(allMatchingLog));

		var logData={
			'totalLogs':totalLogs,
			'totalConsumption':totalConsumption,
			'totalDaysSinceFirstDispense':sinceDays,
			'uniqueDays':uniqueDays
		};
		if(option===1){
			allMatchingLog.push(logData);
			return logData;
		}else
		{
			return allMatchingLog;
		}
		
	}else{
		return ("Invalid Rfid tag. Please re-check your rfid. It must have 8 alphanumeric characters!!!");
	}	
}

module.exports.emailCalculation=function(req,data,data2,option){
	var reqEmailId=req.params.emailId;
	var regexEmail=RegExp('([a-z0-9][-a-z0-9_\+\.]*[a-z0-9])@([a-z0-9][-a-z0-9\.]*[a-z0-9]\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\.{3}[0-9]{1,3}))');
	var totalConsumption=0;
	var totalLogs=0;
	if(regexEmail.test(reqEmailId)){
		var matchingLog=[];
		//first make an array of all logs of the email
		Object.keys(data).forEach(function(key){
		if(data[key].email===reqEmailId){
				matchingLog.push(data[key]);				
			}
		});
		var reqRfid=matchingLog[0].rfid;
		var allMatchingLog=[];

		//now, start 
		Object.keys(data2["MPRlog"]).forEach(function(key){
			var tempRfid=data2["MPRlog"][key]["rfid"];
			if(tempRfid===reqRfid)
			{
				allMatchingLog.push(data2["MPRlog"][key]);
				totalLogs++;
				var tempVal= (Number(data2["MPRlog"][key]["flow"]));
				totalConsumption+=tempVal;
			}
		});		

		var sinceDays=parseInt(calculateDays(allMatchingLog));
		//console.log(sinceDays);
		var uniqueDays=parseInt(calculateActualDays(allMatchingLog));		
		var logData={
			'totalLogs':totalLogs,
			'totalConsumption':totalConsumption,
			'totalDaysSinceFirstDispense':sinceDays,
			'uniqueDays':uniqueDays
		};
		//console.log(allMatchingLog);
		if(option===1){
			return logData;
		}else
		{
			return allMatchingLog;
		}
		//res.render("emailId",{data:data["2740efeb"]});
	}else{
		res.send("Invalid Email address");
	}

}