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


//var nextBtn = '<button class="slider-btn slider-btn_next"><span><img src="image/ui/arr.png" alt="pic"><img src="image/ui/arr-h.png" alt="pic"></span></button>';
//var prevBtn = '<button class="slider-btn slider-btn_prev"><span><img src="image/ui/arr.png" alt="pic"><img src="image/ui/arr-h.png" alt="pic"></span></button>';


var nextBtn = '<button class="slider-btn slider-btn_next"><span class="arr-passive"></span><span class="arr-active"></span></button>';
var prevBtn = '<button class="slider-btn slider-btn_prev"><span class="arr-passive"></span><span class="arr-active"></span></button>';

//// Слайдер
if($('.slider')){
    $('.slider').slick({
        slidesToShow: 1,
        dots: true,
        prevArrow: prevBtn,
        nextArrow: nextBtn
    });
}



//// Галерея на слайдере
$('.gallery-item').fancybox();

//// Определяет заполнен инпут или нет для анимации
// $('.input-body .input').on('blur', function(){
//     var self = $(this);
//
//     if(self.val() !== ''){
//         self.addClass('entered');
//     }
//     else{
//         self.removeClass('entered');
//     }
// });

$('[data-toggle]').on('click', function(){
    var data = $(this).data('toggle');
    $(this).toggleClass(data);
});

$('.play').on('click', function (e) {
    e.preventDefault();
    var videoId = $(this).attr('href');
    var videoTpl = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+ videoId +'?autoplay=1" frameborder="0"  allowfullscreen></iframe>';
    var parent = $(this).parent();
    parent.addClass('active');
    parent.find('.video-block').html(videoTpl);
});

$('.video').each(function () {
    var href = $(this).find('.play').attr('href');
    var img = $(this).css({
        backgroundImage: 'url(//img.youtube.com/vi/'+ href +'/hqdefault.jpg)'
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















