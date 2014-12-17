(function($) {
    var defaults = {
        text: 'Tips & Tricks',
        position: {x: 0, y: 0},
        select: {type: 'circle', size: 100},
        parent: 'body',
        eventIn: 'onload',
        eventOut: 'click',
        animation: 'fade',
        anyElementInteraction: true,
        spacing: 20,
        minHeightLabel: 100,
        functionInit: function() {
        },
        functionBefore: function() {
        },
        functionReady: function() {
        },
        functionAfter: function() {
        }
    }
    $.fn.tips = function(options, callback) {
        $(this).append('<span class="tip-text"></span>');
            var settings = $.extend(defaults, options);
        if($('#tip-background').length <= 0)
            $('body').after('<div id="tip-background"></div>');

        if (this.css('position') === "static")
            this.css({position: 'relative', top: 0, right: 0, left: 0});
        
        //console.log($(this).offset());
        var element = $(this);
        var bg = $('#tip-background');
        var widthOuter = $(element).outerWidth(true);
        var width = $(element).width();
        var height = $(element).height();
        var offsetX = $(element).offset().left;
        var offsetY = $(element).offset().top;
        var spaceRight = $(window).width() - (offsetX + width);
        var spaceLeft = $(window).width() - (width + spaceRight);
        var spaceBottom = $(window).height() - (offsetY + height);
        var spaceTop = $(window).height() - (height + spaceBottom);

        this.css({'z-index': 991});
        var label = $(this).find('.tip-text').html(settings.text);
        var pos = _position(label);
        $(label).css({position: 'relative', top: pos.top, left: pos.left});
        _setEventOut();
        //alert(settings.animation);
        return this;

        function _position(label) {
            var pos = {top: 0, left: 0};
            if (_showHorizontal()) {
                pos.top = (height / 2) - ((label).height() / 2);
                if (spaceRight >= spaceLeft) {
                    pos.left = width + parseInt(settings.spacing);
                } else {
                    pos.left = -1 * label.width() - parseInt(settings.spacing);
                }
            } else {
                pos.left = (width / 2) - ((label).width() / 2);
                if (spaceTop >= settings.minHeightLabel) {
                    pos.top =  -1  * settings.spacing - (label.height() / 2); 
                } else {
                    pos.top = height + settings.spacing / 2;
                }
            }
            return pos;
        }
        function _showHorizontal() {
            if (spaceRight >= spaceLeft && spaceRight >= $(window).width() * 0.5) {
                return true;
            } else if (spaceLeft >= $(window).width() * 0.5) {
                return true;
            }
            return false;
        }
        function _setEventOut(){
            switch(settings.eventOut){
                case 'change':
                    $(element).change(function(){_destroy();});
                    break;
                case 'hover':
                    $(element).hover(function(){_destroy();}, function(){return false;});
                    break;
                case 'keydown':
                    $(element).keydown(function(){_destroy();});
                    break;
                case 'click':
                default:
                    $(element).click(function(){_destroy();});
            }
        }
        function _destroy(){
            var countTips = $('.tip-text').length;
            var time = 300;

            label.fadeOut(time);

            label.remove();
            
            // Verifica se eh hover, pois neste caso precisa de 2 parametro
            if(settings.eventOut === 'hover')
                element.unbind('mouseenter mouseleave');
            else
                element.unbind(settings.eventOut);
            
            if(jQuery.isFunction(callback)){
                //element.fn.tips = null;
                callback();
            }
            countTips = $('.tip-text').length;
            if (countTips === 0) {
                bg.fadeOut(time);
                window.setInterval(function() {
                    bg.remove();
                }, time);
            }
        }
    };
}(jQuery));