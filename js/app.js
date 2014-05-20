var app = (function() {
    'use strict';
    var baseUrl = 'https://api.themoviedb.org/3/',
        apiKey = 'f2c7335dd252082fb746119aede6e440',
        shows = [],
        basePosterUrl;

    function init() {
        $('#show-list-placeholder').on('click', 'li', function(e) {
            $(e.target).closest('li').find('.details').toggle();
        });

        buildData(populateList);
    }

    function populateList() {
        var source = $('#show-list-template').html(),
            template = Handlebars.compile(source);
        $('#show-list-placeholder').html(template({shows: shows}));
    }

    function buildData(callback) {
        //this function kicks off a chain of functions to get all of the data the page needs
        loadPosterConfig(callback);
    }
    
    function loadPosterConfig(callback) {
        var url = baseUrl + 'configuration?callback=?';

        if (typeof basePosterUrl === 'undefined') {
            $.getJSON(url, {'api_key': apiKey}, function(response) {
                basePosterUrl = response.images.secure_base_url + response.images.poster_sizes[2];
                retrieveTopShows(callback);
            });
        }
    }

    function retrieveTopShows(callback) {
        var url = baseUrl + 'tv/top_rated?callback=?';

        $.getJSON(url, {'api_key': apiKey}, function(response) {
                _.each(response.results, function(show) {
                    shows.push({
                        id: show.id,
                        name: show.name,
                        rating: show.vote_average,
                        posterUrl: basePosterUrl + show.poster_path
                    });
                    retrieveShowDescription(show.id, callback);
                });
            }
        );
    }

    function retrieveShowDescription(showId, callback) {
        var url = baseUrl + 'tv/' + showId + '?callback=?';

        $.getJSON(url, {'api_key': apiKey}, function(response) {
                _.find(shows, {id: showId}).overview = response.overview;
                if (typeof callback === 'function') {
                    //there is probably a better way to handle this instead of redrawing the page for every show...
                    callback();
                }
            }
        );
    }

    return {
        init: init,
        buildData: buildData
    };
})();

