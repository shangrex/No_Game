const express = require('express')

const app = express()


app.get('/', function(req, res) {
    res.sendFile('templates/game.html', {root: __dirname });
})

app.get('/temp', function(req, res) {
    res.set({'Content-Type': 'static/images/assets/dude.png'});
})

app.listen(3000, function () {
	console.log('listen 3000!');
})