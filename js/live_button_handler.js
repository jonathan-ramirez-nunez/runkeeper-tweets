$(document).ready(function() {
	//Function-scope boolean to alter as the button switches state
	var liveTweets = false;

	//TODO: use jQuery to listen for a click event,
	//toggle the button text between "Switch to live tweets" and "Switch to saved tweets", 
	//and load the corresponding tweets
	$("#liveButton").click(function(){
		if(!liveTweets){
			$("#liveButton").text("Switch to saved tweets");
			loadLiveRunkeeperTweets().then(parseTweets);
			liveTweets = true;
		}
		else if(liveTweets){
			$("#liveButton").text("Switch to live tweets");
			loadSavedRunkeeperTweets().then(parseTweets);
			liveTweets = false;
		}
	})
});
