var AWS = require('aws-sdk');

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "todos";

exports.handler = (event, context, callback) => {
    const content = event.content;
    const tid = event.tid;
    const timestamp = event.timestamp;

    updateData(tid, timestamp, content, function(err,result){
		if (err) {
			
			//context.fail('Error in get: ' + err);
			callback(err, null);
		}else {
    		//context.succeed(result);
    		callback(null, result);
		}
	});
};


const updateData = (tid, timestamp, content, fn) => {
    var params = {
        TableName:table,
        Key:{
            "tid": tid,
            "timestamp": timestamp
        },
        UpdateExpression: "set content = :c",
        ExpressionAttributeValues:{
            ":c": content
        },
        ReturnValues:"UPDATED_NEW"
    };
    
    console.log("Update " + tid + " new item...");
    docClient.update(params, function(err, data) {
        if (err) {
            fn("Unable to update item. Error JSON:" + JSON.stringify(err, null, 2), null);
        } else {
            fn(null, data);
        }
    });
};