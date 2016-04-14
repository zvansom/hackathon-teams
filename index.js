var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);    
app.use(express.static(__dirname + '/static'));


var teams = [
  {name: "Burrito Nullito", members: "Chris, Jessica, Dan"},
  {name: "Undefined Yet Refined", members: "Abe, Ada, Al"},
  {name: "Totally Human", members: "CX-37, B088, NarFleep"}
];

app.get('/', function(req, res) {
  res.render("index");
});

app.get('/teams', function(req, res) {
  res.render("teams", {teams: teams});
});

app.post('/teams', function(req, res) {
  var team = req.body;
  teams.push(team);
  res.redirect("/teams");
});

app.get('/teams/new', function(req, res) {
  res.render("new");
});

app.get('/teams/:name', function(req, res) {
  // search for the team name in all the teams.
  var team = undefined;
  for(var i = 0; i < teams.length; i++) {
    if (teams[i].name === req.params.name) {
      team = teams[i];
    }
  }

  // return the team that we found with the name.
  res.render("team", {team: team});
});

app.delete('/teams/:id', function(req, res) {
  var index = parseInt(req.params.id, 10);
  teams.splice(index, 1);
  res.redirect("/teams");
});

app.listen(3000);
