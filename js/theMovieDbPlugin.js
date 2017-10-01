module.exports = function (query, socket) {
    const https = require('https');
    const refiner = require('./refiner.js');
    const API_KEY = 'a51683333b42879def31a2678c9b371c';
    const mdb_gets =  [
        'movie',
        'tv',
        'person',
        'collection',
        'company'
    ];
    let options = {
        hostname: 'api.themoviedb.org',
        port: 443,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    for (let i = mdb_gets.length; i--;) {
        options.path = '/3/search/' + mdb_gets[i] +
            '?api_key=' + API_KEY + '&query=' +
            query;
        https.get(options, function (http_res) {
            let data = '';
            http_res.on('data', chunk => {
                data += chunk;
            });
            http_res.on('end', () => {
                //console.log(JSON.parse(data));
                if ( JSON.parse(data).results) {
                    if (JSON.parse(data).results.length > 0) {
                        socket.emit('the_movie_db_results', refiner({media_type: mdb_gets[i], results: JSON.parse(data).results}) );
                    }
                } else {
                    socket.emit('the_movie_db_error', 'Something went wrong, try again');
                }
            });
        });
    }
};
