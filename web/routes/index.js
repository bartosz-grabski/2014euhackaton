var User = require('../model/user.js');
var Poll = require('../model/poll.js');
var UserPoll = require('../model/user_poll.js');



var index = function (req, res) {
    res.render('index');
};

var dashboard = function (req, res) {
    res.render('dashboard');
}

var home = function (req,res) {
	res.render('home');
}


module.exports = {
    index: index,
    dashboard: dashboard,
    home: home
};
