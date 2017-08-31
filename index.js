var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
//app.use(express.bodyParser());
app.use(bodyParser.json());                        

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

console.log(__dirname);
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var pg = require('pg');
pg.defaults.ssl = true;
app.get('/', function(request, response) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * from USER_DETAILS', function(err, result) {
			done();
			if(err) {
				console.error(err); response.send("Error :" + err);
			}
			else {
				response.render('pages/index', {results:result.rows});
			}	
		});
	});

//  response.render('pages/index');
});
var count = 3000;
app.post('/confirm', (req, res) => {
	console.log(req.body.surname);
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		count = count + 1;
		var initial = 'M', statefull = "Ohio", browser = "CHROME", tc = "1", cctype="234", ccnum ="222", ccv="ccv";
		var expiry = "Sep";
		var command = "INSERT INTO USER_DETAILS VALUES("+
						count + ",'" + 	req.body.gender + "','" +
						req.body.nameset + "','" + 	req.body.title + "','" +
						req.body.givenname + "','" + initial + "','" +
						req.body.surname + "','" + req.body.streetaddr + "','" +
						req.body.city + "','" + 	req.body.state + "','" +
						statefull + "','" + 	req.body.zipcode + "','" +
						"OH" + "','" + req.body.country + "','" +
						req.body.email + "','" + req.body.username + "','" +
						req.body.password + "','"  + browser + "','" +
						req.body.telephone + "','" + tc + "','" +
						req.body.mothersmaiden + "','" + req.body.birthday + "'," +
						req.body.age + ",'" + cctype + "','" +
						ccnum + "','" + ccv + "','" + expiry + "','" + "Nationality" + "','" +
						"ups" + "','" + "431431" + "','" + "43143151" + "','" + "red" + "','" +
						req.body.occupation + "','" + req.body.company + "','" +
						req.body.vehicle + "','" + req.body.domain + "','" +  "4321514" + "','" +
						"43145315" + "','" + "43153155"
						+"')";
		console.log(command);
		client.query(command, function(err, result) {
			done();
			if(err) {
				console.error(err); res.send("Error :" + err);
			}
			else {
				res.render('pages/confirm');
			}	
		});
	});		
});
app.get('/cool', function(request, response) {
  response.send(cool());
});

app.get('/times', function(request, response) {
  var result = '';
  var times = process.env.TIMES || 5;
  for(i=0; i < times; i++) {
	result += i + ' ';
  }
  response.send(result);
});	
/*
app.get('/db', function(request, response) {
});*/
/*
pg.connect(process.env.DATABASE_URL, function(err, client) {
	if(err) throw err;
	console.log('Connected to postgres! Getting Schemes');
	client.query('SELECT  FROM USER_DETAILS;').on('row',function(row){
		console.log(JSON.stringify(row));
	});
});*/

app.listen(app.get('port'), function() {
  console.log('Sample log text for testing');
  console.log('Node app is running on port', app.get('port'));
});