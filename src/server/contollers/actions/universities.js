let baseAction = require("./baseAction");

let universities = new baseAction();
universities.setTable("universities");

module.exports = universities.queries;