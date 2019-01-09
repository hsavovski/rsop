let baseAction = require("./baseAction");

let teams = new baseAction();
teams.setTable("teams");

module.exports = teams.queries;