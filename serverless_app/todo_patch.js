// dependencies
var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient();

const table = "todos";


module.exports.handler = (event, context, callback) => {
    const body = JSON.parse(event.body)
    const content = body.content;
      const tid = body.tid;
      const timestamp = body.timestamp;
  
      updateData(tid, timestamp, content, function(err,result){
          if (err) {
              
              //context.fail('Error in get: ' + err);
              callback(err, null);
          }else {
              //context.succeed(result);
              callback(null, { statusCode: 200, 
            headers: {
              "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
              "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(result)});
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