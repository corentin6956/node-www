var logfmt = require("logfmt");
var express = require("express");
var utilisateurs = require('./routes/utilisateurs');
var app = express();


// Logs
app.use(logfmt.requestLogger());

// Serveur statique
//app.use(express.static(__dirname + '/public'));

// Routes pour les utilisateurs
app.get('/utilisateurs', utilisateurs.findAll);
app.get('/utilisateurs/:id', utilisateurs.findById);

// Montage de l'API REST sur /bookmarks
app.use('/utilisateurs', app.utilisateurs_app = require('./utilisateurs-rest')());



var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
