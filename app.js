const express 		= require('express');
const logger 	    = require('morgan');
const bodyParser 	= require('body-parser');
const passport      = require('passport');
const pe            = require('parse-error');
const cors          = require('cors');
const path          = require('path');

const school    = require('./Server/routes/school');
const index     = require('./Server/routes/index');
const app       = express();

const CONFIG = require('./config/config');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'Server/views'));
app.set('view engine', 'jade'); 

//Passport
app.use(passport.initialize());

//Log Env
console.log("Environment:", CONFIG.app);

//DATABASE
const models = require("./Server/models");
models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database:', CONFIG.db_name);
})
.catch(err => {
    console.error('Unable to connect to SQL database:',CONFIG.db_name, err);
});
if(CONFIG.app==='dev'){
    models.sequelize.sync();//creates table if they do not already exist
    // models.sequelize.sync({ force: true });//deletes all tables then recreates them useful for testing and development purposes
}
// CORS
app.use(cors());

app.use('/school', school);
app.use('/check_role', index);

app.use(express.static(path.join(__dirname, 'Client')));
// app.use(function(req, res, next) {
//   if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
//     res.sendFile('index.html');
//   } else {
//     // middleware further down will load the basic page layout
//     next();
//   }
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});