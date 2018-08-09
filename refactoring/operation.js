
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
	var sinceDays=parseInt(functionDays.calculateDays(allMatchingLog));  //variable to store the the total days since first time the water is dispensed
	var uniqueDays=parseInt(functionDays.calculateActualDays(allMatchingLog));	
	return({
		allMatchingLog:allMatchingLog,
		summary: [{
			totalConsumption:totalConsumption,
			totalLogs:totalLogs,
			sinceDays:sinceDays,
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
