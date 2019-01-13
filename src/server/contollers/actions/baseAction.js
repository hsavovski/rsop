let AppModel = require('../../models/App');
let Queue = require('../utils/Queue').Queue;
let structure = require("./structure.json");

module.exports = function()
{
    this.setTable = function(name)
    {
        this.table = name;
     
        this.columns = structure[this.table];  
    }

    this.queries = {

        all:(req, res) => {
            var query =
                "SELECT * " 
                + "from " + this.table 
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
                "SELECT * "
                + "from " + this.table
                + " where id = " + req.params.id + " "
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
            var elements = req.body;

            let input = "";
            let columns = "";
            this.columns.forEach(el =>{
                if(elements[el] != null)
                {
                    input += "'" + elements[el] + "',"
                    columns += "`" + el + "`,"
                }
                else{

                }
            })
            
            if(input[input.length-1] == ",")
            {
                input = input.slice(0,input.length-1);
            }

            if(columns[columns.length-1] == ",")
            {
                columns = columns.slice(0,columns.length-1);
            }

            var query =
                "INSERT INTO " + this.table
                + " (" + columns + ") "
                + "VALUES ( "
                + input
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
                                {err:"entry_exists"}
                            );
                            return;
                        }
                        throw err;
                    }
                    
                    elements.id = result.insertId;
                    res.json(elements);
                }
            );

        },
        
        update:(req, res) => {
            var body = req.body;
            var query = 
            "UPDATE " + this.table 
            + " SET";
        
            this.columns.forEach((name) => 
            {
                if(body[name] != null)
                {
                    query += " `" + name + "` = '" + body[name] + "'," 
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

        // delete:(req,res) => {
        //     var query =
        //     "SELECT * "
        //     + "from `universities` "
        //     + "and u.id = " + req.params.id + " "
        //     + ";";
            
        // console.log(query);
        // AppModel.connection.query( query,
        //     function(err, result)
        //     {
        //         if(err)
        //             throw err;

        //         res.json(result[0]);
        //     }
        // );
        // }

    };
}
