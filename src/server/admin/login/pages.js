let express = require("express");
let router = express.Router();

let login = require('./login.js');

router.get('/login', function(req, res){
    if(req.session && req.session.adminId){
        res.redirect("/admin/");
    }else{
        login.index(req,res);
    }
});

router.route('/login').post(login.login);

router.all('/*', function(req, res, next){
    if(req.session && req.session.adminId){
        next();
    }else{
        res.status(401).redirect('/admin/login');
    }
});

router.route('/logout').all(login.logout);

module.exports = router;
