let AppModel = require('../../models/App');
let Queue = require('../utils/Queue').Queue;
let formidable = require('formidable');
let fs = require('fs');

module.exports = {
    post:(req, res) => {
        
    },
    temp:(req, res) => {
        
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            
            let name = Object.keys(files)[0];
            let type = files[name].type;
            let oldpath = files[name].path;
            let newpath = '/tmp/upload_' + name;
            console.log(name, type, oldpath, newpath)
            if(type == 'application/pdf')
            {
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                    console.log('File renamed');
                });
            }
        });
        res.send('');
    }
};