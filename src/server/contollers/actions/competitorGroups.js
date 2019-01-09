let baseAction = require("./baseAction");

let competitorGroups = new baseAction();
competitorGroups.setTable("competitor_groups");

module.exports = competitorGroups.queries;