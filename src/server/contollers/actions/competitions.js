let baseAction = require("./baseAction");

let competitions = new baseAction();
competitions.setTable("competitions");

module.exports = competitions.queries;