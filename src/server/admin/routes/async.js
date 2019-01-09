var express = require('express');
var router = express.Router();


//-----------------------------------------------------------------------------
//                                 UNIVERSITIES
//-----------------------------------------------------------------------------

var universities = require("../../contollers/actions/universities.js");
router.route('/universities').get(universities.all);
router.route('/universities/:id').get(universities.one);
router.route('/universities').post(universities.create);
router.route('/universities/:id').patch(universities.update);
// router.route('/universities/:id').delete(universities.delete);

//-----------------------------------------------------------------------------
//                                 COMPETITORS
//-----------------------------------------------------------------------------

var competitors = require("../../contollers/actions/competitors.js");
router.route('/competitors').get(competitors.all);
router.route('/competitors/:id').get(competitors.one);
router.route('/competitors').post(competitors.create);
router.route('/competitors/:id').patch(competitors.update);
// router.route('/competitors/:id').delete(competitors.delete);

//-----------------------------------------------------------------------------
//                                 COMPETITIONS
//-----------------------------------------------------------------------------

var competitions = require("../../contollers/actions/competitions.js");
router.route('/competitions').get(competitions.all);
router.route('/competitions/:id').get(competitions.one);
router.route('/competitions').post(competitions.create);
router.route('/competitions/:id').patch(competitions.update);
// router.route('/competitions/:id').delete(competitions.delete);

//-----------------------------------------------------------------------------
//                                 COMPETITOR GROUPS
//-----------------------------------------------------------------------------

var compGroups = require("../../contollers/actions/competitorGroups.js");
router.route('/competitorGroups').get(compGroups.all);
router.route('/competitorGroups/:id').get(compGroups.one);
router.route('/competitorGroups').post(compGroups.create);
router.route('/competitorGroups/:id').patch(compGroups.update);
// router.route('/competitorGroups/:id').delete(compGroups.delete);

//-----------------------------------------------------------------------------
//                                 PROBLEMS
//-----------------------------------------------------------------------------

var problems = require("../../contollers/actions/problems.js");
router.route('/problems').get(problems.all);
router.route('/problems/:id').get(problems.one);
router.route('/problems').post(problems.create);
router.route('/problems/:id').patch(problems.update);
// router.route('/problems/:id').delete(problems.delete);

//-----------------------------------------------------------------------------
//                                 TEAM LEADERS
//-----------------------------------------------------------------------------

var teamLeaders = require("../../contollers/actions/teamLeaders.js");
router.route('/teamLeaders').get(teamLeaders.all);
router.route('/teamLeaders/:id').get(teamLeaders.one);
router.route('/teamLeaders').post(teamLeaders.create);
router.route('/teamLeaders/:id').patch(teamLeaders.update);
// router.route('/teamLeaders/:id').delete(teamLeaders.delete);

//-----------------------------------------------------------------------------
//                                 TEAMS
//-----------------------------------------------------------------------------

var teams = require("../../contollers/actions/teams.js");
router.route('/teams').get(teams.all);
router.route('/teams/:id').get(teams.one);
router.route('/teams').post(teams.create);
router.route('/teams/:id').patch(teams.update);
// router.route('/teams/:id').delete(teams.delete);

//-----------------------------------------------------------------------------
module.exports = router
