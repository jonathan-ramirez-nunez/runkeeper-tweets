function loadLiveRunkeeperTweets() {
	return new Promise(function(resolve, reject) {
		fetch('http://localhost:7890/1.1/search/tweets.json?q=%23Runkeeper&lang=en&count=100&result_type=recent')
			.then(function(response){
				var fetched_promise_object = response.json();
				return fetched_promise_object;	// can do "return live_tweets" instead, another "promise" is returned
			})
			.then(function(data){	// this is where I can actually manipulate the data returned from the GET request to twitter API
				var live_tweets = data.statuses;
				resolve(live_tweets);
				//return live_tweets;
			})
			.catch(function(error){
				console.log(error.message);
			})
		//resolve(undefined);
	});
}