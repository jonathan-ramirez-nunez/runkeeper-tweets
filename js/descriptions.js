var written_tweets = [];

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	for(var i=0; i<tweet_array.length; ++i){
		if(tweet_array[i].written)
			written_tweets.push(tweet_array[i]);
	}
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	$("#textFilter").keyup(function(){
		$("#tweetTable").empty();
		var current_row = 1;
		var search_query = $("#textFilter").val();
		for(var i=0; i<written_tweets.length; ++i){
			if(search_query===""){
				$("#tweetTable").empty();
			}
			else if((written_tweets[i].writtenText.toLowerCase()).includes(search_query)){ // and acType===completed_event?
				var table_entry = written_tweets[i].getHTMLTableRow(current_row);
				++current_row;
				$("#tweetTable").append(table_entry);
			}
		}
		$("#searchCount").text(current_row-1);
		$("#searchText").text(search_query);
	});
	
}

//Wait for the DOM to load
$(document).ready(function() {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});