var app = (function() {
    'use strict';
    var baseUrl = 'https://api.themoviedb.org/3/',
        apiKey = 'f2c7335dd252082fb746119aede6e440',
        shows = [],
        configuration;

    function init() {
        var source = $('#show-list-template').html(),
            template = Handlebars.compile(source),
            data = { shows: [
                {
                    name: 'Animaniacs', 
                    rating: 8.1,
                    posterUrl: 'http://image.tmdb.org/t/p/w185/lM0tNXNSJkf8acWWeHItyf1tsOy.jpg',
                    overview: 'a show about things and stuff'
                }
            ]};

        $('#show-list-placeholder')
            .html(template(data))
            .on('click', 'li', function(e) {
                $(e.target).closest('li').find('.details').toggle();
            });

        loadConfiguration();
    }

    function loadConfiguration() {
        var url = baseUrl + 'configuration?callback=?';

        if (typeof configuration === 'undefined') {
            $.getJSON(url, {'api_key': apiKey}, function(response) {
                console.log(response);
                //configuration.baseUrl = response.images.secure_base_url
                //config.posterSize = response.images[2]
            });
        }
    }

    function retrieveTopShows() {
        var url = baseUrl + 'tv/top_rated?callback=?';

        $.getJSON(url, {'api_key': apiKey}, function(response) {
                //response.name
                //response.vote_average
                //response.vote_count
                //response.poster_path
                //response.id
                console.log(response);
            }
        );
    }

    function retrieveShowDescription(showId) {
        var url = baseUrl + 'tv/' + showId + '?callback=?';

        $.getJSON(url, {'api_key': apiKey}, function(response) {
                //grab response.overview
                console.log(response);
            }
        );
    }

    function buildImdbLink(showId) {
        var url = baseUrl + 'tv/' + showId + '/external_ids?callback=?';

        $.getJSON(url, {'api_key': apiKey}, function(response) {
                //grab response.imdb_id
                console.log(response);
            }
        );
    }

    function getShows() {
        return shows;
    }

    return {
        init: init,
        loadConfiguration: loadConfiguration,
        retrieveTopShows: retrieveTopShows,
        retrieveShowDescription: retrieveShowDescription,
        buildImdbLink: buildImdbLink,
        getTopShows: getShows
    };
})();

$(document).ready(function() {
    'use strict';
    app.init();
});
