Running the Server
1. Go inside the root folder, where server.js file is present
2. open command line in this directory
3. Run 'npm server.js' code in command line
Server is now started


Refactoring Details
All Refactored codes and dependencies are found in the folder ./refactoring.
Description of Files:
checkRegex.js
- Contains two functions, checkRfidRegex() and checkEmailRegex() that checks whether the given RFID and the Emails in the API request follow standard.

functionDays.js
-contains four functions
--calculateDays(logs)
	calculate difference in days between that of logs and current time
--countUnique(datess)
	calculates unique days in the given array of datess
--calculateActualDays(logs)
	creates an array of dates by extracting dates from logs
--findSummaryWithDays(logs,reqDate)
	creates an object of all the logs and summary information about the logs with given reqDate

operation.js
-contains two functions
--findAllMatchingLogsForRFID(device,reqRfid)
	calculate all the matching logs for given Rfid from the 'device' of database
--findingReqRfidFromEmail(users,reqEmailId)
	calculate the Rfid for given EmailId, by using 'users' from database

refactoring.js
-contains four functions
rfidCalculation(req,device,option)
	calculates and everything for rfid without days in API requests

rfidCalculationWithDays(req,device,option)
	calculate and returns everything for rfid with days in API requests

emailCalculation(req,device,option)
	calculate and returns everything for Email without days in API Requests

emailCalculationWithDays(req,device,option)
	calculate and returns everything for Email with days in API requests



API Description

APIS

1) root/
Displays Welcome Message

2)root/allData
Display all the data in our database

3)/bad
Sends 'bad request' information

4)root/details/rfid/:rfid
Returns a JSON object with all the logs for the provided {rfid} tag since the beginning of the database.
For eg:
root/details/rfid/8776f0eb returns all the logs for 8776f0eb since the beginning of the database.

5)root/details/rfid/:rfid/:days
Returns a JSON object with all the logs for the provided {:rfid} tag  and {days} pairs.
For eg:
root/details/rfid/8776f0eb/10 returns the logs for rfid:8776f0eb for the last 10 days.

6)root/summary/rfid/:rfid
Returns a JSON object with all the summary of the logs for the provided {rfid} tag since the beginning of the database.
Eg API request: root/summay/rfid/8776f0eb 
Outcome: is shown below
Summary includes 
{
	totalLogs:17,				i.e there are 17 logs for this RFID in our database
	totalConsumption:27134			i.e the total amount of water dispensed is 27134 milliliters
	totalDaysSinceFirstDispense:45.89	i.e the the used used the bottle before 45.89 days
	uniqueDays:8				i.e the user only used the dispensed 8 days
}

totalLogs: total number of logs in the database for this RFID,since beginning of the database.
totalConsumption:total water dispensed for this RFID, since beginning of the database.
totalDaysSinceFirstDispense: Number of days till today after the first time the RFID was used.
uniqueDays:Since multiple dispenses can be done in one day, it returns how many unique days were the water dispensed in.

7) root/summary/rfid/:rfid/:days
Returns a JSON object of the summary of the logs for the provided {rfid}tag and {days} pairs.
Eg API request: root/summary/rfid/8776f0eb/20
Summary includes:
{
	totalLogs:17,
	totalConsumption:27134
}
PS. totalDaysSinceFirstDispense and uniqueDays have not been included, give we already are interested for only 20 days.

8)root/details/email/:emailId
Returns a JSON object of all the logs related to this emailID.
Eg API request: root/details/email/mistys@hawsco.com


9)root/summary/email/:emailId/:days/:authenticationKey
Returns the JSON object of summary of all the logs for this emailID and authentication Key
Eg API Request: root/summary/email/mistys@hawsco.com
Summary includes 
{
	totalLogs:17,				i.e there are 17 logs for this RFID in our database
	totalConsumption:27134			i.e the total amount of water dispensed is 27134 milliliters
	totalDaysSinceFirstDispense:45.89	i.e the the used used the bottle before 45.89 days
	uniqueDays:8				i.e the user only used the dispensed 8 days
}

totalLogs: total number of logs in the database for this RFID,since beginning of the database.
totalConsumption:total water dispensed for this RFID, since beginning of the database.
totalDaysSinceFirstDispense: Number of days till today after the first time the RFID was used.
uniqueDays:Since multiple dispenses can be done in one day, it returns how many unique days were the water dispensed in.

10)root/details/email/:emailId/:days
Returns the JSOn object of all the logs for {email} and {days} pair.
EG API request: /details/email/mistys@hawsco.com/20
Outcome: returns the logs for mistys@hawsco.com for last 20 days

11) root/summary/email/:emailId/:days
Returns the JSON object of summary of all the logs for {email} and {days} pair.
EG API request: /root/details/email/mistys@hawsco.com/20
Outcome:
Summary includes:
{
	totalLogs:17,
	totalConsumption:27134
}




Refactoring Details

