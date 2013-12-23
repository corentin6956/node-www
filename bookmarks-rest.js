var express = require("express");
var m = require('./middleware');

// Instanciated module
module.exports = function () {
  var app = express();

  app.db = require('./db')();
  app.on('close', app.db.close);

  app.configure(function () {
    app.param('id', m.checkIdParameter);
    app.use(m.checkRequestHeaders);
    app.use(express.bodyParser());
    app.use(m.handleBodyParserError);
    app.use(m.checkRequestData);
    app.use(express.methodOverride());
    app.use(app.router);
  });
  app.configure('development', function () {
    app.use(m.errorHandler({"stack": true}));
  });
  app.configure('production', function () {
    app.use(m.errorHandler());
  });
  app.configure('test', function () {
    app.use(m.errorHandler({"stack": false, "log": function showNothing(){}});
  });

  app.post('/',             m.dbAction(db, 'save'));
  app.get( '/',             m.dbAction(db, 'fetchAll', function (ids) { return ids.map(function (id) {
    // URIs depend on mount route
    return app.route + (app.route.charAt(app.route.length-1) == '/' ? '' : '/') + 'utilisateurs/' + id; }); }));
  app.get( '/utilisateurs/:id', m.dbAction(db, 'fetchOne'));
  app.put( '/utilisateurs/:id', m.dbAction(db, 'save'));
  app.del( '/',             m.dbAction(db, 'deleteAll'));
  app.del( '/utilisateurs/:id', m.dbAction(db, 'deleteOne'));
  app.all( '/*',            function (req, res, next) { next({"code":405, "message":"Method not allowed"}); });

  return app;
}

// Expose dependencies to avoid duplicate modules
exports.express = express;
exports.middlewares = m;

// Start when main module
var port = process.env.PORT || 5000;
if (module.parent == null) module.exports().listen(port);