var pg = require('pg');

var connectionString = "postgres://zhpcewtvfnlrjf:B-lDznsRhq54VND-blcyyMcUKL@ec2-54-225-255-208.compute-1.amazonaws.com:5432/d5mdkgb32mtt37"

/*pg.connect(connectionString, function(err, client, done) {
	//create the table
	client.query('CREATE TABLE IF NOT EXISTS utilisateurs (id integer, nom varchar(255), prenom varchar(255), login varchar(255), password varchar(255))', function(err, result) {
		done();
		if(err) return console.error(err);
		console.log(JSON.stringify(result.row));
	});
});
/*
dbpg.query("INSERT INTO utilisateurs (nom, prenom, login, password) values($1, $2, $3, $4)", ['MORIN', 'Jean', 'jmorin', '12345'], function(err, result) {
	done();
	if(err) return console.error(err);
	console.log(JSON.stringify(result.row));
});

dbpg.execute('SELECT * FROM utilisateurs', function(err, result) {
	done();
	if(err) return console.error(err);
	console.log(JSON.stringify(result.row));
});*/

/*
  client.query('SELECT * FROM your_table', function(err, result) {
    done();
    if(err) return console.error(err);
    console.log(result.rows);
  });
});
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('winedb', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'winedb' database");
        db.collection('wines', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});*/
 
exports.findUserById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving utilisateur: ' + id);
	
	pg.connect(connectionString, function(err, client, done) {
		//Find User By Id
		client.query('SELECT * FROM utilisateurs WHERE id=$1', [id], function(err, result) {
			done();
			if(err) return console.error(err);
			console.log("Row count: " + result.rows.length);
			for (var i = 0; i < result.rows.length; i++) {
                var row = result.rows[i];
                /*console.log("id: " + row.id);
                console.log("author: " + row.nom);
                console.log("content: " + row.prenom);*/
				console.log(JSON.stringify(row));
				res.send(JSON.stringify(row));
            }			
		});
	});
};
 
exports.findAllUsers = function(req, res) {
	pg.connect(connectionString, function(err, client, done) {
		//Find User By Id
		client.query('SELECT * FROM utilisateurs', function(err, result) {
			done();
			if(err) return console.error(err);
			console.log("Row count: " + result.rows.length);
			console.log(JSON.stringify(result.rows));
			res.send(JSON.stringify(result.rows));
			/*for (var i = 0; i < result.rows.length; i++) {
                var row = result.rows[i];
                console.log("id: " + row.id);
                console.log("author: " + row.nom);
                console.log("content: " + row.prenom);
            }*/
			/*console.log(JSON.stringify(result.row));
			res.send(JSON.stringify(result.row)); */
		});
	});
};

exports.addUser = function(req, res) {
    var utilisateur = req.body;
    console.log('Adding utilisateur: ' + JSON.stringify(utilisateur));
    
	pg.connect(connectionString, function(err, client, done) {
		//Find User By Id
		var q = 'INSERT INTO utilisateurs (nom, prenom, login, password) VALUES (\''+utilisateur.nom+'\', \''+utilisateur.prenom+'\', \''+utilisateur.login+'\', \''+utilisateur.password+'\') RETURNING *'; 
		console.log(q);
		client.query(q, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log("Row count: " + result.rows.length);
			for (var i = 0; i < result.rows.length; i++) {
                var row = result.rows[i];
                /*console.log("id: " + row.id);
                console.log("author: " + row.nom);
                console.log("content: " + row.prenom);*/
				console.log(JSON.stringify(row));
				res.send(JSON.stringify(row));
            }			
		});
	});
};
 
exports.updateUser = function(req, res) {
    var id = req.params.id;
    var utilisateur = req.body;
    console.log('Updating utilisateur: ' + id);
    console.log(JSON.stringify(utilisateur));
	
	pg.connect(connectionString, function(err, client, done) {
		//Find User By Id
		var q = "UPDATE utilisateurs SET nom='"+utilisateur.nom+"', prenom='"+utilisateur.prenom+"', login='"+utilisateur.login+"', password='"+utilisateur.password+"' WHERE id="+id+" RETURNING *"; 
		console.log(q);
		client.query(q, function(err, result) {
			done();
			if(err) return console.error(err);
			console.log("Row count: " + result.rows.length);
			for (var i = 0; i < result.rows.length; i++) {
                var row = result.rows[i];
                /*console.log("id: " + row.id);
                console.log("author: " + row.nom);
                console.log("content: " + row.prenom);*/
				console.log(JSON.stringify(row));
				res.send(JSON.stringify(row));
            }	
		});
	});
};
 
exports.deleteUser = function(req, res) {
    var id = req.params.id;
    console.log('Deleting utilisateur: ' + id);
	pg.connect(connectionString, function(err, client, done) {
		//Find User By Id
		client.query('DELETE FROM utilisateurs WHERE id=$1', [id], function(err, result) {
			done();
			if(err) return console.error(err);
			console.log("Row count: " + result.rows.length);
			res.writeHead(200);
			res.end('OK');
		});
	});
};
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
/*var populateDB = function() {
 
    var wines = [
    {
        name: "CHATEAU DE SAINT COSME",
        year: "2009",
        grapes: "Grenache / Syrah",
        country: "France",
        region: "Southern Rhone",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg"
    },
    {
        name: "LAN RIOJA CRIANZA",
        year: "2006",
        grapes: "Tempranillo",
        country: "Spain",
        region: "Rioja",
        description: "A resurgence of interest in boutique vineyards...",
        picture: "lan_rioja.jpg"
    }];
 
    db.collection('wines', function(err, collection) {
        collection.insert(wines, {safe:true}, function(err, result) {});
    });
 
};*/