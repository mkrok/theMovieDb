const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 9591;
const theMovieDbPlugin = require('./js/theMovieDbPlugin');

function parse (txt) {
    return txt.trim().replace(/\s+/g, '+');
}

http.listen (port, () => {
    console.log('server listens at port ' + port);
});

app.use (express.static(__dirname));
app.get ('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on ('connection', socket => {
    console.log (socket.id + ' connected');
    socket.on ('the_movie_db_query', query => {
        console.log('The Movie DB query: ' + parse(query) + ' from: ' + socket.id);
        theMovieDbPlugin (parse(query), socket);
    });
});
