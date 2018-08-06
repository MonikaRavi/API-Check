module.exports.calculation=function(){
	var reqRfid=req.params.rfid;
	var regexRfid=RegExp('([a-zA-Z0-9]{8}$)');
	console.log(reqRfid.length);
	console.log("regexRfid.test(reqRfid)=" + regexRfid.test(reqRfid));
	if(regexRfid.test(reqRfid)==true && reqRfid.length===8){
		var allmatchingLog=[];
		var totalConsumption=0;
		var totalLogs=0;
		Object.keys(data2["MPRlog"]).forEach(function(key){
			var tempRfid=data2["MPRlog"][key]["rfid"];
			if(tempRfid===reqRfid)
			{
				allmatchingLog.push(data2["MPRlog"][key]);
				var tempVal= (Number(data2["MPRlog"][key]["flow"]));
				totalConsumption=totalConsumption+tempVal;
     			totalLogs=Number(totalLogs)+1;
			}
		});
		var logData={
			'totalLogs':totalLogs,
			'totalConsumption':totalConsumption
		};
		allmatchingLog.push(logData);
		res.send(logData);
	}else{
		res.send("Invalid Rfid tag. Please re-check your rfid. It must have 8 alphanumeric characters!!!");
	}	
}