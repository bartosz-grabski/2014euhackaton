var dbConfig = require('./dbConfig.json');
var mongoClient = require('mongodb').MongoClient;

var config = {};

mongoClient.connect('mongodb://' + dbConfig["dbHost"] + ":" + dbConfig["dbPort"] + "/" + dbConfig["dbDatabase"], function(err,db) {
	if (err) {
		console.log("Error connecting to database");
	} else {
		console.log("Connected");
		config.db = db;
	}
});


module.exports = { db : config,
	getDb : function() { return config.db }
 };