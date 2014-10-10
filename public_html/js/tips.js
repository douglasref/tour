(function($) {
    var defaults = {
        text: 'Tips & Tricks',
        position: {x: 0, y: 0},
        select: {type: 'circle', size: 100},
        parent: 'body',
        event: 'onload',
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
    $.fn.tips = function(options) {
        var settings = $.extend(defaults, options);

        $('body').after('<div id="tip-background"><span id="tip-text"></span></div>');

        if (this.css('position') === "static")
            this.css({position: 'relative', top: 0, right: 0, left: 0});

        //console.log($(this).offset());
        var widthOuter = $(this).outerWidth(true);
        var width = $(this).width();
        var height = $(this).height();
        var offsetX = $(this).offset().left;
        var offsetY = $(this).offset().top;
        var spaceRight = $(window).width() - (offsetX + width);
        var spaceLeft = $(window).width() - (width + spaceRight);
        var spaceBottom = $(window).height() - (offsetY + height);
        var spaceTop = $(window).height() - (height + spaceBottom);

        this.css({'z-index': 991});
        var label = $('#tip-text');
        $(label).html(settings.text);
        var pos = _position();
        $(label).css({position: 'absolute', top: pos.top, left: pos.left});
        //alert(settings.animation);
        return this;

        function _position() {
            alert($(label).width());
            var pos = {top: 0, left: 0};
            if (_showHorizontal()) {
                pos.top = offsetY + (label.height() / 2) + parseInt(settings.spacing);
                if (spaceRight >= spaceLeft) {
                    pos.left = offsetX + width + parseInt(settings.spacing);
                } else {
                    pos.left = offsetX - parseInt(settings.spacing);
                }
            } else {
                pos.left = offsetX + (width / 2) - (label.width() / 2);
                if (spaceTop >= settings.minHeightLabel) {
                    pos.top = offsetY - (label.height() + settings.spacing);
                } else {
                    pos.top = offsetY + height + settings.spacing;
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
    };
}(jQuery));