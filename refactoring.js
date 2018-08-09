var functionDays=require('./functionDays');
var checkRegex=require('./checkRegex');
var operation=require('./operation');

module.exports.rfidCalculation=function(req,device,option){
	var reqRfid=req.params.rfid;
	if(checkRegex.checkRfidRegex(reqRfid)){
		//derive all required information using the newly find reqRfid
		var summary=operation.findAllMatchingLogsForRFID(device,reqRfid);
		//return what the API request demands
		return (option===1 ? summary.summary : summary.allMatchingLog);
	}else{
		return ("Invalid Rfid tag. Please re-check your rfid. It must have 8 alphanumeric characters!!!");
	}	
}

module.exports.rfidCalculationWithDays=function(req,device,option){
	var reqRfid=req.params.rfid;
	var reqDate=req.params.days;
	if(checkRegex.checkRfidRegex(reqRfid)){
		//find summary for given reqRfid
		var summary=operation.findAllMatchingLogsForRFID(device,reqRfid);
		//calculate info about days from the summary
		var summaryWithDays=functionDays.findSummaryWithDays(summary.allMatchingLog,reqDate);
		return (option===1 ? summaryWithDays.logData : summaryWithDays.tempMatchingLog);	 		
	}else{
		return ("Invalid Rfid tag. Please re-check your rfid. It must have 8 alphanumeric characters!!!");
	}
}

module.exports.emailCalculation=function(req,users,device,option){
	var reqEmailId=req.params.emailId;
	if(checkRegex.checkEmailRegex(reqEmailId)){
		//first find out the rfid of the supplied email
		var reqRfid=operation.findingReqRfidFromEmail(users,reqEmailId);
		//derive all required information using the newly find reqRfid
		var summary=operation.findAllMatchingLogsForRFID(device,reqRfid);
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
	if(checkRegex.checkEmailRegex(reqEmailId)){
		var reqRfid=operation.findingReqRfidFromEmail(users,reqEmailId);
		//now, start to find all logs by comparing that RFID to the logs, since logs don't have email info
		var summary=operation.findAllMatchingLogsForRFID(device,reqRfid);
		var summaryWithDays=functionDays.findSummaryWithDays(summary.allMatchingLog,reqDate);
		return (option===1 ? summaryWithDays.logData : summaryWithDays.tempMatchingLog);
	}
	else{
		return ("Invalid Email Format");
	}
}