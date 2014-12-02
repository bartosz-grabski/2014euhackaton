var dbConfig = require('./db/dbConfig.json');
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(app.router);


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


app.get('/',routes.index);
app.get('/views/home', routes.home);
app.get('/views/dashboard', routes.dashboard);

// REST API 

app.get('/members', routes.members);
app.get('/member/:id', routes.member);