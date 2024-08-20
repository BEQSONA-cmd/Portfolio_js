(function($) 
{
    var $window = $(window),
        $body = $('body'),
        $nav = $('#nav');

    // Variable to control star-given check (1 = enabled, 0 = disabled)
    var checkStarGiven = 0;

    breakpoints({
        xlarge:  [ '1281px',  '1680px' ],
        large:   [ '981px',   '1280px' ],
        medium:  [ '737px',   '980px'  ],
        small:   [ null,      '736px'  ]
    });

    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    $('#nav a, .scrolly').scrolly({
        speed: 1000,
        offset: function() { return $nav.height(); }
    });

    // Star button click event
    $('#star-button').on('click', function(event) {
        event.preventDefault();

        // Check if the user has already given a star if checkStarGiven is enabled
        if (checkStarGiven === 1 && localStorage.getItem('hasGivenStar')) {
            alert('You have already given a star.');
            return;
        }

        $.post('/give-star', function(data) {
            $('#star-count').text(data.starCount);

            if (checkStarGiven === 1) {
                localStorage.setItem('hasGivenStar', 'true');
                $('#star-button').attr('disabled', 'disabled').css('color', '#FFD700'); // Gold color for given star
            }
        }).fail(function() {
            alert('Error: Unable to give a star at this moment.');
        });
    });

    // Initial setup based on whether the checkStarGiven is enabled
    if (checkStarGiven === 1 && localStorage.getItem('hasGivenStar')) {
        $('#star-button').attr('disabled', 'disabled').css('color', '#FFD700'); // Gold color for given star
    }

    // Fetch the initial star count
    $.get('/star-count', function(data) {
        $('#star-count').text(data.starCount);
    });

})(jQuery);
