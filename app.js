let path = require('path');
let express = require('express');
let sessConfig = require('./sessionConfig.json');
let session = require('express-session');
let MySQLStore = require('express-mysql-session')(session);
let options = require('./mysqlConfig.js');
let adminStore = new MySQLStore(options[0]);

var isProduction = process.env.NODE_ENV === 'production';
var PORT = sessConfig.port;
if(process.argv.indexOf("--port") >= 0){
    PORT = process.argv[process.argv.indexOf("--port") + 1];
}

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//static folder for images and other data
app.use(express.static('assets/public'));

//admin session and routing

app.use('/admin*', session({
    cookieName: 'admin',
    secret: sessConfig.secret,
    cookie: {
        path: '/admin/',
        maxAge: 5*60*60*1000
    },
    rolling: true,
    resave: false,
    saveUninitialized: true,
    store:adminStore
}));

let routesAdminPages = require('./src/server/admin/login/pages.js');
let adminAsync = require('./src/server/admin/routes/async.js');

app.use('/admin', routesAdminPages);
app.use('/admin/async', adminAsync);
app.use('/admin', express.static('assets/admin'));

// Static routing
// app.get('/', function (req, res, next) {
//   fs.readFile('/file-does-not-exist', function (err, data) {
//     if (err) {
//       next(err) // Pass errors to Express.
//     } else {
//       res.send(data)
//     }
//   })
// })


app.get('/admin*', function(req, res){
    res.sendFile(path.join(__dirname, '/assets/admin/admin.html'));
});

//public session and routing

let publicAsync= require('./src/server/public/routes/async.js');

app.use('/async' , publicAsync);
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/assets/public/public.html'));
});

app.listen(Number(PORT), '0.0.0.0', function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at port', PORT);
});
