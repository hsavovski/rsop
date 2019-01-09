let baseAction = require("./baseAction");

let competitors = new baseAction();
competitors.setTable("competitors");

module.exports = competitors.queries;