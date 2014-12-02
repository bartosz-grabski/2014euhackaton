var mongoClient = require('mongodb').MongoClient;
var dbConfig = require('../db/dbConfig.json');


var config = {};

mongoClient.connect('mongodb://' + dbConfig["dbHost"] + ":" + dbConfig["dbPort"] + "/" + dbConfig["dbDatabase"], function(err,db) {
	if (err) {
		console.log("Error connecting to database");
	} else {
		console.log("Connected to database");
		config.db = db;
	}
});


var index = function (req, res) {
    res.render('index');
};

var dashboard = function (req, res) {
    res.render('dashboard');
}

var home = function (req,res) {
	res.render('home');
}

var members = function (req,res) {

	config.db.collection('meps').find().toArray(function(err,docs) {
		if (err) {
			console.log("Error getting meps collection");
		} else {
			res.send(docs);
		}
	});
}

var member = function (req, res) {

	var id = req.param('id');

	config.db.collection('meps').find({"mepinfo.mepid":id}).toArray(function(err,docs) {
		if (err) {
			console.log("Error fetching MEP with id"+id);
		} else {
			res.send(docs[0]);
		}
	});

}


module.exports = {
    index: index,
    dashboard: dashboard,
    home: home,
    members: members,
    member: member
};
