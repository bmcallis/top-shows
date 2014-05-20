var app = (function() {
    'use strict';
    var baseUrl = 'https://api.themoviedb.org/3/',
        apiKey = 'f2c7335dd252082fb746119aede6e440',
        shows = [],
        posterConfig;

    function init() {
        var source = $('#show-list-template').html(),
            template = Handlebars.compile(source);

        $('#show-list-placeholder').on('click', 'li', function(e) {
            $(e.target).closest('li').find('.details').toggle();
        });

        buildData();
    }

    function buildData() {
        retrieveTopShows(populateList);
    }
    
    function populateList() {
        var source = $('#show-list-template').html(),
            template = Handlebars.compile(source);
        $('#show-list-placeholder').html(template({shows: shows}));
    }

    function loadPosterConfig() {
        var url = baseUrl + 'configuration?callback=?';

        if (typeof posterConfig === 'undefined') {
            posterConfig = {};
            $.getJSON(url, {'api_key': apiKey}, function(response) {
                console.log(response);
                posterConfig.baseUrl = response.images.secure_base_url;
                posterConfig.size = response.images.poster_sizes[2];
            });
        }
    }

    function retrieveTopShows() {
        var url = baseUrl + 'tv/top_rated?callback=?';

        $.getJSON(url, {'api_key': apiKey}, function(response) {
                console.log(response);
                $.each(response.results, function(i, show) {
                    shows.push({
                        id: show.id,
                        name: show.name,
                        rating: show.vote_average,
                        posterPath: show.poster_path
                    });
                });
                console.log(shows);
                populateList();
            }
        );
    }

    function retrieveShowDescriptions(shows) {
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

    function getPosterConfig() {
        loadPosterConfig();
        return posterConfig;
    }

    return {
        init: init,
        retrieveTopShows: retrieveTopShows,
        retrieveShowDescription: retrieveShowDescriptions,
        buildImdbLink: buildImdbLink,
        getTopShows: getShows,
        getPosterConfiguration: getPosterConfig
    };
})();

$(document).ready(function() {
    'use strict';
    app.init();
});
