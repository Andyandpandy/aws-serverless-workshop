// dependencies
var AWS = require("aws-sdk");
var uniq = require('uniqid');

var docClient = new AWS.DynamoDB.DocumentClient();

var lambda = new AWS.Lambda({
  region: 'eu-west-1' //change to your region
});

const table = "todos";

module.exports.handler = (event, context, callback) => {
  let content = JSON.parse(event.body).content;
	console.log(content);
	if (content === undefined){
		content = " "
	}
	insertData(content, (err, result) => {
		if (err){
			callback('Error in insert: ' + err, null);
		}else {
			callback(null, { statusCode: 200, 
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(
        { success: true, data: result })
        });
		}
	});
};

const insertData = (content, fn) => {
	var id = uniq();
    var timestamp = Date.now();
	var params = {
    	TableName:table,
    	Item:{
	        "tid": id,
	        "timestamp": timestamp.toString(),
	        "content":content
	    }
	};
	
	console.log("Adding a new item...");
	docClient.put(params, function(err, data) {
	    if (err) fn("Unable to add item. Error JSON: " + JSON.stringify(err, null, 2), null);
		else fn(null, data);
	});
};