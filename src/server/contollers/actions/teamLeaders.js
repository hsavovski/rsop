let baseAction = require("./baseAction");

let teamLeaders = new baseAction();
teamLeaders.setTable("team_leaders");

module.exports = teamLeaders.queries;