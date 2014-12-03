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

var disobiedence = function (req, res, mepid) {
	var id = req.param('id');
	
	config.db.collection('meps').find({"mepinfo.mepid":id}).toArray(function(err,docs) {
		if (err) {
			console.log("Error fetching MEP with id"+id);
		} else {
			mep = docs[0];
		}
	});
	
	var map = function () {
		for(i in this.voteinfo.votes) {
			var v = voteinfo.votes[i]
			//emit(v.mepid,)
		}
		
		//mep.mepinfo.group
	}
}

var votes = function (req, res) {
	var id = req.param('id');	
	
	var map = function () {
		for(i in this.voteinfo.votes.vote) {
			var v = this.voteinfo.votes.vote[i];
			emit(v.mepid, 1);
		}
	}
	
	var reduce = function (key, values)  {
		return {'mepid': key, 'votes': values.length};
	}
	
	config.db.collection('votes_per_mep').count(function (err, count) {
		if (err) {
		} else if (count == 0) {
			config.db.collection('votes').mapReduce(map, reduce, {out: { replace: 'votes_per_mep' }});
		}
	});
		
	
	config.db.collection('votes_per_mep').find({'value.mepid' : id}).toArray(function(err,docs) {
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
    member: member,
	votes: votes
};
