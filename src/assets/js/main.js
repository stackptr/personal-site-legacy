$( function() { $("#email-tooltip").tooltip(); } );
$( function() { $("#irc-tooltip").tooltip(); } );
$( function() { $("#github-tooltip").tooltip(); } );

var oLastModified = new Date(document.lastModified);
$('#last-updated').html("Last updated: <time datetime=\"" + oLastModified.toISOString() + "\">" + oLastModified.toDateString() +"</time>");

$('#social-collapse-link').on('click', function(e){
  var icon = $('#social-icon');
  if(icon.hasClass('icon-li icon-chevron-down')){
    icon.removeClass('icon-li icon-chevron-down').addClass('icon-li icon-chevron-up');
  }
  if(icon.hasClass('icon-li icon-chevron-up')){
    icon.removeClass('icon-li icon-chevron-up').addClass('icon-li icon-chevron-down');
  }
});