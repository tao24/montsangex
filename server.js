var express = require('express');
var bodyParser = require("body-parser");
var mongodb = require("mongodb");

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then((client) => {

        // Save database object from the callback for reuse.
        db = client.db();
        console.log("Database connection ready");

        // Initialize the app.
        var server = app.listen(process.env.PORT || 8080, function () {
            var port = server.address().port;
            console.log("App now running on port", port);
        });
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

// Your GET, POST, PUT, DELETE requests can go here or you can create separate routing files
app.get("/api", function(req, res) {

});
  
app.post("/api", function(req, res) {

});