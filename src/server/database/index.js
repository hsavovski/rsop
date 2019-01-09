var mysql = require('mysql');
var config = require('../../../mysqlConfig.js')[2];

class AppModel
{
	constructor()
	{
		this.connection = mysql.createConnection(
		config
		);
	}
}

module.exports = new AppModel();


