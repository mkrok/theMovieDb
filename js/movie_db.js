/*global jQuery, io*/
(function ($) {
    // document.ready()
    $(window).on( 'load', function () {

        let socket = io();

        $('#db_query').submit(function (e) {
            e.preventDefault();
            let new_query = $('#query_txt').val();
            socket.emit('the_movie_db_query', new_query);
        });

        socket.on('connect', () => {
            console.log('connected');
        });

        socket.on('the_movie_db_results', data => {
            document.getElementById('results').innerHTML = '<p>' + data +'</p>';
        });

    });
}(jQuery));
