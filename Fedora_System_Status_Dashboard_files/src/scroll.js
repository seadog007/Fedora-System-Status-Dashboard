$('.scroll').click(function(event) {

    event.preventDefault();

    var full_url = this.href,
    parts = full_url.split('#'),
    trgt = parts[1],
    target_offset = $('#'+trgt).offset(),
    target_top = target_offset.top-35;

    $('html, body').animate({scrollTop:target_top}, 500);})
