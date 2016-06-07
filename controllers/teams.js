var express = require('express');
var fs = require('fs');
var router = express.Router();

function getTeams() {
  var teams = fs.readFileSync('./models/data.json');
  return JSON.parse(teams);
}

function setTeams(teamData) {
  fs.writeFileSync('./models/data.json', JSON.stringify(teamData));
}

router.get('/', function(req, res) {
  var teams = getTeams();
  res.render('teams/index', { teams: teams });
});

router.post('/', function(req, res) {
  var teams = getTeams();
  var newTeam = req.body;

  teams.push(newTeam);
  setTeams(teams);

  res.redirect('/teams');
});

router.get('/new', function(req, res) {
  res.render('teams/new');
});

router.get('/:name', function(req, res) {
  // search for the team name in all the teams.
  var teams = getTeams();
  var team = {};

  for (var i = 0; i < teams.length; i++) {
    if (teams[i].name === req.params.name) {
      team = teams[i];
    }
  }
  res.render('teams/show', { team: team });
});

router.delete('/:name', function(req, res) {
  var teams = getTeams();
  var index = -1;
  var team = null;

  for (var i = 0; i < teams.length; i++) {
    if (teams[i].name === req.params.name) {
      index = i;
      team = teams[i];
    }
  }

  teams.splice(index, 1);
  res.send({ teams: teams, deleted: team });
});

module.exports = router;
