var express = require("express");
var utilisateurs = require('./routes/utilisateurs');
var app = express();


// Logs
app.use(express.logger());

app.configure(function () {
    //app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 




// Routes pour les utilisateurs
app.get('/utilisateurs', utilisateurs.findAllUsers);
app.get('/utilisateurs/:id', utilisateurs.findUserById);
app.post('/utilisateurs', utilisateurs.addUser);
app.put('/utilisateurs/:id', utilisateurs.updateUser);
app.delete('/utilisateurs/:id', utilisateurs.deleteUser);

// Serveur statique
app.use(express.static(__dirname + '/public'));
// Montage de l'API REST sur /bookmarks
//app.use('/utilisateurs', app.utilisateurs_app = require('./utilisateurs-rest')());



var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
