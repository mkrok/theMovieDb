module.exports = function (data) {
    let retrieved = {};
    retrieved.media_type = data.media_type;
    retrieved.results = [];

    if (data.media_type === 'person') {
        for (let i = data.results.length; i--;) {
            let {
                id,
                name,
                popularity,
                profile_path
            } = data.results[i];
            retrieved.results.push({id, name, profile_path, popularity});
        }
    } else if (data.media_type === 'movie') {
        for (let i = data.results.length; i--;) {
            let {
                id,
                title,
                overview,
                poster_path,
                release_date,
                vote_average,
                vote_count
            } = data.results[i];
            retrieved.results.push({
                id,
                title,
                overview,
                poster_path,
                release_date,
                vote_average,
                vote_count
            });
        }
    }  else if (data.media_type === 'tv') {
        for (let i = data.results.length; i--;) {
            let {
                id,
                name,
                overview,
                poster_path,
                popularity,
                vote_average,
                vote_count
            } = data.results[i];
            retrieved.results.push({
                id,
                name,
                overview,
                poster_path,
                popularity,
                vote_average,
                vote_count
            });
        }
    } else if (data.media_type === 'company') {
        for (let i = data.results.length; i--;) {
            let {
                id,
                name,
                logo_path
            } = data.results[i];
            retrieved.results.push({
                id,
                name,
                logo_path
            });
        }
    } else if (data.media_type === 'collection') {
        for (let i = data.results.length; i--;) {
            let {
                id,
                name,
                poster_path
            } = data.results[i];
            retrieved.results.push({
                id,
                name,
                poster_path
            });
        }
    }
    // console.log ('sending ' + data.media_type + '[' + data.results.length + ']');
    return retrieved;
};
