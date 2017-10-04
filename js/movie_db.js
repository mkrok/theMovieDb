/*global jQuery, io*/
(function ($) {
    // document.ready()
    $(window).on( 'load', function () {
        $(window).bind('resize', set_width);
        $(window).trigger('resize');

        function set_width () {
            let windowWidth = $(window).width(),
                $header = document.getElementById('header'),
                $results = document.getElementById('results'),
                $query = document.getElementById('db_query');
            $header.style.width = windowWidth -10 + 'px';
            $query.style.width = windowWidth -10 + 'px';
            $results.style.width = windowWidth -10 + 'px';
        }

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

        $('#movie').on('click', 'a.medialink', showOverview);

        function showOverview () {
            // TODO: add something here
        }

        socket.on('connect', () => {
            console.log('connected');
        });

        socket.on('the_movie_db_error',data => {
            document.getElementById('error').style.display = 'block';
            document.getElementById('error').innerHTML = `<p style="font-size: 2em; color: white;">${data}</p>`;
        });

        socket.on('the_movie_db_results', data => {
            if (data.media_type === 'movie') {
                document.getElementById('movie').style.display = 'block';
                document.getElementById('movie').innerHTML = '<p style="font-size: 4em; color: white;">Movies</p>';
                for (let i = data.results.length; i--;) {
                    document.getElementById('movie').innerHTML += `<div class="media"><a class="medialink">
                    <object width="185" height="278" class="fit center" data="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${data.results[i].poster_path}">
                    <img class="fit center" src="/img/error.png" width="185" height="278"></img>
                    </object></a><div class="desc">${data.results[i].title.substr(0,23)}</div>
                    <p class="overview">${data.results[i].overview}</p></div>`;
                }
            } else if (data.media_type === 'tv') {
                document.getElementById('tv').style.display = 'block';
                document.getElementById('tv').innerHTML = '<p style="font-size: 4em; color: white;">TV</p>';
                for (let i = data.results.length; i--;) {
                    document.getElementById('tv').innerHTML += `<div class="media"><a class="medialink">
                    <object width="185" height="278" class="fit center"
                    data="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${data.results[i].poster_path}">
                    <img class="fit center" src="/img/error.png" width="185" height="278"></img>
                    </object></a><div class="desc">${data.results[i].name.substr(0,23)}</div>
                    <p class="overview">${data.results[i].overview}</p></div>`;
                }
            } else if (data.media_type === 'collection') {
                document.getElementById('collection').style.display = 'block';
                document.getElementById('collection').innerHTML = '<p style="font-size: 4em; color: white;">Collection</p>';
                for (let i = data.results.length; i--;) {
                    document.getElementById('collection').innerHTML += `<div class="media"><a class="medialink">
                    <object width="185" height="278" class="fit center"
                    data="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${data.results[i].poster_path}">
                    <img class="fit center" src="/img/error.png" width="185" height="278"></img>
                    </object></a><div class="desc">${data.results[i].name.substr(0,23)}</div></div>`;
                }
            } else if (data.media_type === 'person') {
                document.getElementById('person').style.display = 'block';
                document.getElementById('person').innerHTML = '<p style="font-size: 4em; color: white;">Person</p>';
                for (let i = data.results.length; i--;) {
                    document.getElementById('person').innerHTML += `<div class="media"><a class="medialink">
                    <object width="185" height="278" class="fit center"
                    data="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${data.results[i].profile_path}">
                    <img class="fit center" src="/img/error.png" width="185" height="278"></img>
                    </object></a><div class="desc">${data.results[i].name.substr(0,23)}</div></div>`;
                }
            } else if (data.media_type === 'company') {
                document.getElementById('company').style.display = 'block';
                document.getElementById('company').innerHTML = '<p style="font-size: 4em; color: white;">Company</p>';
                for (let i = data.results.length; i--;) {
                    document.getElementById('company').innerHTML += `<div class="media"><a class="medialink">
                    <object width="185" height="278" class="fit center"
                    data="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${data.results[i].logo_path}">
                    <img class="fit center" src="/img/error.png" width="185" height="278"></img>
                    </object></a><div class="desc">${data.results[i].name.substr(0,23)}</div></div>`;
                }
            }
        });
    });
}(jQuery));
