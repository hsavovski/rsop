let baseAction = require("./baseAction");

let problems = new baseAction();
problems.setTable("problems");

module.exports = problems.queries;