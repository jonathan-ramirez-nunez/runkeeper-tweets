class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        var sub_text = this.text.substr(0,15);

        if(sub_text.startsWith("Just completed") || sub_text.startsWith("Just posted")){
            return "completed_event";
        }
        else if(sub_text.startsWith("Achieved")){
            return "achievement";
        }
        else if(sub_text.startsWith("Watch my")){
            return "live_event";
        }
        return "miscellaneous";
        // return "unknown";
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //return false;
        //TODO: identify whether the tweet is written

        //var hyphen_occurrences = this.text.match(/-/g).length;
        if(this.text.includes("-") && !(this.text.includes("TomTom")) ){
            return true;
        }
        return false;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        var writtentext_start = this.text.indexOf("-");
        var writtentext_end = this.text.indexOf(" http");
        var writtentext = this.text.substr(writtentext_start, writtentext_end);
        return writtentext;
        //return "";
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        if(this.text.includes(" ski run ") ){
            return "ski run";
        }
        else if(this.text.includes(" run ") ){
            return "run";
        }
        else if(this.text.includes(" nordic walk ") ){
            return "nordic walk";
        }
        else if(this.text.includes(" walk ") ){
            return "walk";
        }
        else if(this.text.includes(" mtn bike ") ){
            return "mtn bike";
        }
        else if(this.text.includes(" bike ") ){
            return "bike";
        }
        else if(this.text.includes(" swim ") ){
            return "swim";
        }
        else if(this.text.includes(" CrossFit\u00ae ") ){
            return "CrossFit\u00ae";
        }
        else if(this.text.includes(" hike ") ){
            return "hike";
        }
        else if(this.text.includes(" elliptical workout ") ){
            return "elliptical workout";
        }
        else if(this.text.includes(" strength workout ") ){
            return "strength workout";
        }
        else if(this.text.includes(" spinning workout ") ){
            return "spinning workout";
        }
        else if(this.text.includes(" circuit workout ") ){
            return "circuit workout";
        }
        else if(this.text.includes(" bootcamp workout ") ){
            return "bootcamp workout";
        }
        else if(this.text.includes(" core workout ") ){
            return "core workout";
        }
        else if(this.text.includes(" group workout ") ){
            return "group workout";
        }
        else if(this.text.includes(" barre workout ") ){
            return "barre workout";
        }
        else if(this.text.includes(" row ") ){
            return "row";
        }
        else if(this.text.includes(" MySports Freestyle ") ){
            return "MySports Freestyle";
        }
        else if(this.text.includes(" activity ") ){
            return "activity";
        }
        else if(this.text.includes(" yoga practice ") ){
            return "yoga practice";
        }
        else if(this.text.includes(" skate ") ){
            return "skate";
        }
        else if(this.text.includes(" chair ride ") ){
            return "chair ride";
        }
        else if(this.text.includes(" snowboard ") ){
            return "snowboard";
        }
        else if(this.text.includes(" stairmaster / stepwell workout ") ){
            return "stairmaster / stepwell workout";
        }
        else if(this.text.includes(" meditation ") ){
            return "meditation";
        }
        else if(this.text.includes(" pilates session ") ){
            return "pilates session";
        }
        else if(this.text.includes(" boxing / MMA ") ){
            return "boxing / MMA";
        }
        else if(this.text.includes(" sports ") ){
            return "sports";
        }
        else if(this.text.includes(" MySports Gym ") ){
            return "MySports Gym";
        }
        else if(this.text.includes(" dance ") ){
            return "dance";
        }
        return "";
    }

    get distance():number { // in km
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        var regex = /[0-9]/;
        //var regex = /^[0-9]$/;
        //var regex = new RegExp('[0-9]');
        var first_digit = this.text.match(regex);
        console.log(first_digit);
        var index_start = this.text.indexOf(first_digit[0]);   //still work if first_digit is a number?
        var return_dist = 0;
        
        if(this.activityType === "run"){    
            var index_end = this.text.indexOf(" run ");
            var distance = this.text.substr(index_start, index_end);   // "1.02 km"
            var distance_arr = distance.split(" "); // [1.02, km]
            if(distance_arr[1] == "mi"){
                return_dist = Number(distance_arr[0]) * 1.609; 
            }
            else{ // make km str to number
                return_dist = Number(distance_arr[0]) * 1;
            }
        }
        else if(this.activityType === "walk"){
            var index_end = this.text.indexOf(" walk ");
            var distance = this.text.substr(index_start, index_end);   // "1.02 km"
            var distance_arr = distance.split(" "); // [1.02, km]
            if(distance_arr[1] == "mi"){
                return_dist = Number(distance_arr[0]) * 1.609; 
            }
            else{
                return_dist = Number(distance_arr[0]) * 1;
            }
        }
        else if(this.activityType === "bike"){
            var index_end = this.text.indexOf(" bike ");
            var distance = this.text.substr(index_start, index_end);   // "1.02 km"
            var distance_arr = distance.split(" "); // [1.02, km]
            if(distance_arr[1] == "mi"){
                return_dist = Number(distance_arr[0]) * 1.609;
            }
            else{ 
                return_dist = Number(distance_arr[0]) * 1;   
            }
        }
        return return_dist;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}