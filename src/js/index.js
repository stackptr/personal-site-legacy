$( function() { $("#email-tooltip").tooltip(); } );
$( function() { $("#irc-tooltip").tooltip(); } );
$( function() { $("#github-tooltip").tooltip(); } );

$('.accordion-toggle').on('click', function(){
    $('.accordion-toggle i').toggleClass('icon-chevron-down icon-chevron-up', 200);
});
