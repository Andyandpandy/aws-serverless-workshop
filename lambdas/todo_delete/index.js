// dependencies
var AWS = require('aws-sdk');

// Get reference to AWS clients
var docClient = new AWS.DynamoDB.DocumentClient();

const table = "todos";

exports.handler = (event, context, callback) => {
    
    const tid = event.tid;
    const timestamp = event.timestamp;
    
    deleteTodo(tid, timestamp, (err, result) => {
       if (err){
           callback(err, null);
       }else {
           callback(null, result);
       }
    });
};

const deleteTodo = (tid, timestamp, fn) => {
    var params = {
        TableName:table,
        Key:{
            "tid": tid,
            "timestamp": timestamp
        }
    };

    console.log("Attempting to delete " + tid + "...");
    docClient.delete(params, function(err, data) {
        if (err) fn("Unable to delete item. Error JSON:" + JSON.stringify(err, null, 2), null);
        else fn(null, { success: true });
    });
};