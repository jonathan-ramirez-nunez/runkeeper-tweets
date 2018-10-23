function parseTime(created_at) {
	// "Sun Sep 23 07:01:07 +0000 2018"

}

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	$('#numberTweets').text(tweet_array.length);
	//TODO: remove these
	var latest_tweet = tweet_array[0];
	var earliest_tweet = tweet_array[tweet_array.length-1];
	$('#firstDate').text(earliest_tweet.time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
	$('#lastDate').text(latest_tweet.time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
	// add the rest with math and tweet.ts functions

}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});