(function($) {
    var defaults = {
            text: 'Tips & Tricks',
            position: {x: 0, y: 0},
            select: {type: 'circle', size: 100},
            parent: 'body',
            event: 'onload',
            animation: 'fade',
            anyElementInteraction: true,
            functionInit: function() {},
            functionBefore: function() {},
            functionReady: function() {},
            functionAfter: function() {},
        }
    $.fn.tips = function(options) {
        var settings = $.extend(defaults, options);
        
        $('body').after('<div id="tip-background"><span id="tip-text"></span></div>');
        
        if(this.css('position') === "static")
            this.css({position: 'relative', top: 0, right: 0, left: 0});
        
        alert($(this).outerWidth(true));
        
        this.css({'z-index': 991});
        $('#tip-text').html(settings.text);
        //alert(settings.animation);
        return this;
    };
}(jQuery));