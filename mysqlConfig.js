/**
 * Created by ico on 09.03.17.
 */
var config = {
	"host":"127.0.0.1", 
	"user":"rsop",
	"password":"rsop",
	"database":"RSOP"
};

var adminConfig = Object.assign({}, config, {
schema:{
    tableName:'admin_sessions'
}
});
var privateConfig = Object.assign({}, config,{
schema:{
    tableName: 'private_sessions'
}
});

// Return Array of Configurations

module.exports = [adminConfig,privateConfig,config];
