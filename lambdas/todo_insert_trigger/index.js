var AWS = require('aws-sdk');

var lambda = new AWS.Lambda({
  region: 'eu-west-1' //change to your region
});

console.log('Loading function');

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    event.Records.forEach((record) => {
        console.log(record.dynamodb);
        if(record.eventName === "INSERT"){
          if (record.dynamodb.NewImage.content !== undefined){
            record.dynamodb.NewImage.content = "Todo: " + record.dynamodb.NewImage.content.S;
            lambda.invoke({
              FunctionName: 'todo_update',
              Payload: JSON.stringify({ "tid":record.dynamodb.NewImage.tid.S , "timestamp":record.dynamodb.NewImage.timestamp.S, "content":record.dynamodb.NewImage.content }, null, 2) // pass params
            }, function(error, data) {
              if (error) {
                callback('Error: ' + error, null);
              }
              if(data.Payload){
               callback(null, data.Payload)
              }
            });
          } 
        }
        console.log('DynamoDB Record: %j', record.dynamodb);
        
    });
    return `Successfully processed ${event.Records.length} records.`;
};
