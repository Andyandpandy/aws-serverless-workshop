// dependencies
var AWS = require('aws-sdk');

// Get reference to AWS clients
var dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
	getData(function(err,dataSuccess,actualdata){
		if (err) {
			callback('Error in get: ' + err, null);
		}else {
		
			callback(null, {
				error: err,
				success: dataSuccess,
				data: actualdata
			});
		}
	});
};

const getData = (fn) => { 
	var params = {
    	TableName : "todos",
    };
    dynamodb.scan(params, function(err, data) {
		if (err) fn(err, false, null); 
		else fn(null, true, data); 
	});
};

	
    

