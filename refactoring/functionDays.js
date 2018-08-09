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
	var countUniqueDates=functionDays.countUnique(dates);
	//console.log('countDates:',countDates);
	return countUniqueDates;
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