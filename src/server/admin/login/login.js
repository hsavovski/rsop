let bcrypt = require('bcryptjs');
let path = require('path');
var connection = require('../../models/App.js').connection;

module.exports = {

    index: function(req, res)
    {
        res.sendFile(path.resolve('assets') + "/public/admin/login.html");
    },

    login: function(req, res)
    {
        let username = req.body.username;
        let password = req.body.password;

		var query = 
            "SELECT * "
            + "FROM `administrators` "
            + "WHERE name = '" + username + "' "
            + "LIMIT 1;";
		
        console.log(query);
        
		connection.query(
			query,
			(err, users, fields) =>
			{
				if(err || users.length > 1 || users.length == 0)
				{
                    res.status(401).end();
				}
				else
				{
					users.forEach(user => {
						console.log(user.name);
						if(user != null)
						{
							if(bcrypt.compareSync(password, user.password)){
								console.info('login success!');
								req.session.adminId = user.id;
								res.status(200).end();
							}
						}
						else{
							console.info("No user with such name!");
							res.status(401).end();							
						}

					});
					if(req.session.adminId == null)
					{
						console.info('login failure!');
						res.status(401).end();
					}
				}
			}
		);
		// if(username  == "kobo" && password == "kobo")
		// {
        //     req.session.adminId = 1;
		// 	res.status(200).end();
		// }
        // else{
		// 	console.info('login failure!');
		// 	res.status(401).end();
		// }
    },

    logout: function(req, res)
    {
        req.session.destroy();
        res.redirect('/admin/login');
    }
};