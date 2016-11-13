

// Problem: We need a simple way to look at a user's badge count and javascript points

//Solution: Use node.js to connect to Treehouse.API to get profile information to print

var https = require("https");
var username = 'prajayghaghda2'


// Print out message
function printMessage(username, badgeCount, points) {
	var message = username + " has " + badgeCount + " and a total of " + points;
	console.log(message);
}


//Print out error messages - Dealing with returns that aren't JSON objects
function printError(error) {
	console.error(error.message);
}

var request = https.get("https://teamtreehouse.com/" + username + ".json", function (response) {
	var body = ''
	console.log(response.statusCode)
	//read the data
	response.on('data', function (chunk)  {
    body += chunk;

	});
	
	// At the end of the request, the following function will run, making the json into 
	// something that can be parsed, and then accessed, using json pretty print to see
	// the exact structure of the json
	response.on('end', function () {
		if (response.statusCode === 200){
		try {
		var profile = JSON.parse(body);
		printMessage(username, profile.badges.length, profile.points.JavaScript)
	  }	catch(error) {
		// Parse Error 
		printError(error);
	  }	
	}  else {
		// Status Code Error
		printError({message: "There was an error getting the profile for " + username + https.STATUS_CODES});
		
		// to get the whole json data you can print like this - console.log(profile);
	}
	});
});

request.on("error", printError)






//Connect to the API url. (http://teamtreehouse.com/username.json)
//Read the data 
//Parse the data
//Print the data