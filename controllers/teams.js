var express = require('express');
var fs = require('fs');
var teamService = require('../models/teamService');
var router = express.Router();

router.get('/', function(req, res) {
  var teams = teamService.allTeams();
  res.render('teams/index', { teams: teams });
});

router.post('/', function(req, res) {
  teamService.addTeam(req.body);

  res.redirect('/teams');
});

router.get('/new', function(req, res) {
  res.render('teams/new');
});

router.get('/:name', function(req, res) {
  // search for the team name in all the teams.
  const team = teamService.getTeam(req.params.name);

  res.render('teams/show', { team: team });
});

router.get('/:name/edit', (req, res) => {
  const team = teamService.getTeam(req.params.name);

  res.render('teams/edit', { team })
});

router.put('/:name/edit', (req, res) => {
  teamService.editTeam(req.params.name, req.body);
  res.send(200);
});

router.delete('/:name', (req, res) => {
  teamService.deleteTeam(req.params.name);
  res.send(200);
});

module.exports = router;
