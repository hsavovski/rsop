let baseAction = require("./baseAction");
let AppModel = require('../../models/App');
let fs = require('fs');
let problems = new baseAction();
problems.setTable("problems");
problems.queries.create = (req,res) => {

    var elements = req.body;

    let input = [];
    placeholders = '';
    let columns = "";
    problems.columns.forEach(el =>{
        if(elements[el] != null)
        {
            input.push(elements[el]);
            placeholders += " ? ,"
            columns += "`" + el + "`,";
        }
        else{

        }
    })
    
    if(placeholders[placeholders.length-1] == ",")
    {
        placeholders = placeholders.slice(0,placeholders.length-1);
    }

    if(columns[columns.length-1] == ",")
    {
        columns = columns.slice(0,columns.length-1);
    }

    var query =
        "INSERT INTO " + problems.table
        + " (" + columns + ") "
        + "VALUES ( "
        + placeholders
        + ");";

    console.log(query , input);

    AppModel.connection.query( query, input,
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
            ['text','tests','solution'].forEach(name =>{
                let oldpath = '/tmp/upload_' + name;
                let newpath = './assets/public/files/' + name + '-' + elements.id + '.pdf';
                fs.copyFile(oldpath, newpath, (err) => {
                    if (err) throw err;
                    fs.unlink(oldpath, (err) => {
                        if (err) throw err;

                        console.log('$olpath was moved to $newpath');
                      });    
                });
            });

            res.json(elements);
        }
    );
};
module.exports = problems.queries;