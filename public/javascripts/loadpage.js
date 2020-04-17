$(document).ready(function() {
    var Body = $('body');
    Body.addClass('preloader-site');
});
$(window).on('load', function() {
    $('.preloader-wrapper').fadeOut("slow", function() {
        $('body').removeClass('preloader-site')
    });
    
});