const express = require('express')

const app = express()


app.get('/', function(req, res) {
    res.sendFile('src/game.html', {root: __dirname })
})


app.listen(3000, function () {
	console.log('listen 3000!');
})