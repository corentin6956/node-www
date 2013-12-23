var logfmt = require("logfmt");
var express = require('express')
  , app = module.exports = express.createServer()

app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
app.configure('development', function () {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function () {
  app.use(express.errorHandler());
});

// Logs
app.use(logfmt.requestLogger());

// Serveur statique
//app.use(express.static(__dirname + '/public'));


// Montage de l'API REST sur /bookmarks
app.use('/utilisateurs', app.utilisateurs_app = require('./utilisateurs-rest')());

// Homepage
/*app.get('/', function (req, res) {
  res.render('index', { "title": 'Bookmarks' });
});*/

var port = process.env.PORT || 5000;

if (module.parent === null) {
  app.listen(port);
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}
