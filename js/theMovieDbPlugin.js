module.exports = function (query, socket) {
    const https = require('https');
    const API_KEY = 'a51683333b42879def31a2678c9b371c';
    let options = {
        hostname: 'api.themoviedb.org',
        port: 443,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        path: '/3/search/movie?api_key=' + API_KEY + '&query=' +  query
    };

    https.get(options, function (http_res) {
        let data = '';
        http_res.on('data', chunk => {
            data += chunk;
        });
        http_res.on('end', () => {
            //console.log(JSON.parse(data));
            socket.emit('the_movie_db_results', data);
        });
    });    

};
