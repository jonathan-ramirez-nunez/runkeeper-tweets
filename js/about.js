function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	var comp_counter = 0;
	var live_counter = 0;
	var achi_counter = 0;
	var misc_counter = 0;
	var written_counter = 0;
	for(var i=0; i<tweet_array.length; ++i){
		//console.log(tweet_array[i].source);
		switch(tweet_array[i].source){
			case "completed_event":
				++comp_counter;
				if(tweet_array[i].written){++written_counter;}
				break;
			case "achievement":
				++achi_counter;
				break;
			case "live_event":
				++live_counter;
				break;
			case "miscellaneous":
				++misc_counter;
				break;
			default:
				break;
		}
	}

	var tweets_total = tweet_array.length;
	$('#numberTweets').text(tweets_total);
	//TODO: remove these
	var latest_tweet = tweet_array[0];
	var earliest_tweet = tweet_array[tweet_array.length-1];
	$('#firstDate').text(earliest_tweet.time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
	$('#lastDate').text(latest_tweet.time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
	$('.completedEvents').text(comp_counter);
	$('.completedEventsPct').text(math.format((comp_counter/tweets_total)*100, {notation: 'fixed', precision: 2})+'%');
	$('.liveEvents').text(live_counter);
	$('.liveEventsPct').text(math.format((live_counter/tweets_total)*100, {notation: 'fixed', precision: 2})+'%');
	$('.achievements').text(achi_counter);
	$('.achievementsPct').text(math.format((achi_counter/tweets_total)*100, {notation: 'fixed', precision: 2})+'%');
	$('.miscellaneous').text(misc_counter);
	$('.miscellaneousPct').text(math.format((misc_counter/tweets_total)*100, {notation: 'fixed', precision: 2})+'%');
	$('.written').text(written_counter);
	$('.writtenPct').text(math.format((written_counter/comp_counter)*100, {notation: 'fixed', precision: 2})+'%');

}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});