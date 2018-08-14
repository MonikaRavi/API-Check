//var firebase=require("firebase");

module.exports=function(firebase){
	var ref=firebase.database().ref('users');
	var users=[];

	ref.once('value')
		.then(function(snap){
			users=snap.val();
		})

	var ref=firebase.database().ref('deviceAccount');
	var deviceAccount=[];
	ref.once('value')
		.then(function(snap){
			deviceAccount=(snap.val());		
		})

	var ref=firebase.database().ref('device');
	var device=[];
	ref.once('value')
		.then(function(snap){
			device=(snap.val());
	})
	return( {
		users:users,
		device:device,
		deviceAccount:deviceAccount
	});
}