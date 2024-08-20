(function($) 
{
    var $window = $(window),
        $body = $('body'),
        $nav = $('#nav');

    var checkStarGiven = 1;

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

    $('#star-button').on('click', function(event) {
        event.preventDefault();
        if (checkStarGiven === 1 && localStorage.getItem('hasGivenStar')) {
            alert('You have already given a star.');
            return;
        }

        $.post('/give-star', function(data) {
            $('#star-count').text(data.starCount);

            if (checkStarGiven === 1) {
                localStorage.setItem('hasGivenStar', 'true');
                $('#star-button').attr('disabled', 'disabled').css('color', '#FFD700');
            }
        }).fail(function() {
            alert('Error: Unable to give a star at this moment.');
        });
    });

    if (checkStarGiven === 1 && localStorage.getItem('hasGivenStar')) {
        $('#star-button').attr('disabled', 'disabled').css('color', '#FFD700');
    }

    $.get('/star-count', function(data) {
        $('#star-count').text(data.starCount);
    });

})(jQuery);
