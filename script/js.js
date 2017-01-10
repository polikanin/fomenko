$(document).ready(function () {
    $('.preloader').addClass('preloaded');

    var requared = $('input[data-required]');
    var modal = '.modal';
    var form = $('form');

    $('[name="phone"]').inputmask("+7(999)9999999");
    requared.blur(function() {var self = $(this);if($(this).val().length == "") {self.addClass('input_error');setTimeout(function () {self.removeClass('input_error')}, 2000)}});
    requared.focus(function() {$(this).removeClass('input_error');});

    var close = function () {
        $(modal).addClass('hidden');
        $(modal + '>div:not(.layout)').addClass('hidden');
    };

    var open = function () {
        $(modal).removeClass('hidden');
        $($(this).data('modal')).removeClass('hidden')
    };

    form.submit(function(e){
        e.preventDefault();
        var self = $(this);
        var requared = true;
        var inputs = self.find('[data-required]');

        $('[name="frm-name"]').val(self.attr('name'));

        for(var i = 0; i < inputs.length; i++){
            if(inputs.eq(i).val() == '') {
                requared = false;
            }
        }
        if(requared){
            var type = self.attr('method');
            var url = self.attr('action');
            var data = self.serialize();
            $.ajax({type: type, url: url, data: data,
                success : function(){
                    $('form input:not([type="hidden"])').val('');
                    $(modal).removeClass('hidden');
                    $(modal + '>div:not(.layout)').addClass('hidden');
                    $('.modal .thanks').removeClass('hidden');
                    console.log('Success');
                }
            });
        }
        else{
            for(var i = 0; i < inputs.length; i++){
                if(inputs.eq(i).val() == '') {
                    inputs.eq(i).addClass('input_error');
                    setTimeout(function () {
                        inputs.removeClass('input_error');
                    }, 2000);
                }
            }
        }
    });


//// скрипт закрывающий форму
    $('[data-btn-type="close"]').on('click', close);

//// скрипт открывающий форму
    $('[data-modal]').on('click', open);

    var nextBtn = '<button class="slider-btn slider-btn_next"><span class="arr-passive"></span><span class="arr-active"></span></button>';
    var prevBtn = '<button class="slider-btn slider-btn_prev"><span class="arr-passive"></span><span class="arr-active"></span></button>';

//// Слайдер
    if($('.slider')){
        $('.slider').slick({
            slidesToShow: 1,
            dots: true,
            prevArrow: prevBtn,
            nextArrow: nextBtn,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1000,
            focusOnHover: false
        });
    }

//// Галерея на слайдере
    $('.gallery-item').fancybox();

    $('[data-toggle]').on('click', function(){
        var data = $(this).data('toggle');
        $(this).toggleClass(data);
    });

    $('.play').on('click', function (e) {
        e.preventDefault();
        var videoId = $(this).attr('href');
        //var videoTpl = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+ videoId +'?autoplay=1" frameborder="0"  allowfullscreen></iframe>';

        var videoTpl = '<iframe src="https://player.vimeo.com/video/'+ videoId +'?color=d4d4d4&title=0&byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

        var parent = $(this).parent();
        parent.addClass('active');
        parent.find('.video-block').html(videoTpl);
    });

    // $('.video').each(function () {
    //
    //     $(this).css({
    //         backgroundImage: 'url(//img.youtube.com/vi/'+ href +'/hqdefault.jpg)'
    //     });
    // });

    $('.video').each(function(){
        var href = $(this).find('.play').attr('href');
        var self = $(this);
        $.ajax({
            type:'GET',
            url: 'http://vimeo.com/api/v2/video/' + href  + '.json',
            jsonp: 'callback',
            dataType: 'jsonp',
            success: function(data){
                var video = data[0];
                console.log(video.thumbnail_medium)

                self.css({
                    backgroundImage: 'url('+ video.thumbnail_large +')'
                });
            }
        });
    });

    $(window).on('scroll', function () {
        if($(window).scrollTop() > 300){
            $('.header_mobile').addClass('show');
        }
        else{
            $('.header_mobile').removeClass('show');
        }
    });

    if($('.gallery-preview-block')){
        $('.gallery-preview-block .item').each(function () {
            var self = $(this);
            var container = self.find('.pic-container');
            var url = self.find('.pic').attr('src');
            container.css({
                backgroundImage: "url("+ url +")"
            });
            self.find('.pic').remove();
        });
    }


    $('[data-track]').on('click', function () {
        var url = $(this).data('track');

        $('#player source').attr('src', url);
        console.log(url)
    });

    if(window.audiojs){
        $(function() {
            // Setup the player to autoplay the next track
            var a = audiojs.createAll({
                trackEnded: function() {
                    var next = $('ol li.playing').next();
                    if (!next.length) next = $('ol li').first();
                    next.addClass('playing').siblings().removeClass('playing');
                    audio.load($('a', next).attr('data-src'));
                    audio.play();
                }
            });

            // Load in the first track
            var audio = a[0];
            first = $('ol a').attr('data-src');
            $('ol li').first().addClass('playing');
            audio.load(first);

            // Load in a track on click
            $('ol li').click(function(e) {
                e.preventDefault();
                $(this).addClass('playing').siblings().removeClass('playing');
                audio.load($('a', this).attr('data-src'));
                audio.play();
            });

            var getTrackName = function () {
                var trackName = $('ol .playing a').text();
                $('.current-track').text(trackName);
            };

            $('.ctrl-btn-prev').on('click', function () {
                getTrackName();
                var prev = $('li.playing').prev();
                if (!prev.length) prev = $('ol li').last();
                prev.click();
            });
            $('.ctrl-btn-next').on('click', function () {
                getTrackName();
                var next = $('li.playing').next();
                if (!next.length) next = $('ol li').first();
                next.click();
            });
            $('.audiojs .play-pause').on('click', getTrackName);
            $('ol li').on('click', getTrackName);
            $('.play-pause').html('');
        });
    }

    var isMobile = false;

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        isMobile = true;
    }

    if(isMobile){
        $('.video-bg-wrap').remove();
    }

    var video = document.getElementById("video");
    video.volume = 0;
    $('.volume').on('click', function () {
        if(video.volume === 1){
            video.volume = 0;
        }
        else{
            video.volume = 1;
        }
    });

    if($('.parallax-bg').length > 0){
        $(window).on('scroll', function () {
            var winHeight = $(window).height();
            var scroll = $(window).scrollTop() + winHeight;
            var block = $('.banner').offset().top;
            var transform = block - scroll;

            if(scroll > block){
                $('.parallax-bg img').css({
                    transform: 'translateY('+ transform/8 +'px)'
                });
            }
        });
    }

});