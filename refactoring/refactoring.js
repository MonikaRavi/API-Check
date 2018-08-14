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

function checkRfidRegex(reqRfid){
	var regexRfid=RegExp('([a-zA-Z0-9]{8}$)');
	if((regexRfid.test(reqRfid)==true && reqRfid.length===8) || reqRfid==='000000'){
		return 1;
	}else
	{
		return 0;
	}
}

function checkEmailRegex(reqEmailId){
	var regexEmail=RegExp('([a-z0-9][-a-z0-9_\+\.]*[a-z0-9])@([a-z0-9][-a-z0-9\.]*[a-z0-9]\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\.{3}[0-9]{1,3}))');
	if(regexEmail.test(reqEmailId)){
		return true;
	}else{
		return false;
	}
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

function findAllMatchingLogsForRFID(device,reqRfid){
	var allMatchingLog=[];
	var totalConsumption=0;
	var totalLogs=0;
	Object.keys(device["MPRlog"]).forEach(function(key){
		var tempRfid=device["MPRlog"][key]["rfid"];
		if(tempRfid===reqRfid)
		{
			allMatchingLog.push(device["MPRlog"][key]);
			var tempVal= (Number(device["MPRlog"][key]["flow"]));
			totalConsumption=totalConsumption+tempVal;
 			totalLogs=Number(totalLogs)+1;
		}
	});
	var sinceDays=parseInt(calculateDays(allMatchingLog));  //variable to store the the total days since first time the water is dispensed
	var uniqueDays=parseInt(calculateActualDays(allMatchingLog));	
	return({
		allMatchingLog:allMatchingLog,
		summary: [{
			totalLogs:totalLogs,
			totalConsumption:totalConsumption,
			totalDaysSinceFirstDispense:sinceDays,
			uniqueDays:uniqueDays
		}]		
	});
}

function findingReqRfidFromEmail(users,reqEmailId){
	var reqRfid=0;
	Object.keys(users).forEach(function(key){
	if(users[key].email===reqEmailId){
			reqRfid=key;				
		}
	});
	return reqRfid;
}

module.exports.rfidCalculation=function(req,device,option){
	var reqRfid=req.params.rfid;
	if(checkRfidRegex(reqRfid)){
		//derive all required information using the newly find reqRfid
		var summary=findAllMatchingLogsForRFID(device,reqRfid);
		//return what the API request demands
		return (option===1 ? summary.summary : summary.allMatchingLog);
	}else{
		return ("Invalid Rfid tag. Please re-check your rfid. It must have 8 alphanumeric characters!!!");
	}	
}

function findSummaryWithDays(logs,reqDate){
	var tempMatchingLog=[];
	var now=moment(new Date());
	var totalLogs=0;
	var totalConsumption=0;
	logs.forEach(function(log){
		var logDate=log.timestamp;
		var duration=moment.duration(now.diff(logDate));
		//console.log('duration:',duration.asDays());
		if(duration.asDays()<=reqDate){
			var tempVal= (Number(log.flow));
			tempMatchingLog.push(log);
			totalLogs++;
			totalConsumption+=tempVal;
		}		
	});
	return({
		tempMatchingLog:tempMatchingLog,
		logData:[{
			'totalLogs':totalLogs,
			'totalConsumption':totalConsumption
		}]
	});
}

module.exports.rfidCalculationWithDays=function(req,device,option){
	var reqRfid=req.params.rfid;
	var reqDate=req.params.days;
	if(checkRfidRegex(reqRfid)){
		//find summary for given reqRfid
		var summary=findAllMatchingLogsForRFID(device,reqRfid);
		//calculate info about days from the summary
		var summaryWithDays=findSummaryWithDays(summary.allMatchingLog,reqDate);
		return (option===1 ? summaryWithDays.logData : summaryWithDays.tempMatchingLog);	 		
	}else{
		return ("Invalid Rfid tag. Please re-check your rfid. It must have 8 alphanumeric characters!!!");
	}
}

module.exports.emailCalculation=function(req,users,device,option){
	var reqEmailId=req.params.emailId;
	//console.log("***");
	if(checkEmailRegex(reqEmailId)){
		//first find out the rfid of the supplied email
		var reqRfid=findingReqRfidFromEmail(users,reqEmailId);
		//console.log("reqRfid=",reqRfid);
		//derive all required information using the newly find reqRfid
		var summary=findAllMatchingLogsForRFID(device,reqRfid);
		//return what the API request demands
		return (option===1 ? summary.summary : summary.allMatchingLog);
	}else{
		res.send("Invalid Email address");
	}
}

module.exports.emailCalculationWithDays=function(req,users,device,option){
	var reqEmailId=req.params.emailId;
	var reqDate=req.params.days;
	var totalConsumption=0;
	var totalLogs=0;
	if(checkEmailRegex(reqEmailId)){
		var reqRfid=findingReqRfidFromEmail(users,reqEmailId);
		//now, start to find all logs by comparing that RFID to the logs, since logs don't have email info
		var summary=findAllMatchingLogsForRFID(device,reqRfid);
		var summaryWithDays=findSummaryWithDays(summary.allMatchingLog,reqDate);
		return (option===1 ? summaryWithDays.logData : summaryWithDays.tempMatchingLog);
	}
	else{
		return ("Invalid Email Format");
	}
}