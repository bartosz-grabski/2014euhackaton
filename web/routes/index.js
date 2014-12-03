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

var disobedience = function (req, res) {
	var id = req.param('id');	
	var mepgroup = {};
	mepgroup.ref = {};
	
	config.db.collection('meps').aggregate([{$group : {_id : "$mepinfo.mepid", total : {$push : "$mepinfo.group"}}}], function(err,docs) {
		if (err) {
			console.log("Error fetching MEP with id"+id);
		} else {
			for(d in docs) {
				var doc = docs[d]
				config.db.collection('mepgroup').insert(doc)
			}
		}
	});
	
	
	var map = function () {
		for(var i in this.voteinfo.votes.vote) {
			var vote = this.voteinfo.votes.vote[i];
			var epref = this.voteinfo.epref;
			var mepid = this.vote.mepid
			var group = db.mepgroup.find[mepid];
			var mepvote = this.vote.mepvote
			
			emit({'epref': epref, 'group':group}, {'mepid': mepid, 'mepvote': mepvote});
		}
	} 
	
	
	var reduce = function (key, values)  {
		var discipline = {}
		var partyDiscipline = null;
		for (var v in values) {
			var value = values[v]
			
			if (value['mepvote'] in discipline) {
				discipline[value['mepvote']] += 1;
			} else {
				discipline[value['mepvote']] = 1;
			}
		}
		
		for (var property in discipline) {
			if (discipline.hasOwnProperty(property)) {
				if (2*discipline[property] > values.length) {
					partyDiscipline = discipline[property];
				}
			}
		}
		
		var rebels = []
		
		if (partyDiscipline != null) {
			for (var v in values) {
				var value = values[v]
				if (value.mepvote != partyDiscipline) {
					rebels.push(value[mepid])
				}
			}
		}
		
		return {'epref' : epref, 'rebels': rebels}
	}
	
	var map2 = function () {
		for (var r in this.rebels) {
			var rebel = this.rebels[r]
			
			emit(rebel, 1)
		}
	}
	
	var reduce2 = function (key, values) {
		return {'mepid': key, 'rebels': values.length};
	}
	
	config.db.collection('rebels_per_mep').count(function (err, count) {
		if (err) {
		} else if (count == 0) {
			config.db.collection('votes').mapReduce(map, reduce, {out: { replace: 'rebels_per_mep' }});
			config.db.collection('rebels_per_mep').mapReduce(map2, reduce2, {out: { replace: 'rebels_per_mep' }});
		}
	});
		
	
	config.db.collection('rebels_per_mep').find({'value.mepid' : id}).toArray(function(err,docs) {
		if (err) {
			console.log("Error fetching MEP with id"+id);
		} else {
			res.send(docs[0]);
		}
	});
}

var votes = function (req, res) {
	var id = req.param('id');	
	
	var map = function () {
		for(var i in this.voteinfo.votes.vote) {
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
			if (docs.length > 0) {
				res.send(docs[0]);
			} else {
				res.send(0);
			}
		}
	});	
}


module.exports = {
    index: index,
    dashboard: dashboard,
    home: home,
    members: members,
    member: member,
	votes: votes,
	disobedience: disobedience
};
