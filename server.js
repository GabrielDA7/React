var express = require('express');
var app = express();
var path = require('path');

//Set the public folder
app.use("/src", express.static(path.join(__dirname + '/src')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000);

console.log('Server started at ' + Date());
