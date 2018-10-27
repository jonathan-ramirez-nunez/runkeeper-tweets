function convertDay(num){
	var day="Sun";
	switch(num){
		case 0:
			day="Sun";
			break;
		case 6:
			day="Sat";
			break;
		case 5:
			day="Fri";
			break;
		case 4:
			day="Thu";
			break;
		case 3:
			day="Wed";
			break;
		case 2:
			day="Tue";
			break;
		case 1:
			day="Mon";
			break;
		default:
			break;
	}
	return day;
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
	
	var run={type:"run",count:0,dist_count:0},nordic={type:"nordic walk",count:0},walk={type:"walk",count:0,dist_count:0},
	mtnbike={type:"mtn bike",count:0},bike={type:"bike",count:0,dist_count:0},swim={type:"swim",count:0},
	crossfit={type:"CrossFit\u00ae",count:0},hike={type:"hike",count:0},elliptical={type:"elliptical workout",count:0},
	strength={type:"strength workout",count:0},spinning={type:"spinning workout",count:0},
	circuit={type:"circuit workout",count:0},bootcamp={type:"bootcamp workout",count:0},
	core={type:"core workout",count:0},group={type:"group workout",count:0},barre={type:"barre workout",count:0},
	row={type:"row",count:0},ski={type:"ski run",count:0},freestyle={type:"MySports Freestyle",count:0},
	activity={type:"activity",count:0},yoga={type:"yoga practice",count:0},skate={type:"skate",count:0},
	chair={type:"chair ride",count:0},snowboard={type:"snowboard",count:0},stair={type:"stairmaster / stepwell workout",count:0},
	meditation={type:"meditation",count:0},pilates={type:"pilates session",count:0},boxing={type:"boxing / MMA",count:0},
	sports={type:"sports",count:0},gym={type:"MySports Gym",count:0},dance={type:"dance",count:0};

	var unaccounted = 0;
	// var run=0,nordic=0,walk=0,mtnbike=0,bike=0,swim=0,crossfit=0,hike=0,elliptical=0,strength=0,
	// spinning=0,circuit=0,bootcamp=0,core=0,group=0,barre=0,row=0,ski=0,freestyle=0,activity=0,yoga=0,
	// skate=0,chair=0,snowboard=0,stair=0;

	for(var i=0; i<tweet_array.length; ++i){
		if(tweet_array[i].source === "completed_event"){
			switch(tweet_array[i].activityType){
				case "ski run":
					++ski.count;
					break;
				case "run":
					++run.count;
					break;
				case "nordic walk":
					++nordic.count;
					break;
				case "walk":
					++walk.count;
					break;
				case "mtn bike":
					++mtnbike.count;
					break;
				case "bike":
					++bike.count;
					break;
				case "swim":
					++swim.count;
					break;
				case "CrossFit\u00ae":
					++crossfit.count;
					break;
				case "hike":
					++hike.count;
					break;
				case "elliptical workout":
					++elliptical.count;
					break;
				case "strength workout":
					++strength.count;
					break;
				case "spinning workout":
					++spinning.count;
					break;
				case "circuit workout":
					++circuit.count;
					break;
				case "bootcamp workout":
					++bootcamp.count;
					break;
				case "core workout":
					++core.count;
					break;
				case "group workout":
					++group.count;
					break;
				case "barre workout":
					++barre.count;
					break;
				case "row":
					++row.count;
					break;
				case "MySports Freestyle":
					++freestyle.count;
					break;
				case "activity":
					++activity.count;
					break;
				case "yoga practice":
					++yoga.count;
					break;
				case "skate":
					++skate.count;
					break;
				case "chair ride":
					++chair.count;
					break;
				case "snowboard":
					++snowboard.count;
					break;
				case "stairmaster / stepwell workout":
					++stair.count;
					break;
				case "meditation":
					++meditation.count;
					break;
				case "pilates session":
					++pilates.count;
					break;
				case "boxing / MMA":
					++boxing.count;
					break;
				case "sports":
					++sports.count;
					break;
				case "MySports Gym":
					++gym.count;
					break;
				case "dance":
					++dance.count;
					break;
				default:
					++unaccounted;
					break;
			}
		}
	}

	var activities = [];
	activities.push(run,nordic,walk,mtnbike,bike,swim,crossfit,hike,elliptical,strength,spinning,
	circuit,bootcamp,core,group,barre,row,ski,freestyle,activity,yoga,skate,chair,snowboard,stair,
	meditation,pilates,boxing,sports,gym,dance);
	activities.sort(function(a, b){return b.count-a.count});	// sorting descending count order

	$('#numberActivities').text(activities.length);
	$('#firstMost').text(activities[0].type);
	$('#secondMost').text(activities[1].type);
	$('#thirdMost').text(activities[2].type);
	console.log(unaccounted,"= unaccounted for activities.");

	// ACTIVITY=Y, COUNT=X
	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v2.6.0.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": activities
	  },
	  //TODO: Add mark and encoding
	  "encoding": {
	  	"y": {"field": "type", "type": "ordinal"},
    	"x": {"field": "count", "type": "quantitative"}
      },
	  "layer": [
	    {"mark": "bar"},
	    {"mark": 
	    	{
		      "type": "text",
		      "align": "left",
		      "baseline": "middle",
		      "dx": 3
		  	},
	    	"encoding": {"text": {"field": "count", "type": "quantitative"}}
	  	}
	  ]
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});


	// place dist_counter in run, walk and bike. parse distances in tweet.ts
	// check that its a comp event first 
	for(var i=0; i<tweet_array.length; ++i){
		switch(tweet_array[i].activityType){
			case "run":
				run.dist_count += tweet_array[i].distance;
				break;
			case "walk":
				walk.dist_count += tweet_array[i].distance;
				break;
			case "bike":
				bike.dist_count += tweet_array[i].distance;
				break;
			default:
				break;
		}
	}
	var mean_distances = [];
	mean_distances.push(run);
	mean_distances.push(walk);
	mean_distances.push(bike);
	// mean distances in descending order
	mean_distances.sort(function(a, b){return (b.dist_count/b.count)-(a.dist_count/a.count)})
	//mean_distances.push(math.format((run.dist_count/run.count), {notation: 'fixed', precision: 2}));
	$('#longestActivityType').text(mean_distances[0].type);
	$('#shortestActivityType').text(mean_distances[mean_distances.length-1].type);

	var sunday={dist:0,count:0,day:"Sunday"},saturday={dist:0,count:0,day:"Saturday"},
	friday={dist:0,count:0,day:"Friday"},thursday={dist:0,count:0,day:"Thursday"},
	wednesday={dist:0,count:0,day:"Wednesday"},tuesday={dist:0,count:0,day:"Tuesday"},
	monday={dist:0,count:0,day:"Monday"};
	for(var i=0; i<tweet_array.length; ++i){
		if(tweet_array[i].activityType === mean_distances[0].type){
			switch(tweet_array[i].time.getDay()){
				case 0:
					sunday.dist += tweet_array[i].distance;
					++sunday.count;
					break;
				case 6:
					saturday.dist += tweet_array[i].distance;
					++saturday.count;
					break;
				case 5:
					friday.dist += tweet_array[i].distance;
					++friday.count;
					break;
				case 4:
					thursday.dist += tweet_array[i].distance;
					++thursday.count;
					break;
				case 3:
					wednesday.dist += tweet_array[i].distance;
					++wednesday.count;
					break;
				case 2:
					tuesday.dist += tweet_array[i].distance;
					++tuesday.count;
					break;
				case 1:
					monday.dist += tweet_array[i].distance;
					++monday.count;
					break;
			}
		}
	}
	var days = [];
	days.push(sunday);
	days.push(saturday);
	days.push(friday);
	days.push(thursday);
	days.push(wednesday);
	days.push(tuesday);
	days.push(monday);
	// mean distances for days in descending order
	days.sort(function(a, b){return (b.dist/b.count)-(a.dist/a.count)});
	$('#weekdayOrWeekendLonger').text(days[0].day);

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.

	var graph2 = [];
	for(var i=0; i<tweet_array.length; ++i){
		if(tweet_array[i].source === "completed_event"){
			if(tweet_array[i].activityType === "run" || tweet_array[i].activityType === "walk" || tweet_array[i].activityType === "bike")
				//var day = convertDay(tweet_array[i].time.getDay());
				//console.log(typeof day);
				graph2.push({
					"distance (km)":tweet_array[i].distance,
					"activity type":tweet_array[i].activityType,
					"day":convertDay(tweet_array[i].time.getDay()) // convertDay(tweet_array[i].time.getDay())
				});
				//console.log(graph2[i].day);
		}
	}
	graph2_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
	  "description": "A scatterplot showing horsepower and miles per gallons.",
	  "width": 200,
	  "height": 200,
	  "data": {"values": graph2},
	  "mark": "circle",
	  "encoding": {
	    "x": {"field": "day", "type": "nominal", "sort": ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},
	    "y": {"field": "distance (km)", "type": "quantitative"},
	    "color": {"field": "activity type", "type": "nominal"},
	    "shape": {"field": "activity type", "type": "nominal"}
	  }
	}
	vegaEmbed('#distanceVis', graph2_vis_spec, {actions:false});

	graph3_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
	  "description": "A scatterplot showing horsepower and miles per gallons.",
	  "width": 200,
	  "height": 200,
	  "data": {"values": graph2},
	  "mark": "point",
	  "encoding": {
	    "x": {"field": "day", "type": "nominal", "sort": ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},
	    "y": {"aggregate": "mean", "field": "distance (km)", "type": "quantitative"},
	    "color": {"field": "activity type", "type": "nominal"},
	    "shape": {"field": "activity type", "type": "nominal"}
	  }
	}
}
function switchGraph(){
	var count=0;
	$("#aggregate").click(function(){
		if($("#aggregate").text() === "Show means"){
			$("#aggregate").text("Show all activities");
			$("#distanceVis").toggle();
			if(count==0){
				++count;
				vegaEmbed('#distanceVisAggregated', graph3_vis_spec, {actions:false});
			}
			else
				$("#distanceVisAggregated").toggle();
		}
		else if($("#aggregate").text() === "Show all activities"){
			$("#aggregate").text("Show means");
			$("#distanceVisAggregated").toggle();
			$("#distanceVis").toggle();
		}
	})
}
//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});
$(document).ready(function() {
	switchGraph();
});