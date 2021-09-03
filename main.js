const express = require('express');
const path = require('path');

const app = express();


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/templates/game.html'));
})

app.get('/game.js', function(req, res) {
    res.sendFile(path.join(__dirname+'/static/scripts/game.js'));
})

app.get('/temp', function(req, res) {
    res.set({'Content-Type': 'static/images/assets/dude.png'});
})

app.get('/sight', function(req, res) {
    res.sendFile(path.join(__dirname+'/static/images/gun_sight.png'));
})


app.listen(3000, function () {
	console.log('listen 3000!');
})