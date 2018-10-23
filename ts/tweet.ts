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
        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}