// dependencies
var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient();

const table = "todos";

module.exports.handler = (event, context, callback) => {
      
      getData(function(err,dataSuccess,actualdata){
          if (err) {
              callback('Error in get: ' + err, null);
          }else {
          
              callback(null, { statusCode: 200, 
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify({
                  error: err,
                  success: dataSuccess,
                  data: actualdata
              }) });
          }
      });
  };


  const getData = (fn) => { 
	var params = {
    	TableName : "todos",
    };
    docClient.scan(params, function(err, data) {
		if (err) fn(err, false, null); 
		else fn(null, true, data); 
	});
};
