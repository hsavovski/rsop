let bcrypt = require('bcryptjs');

let AppModel = require('../../models/App');
let Queue = require('../utils/Queue').Queue;

module.exports = {

    all:(req, res) => {
        var query =
            "SELECT u.id, u.username, u.password, u.enabled, pu.companyId "
            + "from `private_users` pu "
            + "JOIN users u on u.id = pu.user "
            + ";";
        console.log(query);
		AppModel.connection.query(
            query,
			function(err, result)
			{
				if(err)
					throw err;

				res.json(result);
			}
		);
    },

    one:(req, res) => {
        var query =
            "SELECT u.id, u.username, u.password, u.enabled, pu.companyId "
            + "from `private_users` pu "
            + "JOIN users u on u.id = pu.user "
            + "and u.id = " + req.params.id + " "
            + ";";
            
        console.log(query);
		AppModel.connection.query( query,
			function(err, result)
			{
				if(err)
					throw err;

				res.json(result[0]);
			}
		);
    },

    create:(req, res) => {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        var q = new Queue();

        q.finish = () => {
            res.json([user]);
        };

        q.add(() => {
            var query =
                "INSERT INTO `users` "
                + "(`username`, `password`, `enabled`) "
                + "VALUES ( "
                    + "'" + user.username + "', "
                    + "'" + user.password + "', "
                    + "'" + user.enabled + "'"
                + ");";

            console.log(query);

            AppModel.connection.query( query,
                function(err, result)
                {
                    if(err)
                    {
                        if(err.code == "ER_DUP_ENTRY")
                        {
                            res.json(
                                {err:"user_exists"}
                            );
                            return;
                        }
                        throw err;
                    }

                    delete user.password;
                    user.id = result.insertId;

                    q.next();
                }
            );
        }, [], null);

        q.add(() => {
            var query =
                "INSERT INTO `private_users` "
                + "(`user` , `companyId`) "
                + "VALUES ( "
                + "'" + user.id + "', "
                + "'" + user.companyId + "'"
                + ");";

            console.log(query);

            AppModel.connection.query( query,
                function(err, result)
                {
                    if(err)
                    {
                        if(err.code == "ER_DUP_ENTRY")
                        {
                            res.json(
                                {err:"user_exists"}
                            );
                            return;
                        }
                        throw err;
                    }

                    q.next();
                }
            );
        }, [], null);

        q.next();

    },
    
    disable:(req, res) => {
        var query = 
            "UPDATE `users` " +
                "SET `enabled` = 0 " + 
                "WHERE `id` = " + req.params.id + ";";

        console.log(query);
		AppModel.connection.query( query,
			function(err, result)
			{
				if(err)
					throw err;

                if(result.affectedRows > 0)
                {
				    res.json({done: true});
                }
                else
                {
                    res.json({done:false});
                }
			}
		);
    },
    
    update:(req, res) => {
        var body = req.body;
        var query = "UPDATE `users` SET";
        let names = ["username", "enabled", "password"];

        names.forEach((name) => 
        {
            if(body[name] != null)
            {
                if(name == "password")
                {
                    body[name] = bcrypt.hashSync(body[name]);
                }
                query += " `" + name + '` = "' + body[name] + '",' 
            }
        });

        if(query[query.length-1] == ",")
        {
            query = query.slice(0,query.length-1);
        }
        else
        {
            res.json({error:"no_values"})
        }

        query = query + " WHERE `id` = " + req.params.id;

        console.log(query);
		AppModel.connection.query( query,
			function(err, result)
			{
				if(err)
					throw err;

                if(result.affectedRows > 0)
                {
				    res.json(body);
                }
                else
                {
                    res.json({done:false});
                }
			}
		);
    },

    changePassword:(req, res) => {

        var body = req.body;
        var oldPassword = body.oldPassword,
            newPassword = body.newPassword;

        newPassword = bcrypt.hashSync(newPassword);

        var q = new Queue();

        q.finish = () => {
            res.json([user]);
        };

        q.add(() => {
            var query =
                "SELECT password "
                + "FROM `users` u  "
                + "WHERE u.id = '" + req.session.privateId + "' "
                + ";";

            console.log(query);

            AppModel.connection.query( query,
                function(err, result)
                {
                    if(err)
                    {
                        throw err;
                    }
                    if(bcrypt.compareSync(oldPassword, result[0].password)){
                        q.next();
                    }
                    else{
                        res.json({err:"incorrect password"});
                    }
                }
            );


        }, [], null);

        q.add(() => {
            var query =
                "UPDATE `users` SET "
                + ' `password` = "' + newPassword + '" '
                + "WHERE `id` = '" + req.session.privateId + "' "
                + ";";

            console.log(query);

            AppModel.connection.query( query,
                function(err, result)
                {
                    if(err)
                    {
                        throw err;
                    }
                    if(result.affectedRows > 0)
                    {
                        res.json({done:true});
                    }
                    else
                    {
                        res.json({done:false});
                    }
                }
            );


        }, [], null);

        q.next();
    },

    currentUser:(req, res) => {
        var id = req.session.privateId;
        var query =
            "SELECT u.id, u.username, u.password, u.enabled, pu.companyId "
            + "from `private_users` pu "
            + "JOIN users u on u.id = pu.user "
            + "and u.id = " + id + " "
            + ";";

        console.log(query);
        AppModel.connection.query( query,
            function(err, result)
            {
                if(err)
                    throw err;
                delete result[0].password;
                res.json(result[0]);
            }
        );
    }

};
