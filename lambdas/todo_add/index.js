// dependencies
var AWS = require("aws-sdk");
var uniq = require('uniqid');

var docClient = new AWS.DynamoDB.DocumentClient();

const table = "todos";
    
exports.handler = function(event, context, callback) {
	let content = event.content;
	if (content === undefined){
		content = " "
	}
	insertData(content, (err, result) => {
		if (err){
			context.fail('Error in insert: ' + err);
		}else {
			context.succeed({
				success: true,
				data: result
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