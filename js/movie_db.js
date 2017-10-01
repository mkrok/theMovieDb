/*global jQuery, io*/
(function ($) {
    // document.ready()
    $(window).on( 'load', function () {

        let socket = io();

        $('#db_query').submit(function (e) {
            e.preventDefault();
            document.getElementById('error').innerHTML = '';
            document.getElementById('error').style.display = 'none';
            document.getElementById('movie').style.display = 'none';
            document.getElementById('tv').style.display = 'none';
            document.getElementById('collection').style.display = 'none';
            document.getElementById('person').style.display = 'none';
            document.getElementById('company').style.display = 'none';
            let new_query = $('#query_txt').val();
            socket.emit('the_movie_db_query', new_query);
        });


        socket.on('connect', () => {
            console.log('connected');
        });

        socket.on('the_movie_db_error',data => {
            document.getElementById('error').style.display = 'block';
            document.getElementById('error').innerHTML = '<p style="font-size: 2em; color: white;">' + data + '</p>';
        });

        socket.on('the_movie_db_results', data => {
            console.log(data);
            if (data.media_type === 'movie') {
                document.getElementById('movie').style.display = 'block';
                document.getElementById('movie').innerHTML = '<p style="font-size: 4em; color: white;">Movies [' + data.results.length + ']</p>';
            } else if (data.media_type === 'tv') {
                document.getElementById('tv').style.display = 'block';
                document.getElementById('tv').innerHTML = '<p style="font-size: 4em; color: white;">TV [' + data.results.length + ']</p>';

            } else if (data.media_type === 'collection') {
                document.getElementById('collection').style.display = 'block';
                document.getElementById('collection').innerHTML = '<p style="font-size: 4em; color: white;">Collection [' + data.results.length + ']</p>';
            } else if (data.media_type === 'person') {
                document.getElementById('person').style.display = 'block';
                document.getElementById('person').innerHTML = '<p style="font-size: 4em; color: white;">Person [' + data.results.length + ']</p>';
            } else if (data.media_type === 'company') {
                document.getElementById('company').style.display = 'block';
                document.getElementById('company').innerHTML = '<p style="font-size: 4em; color: white;">Company [' + data.results.length + ']</p>';
            }

        });

    });
}(jQuery));
