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
        return this;
    };
}(jQuery));
