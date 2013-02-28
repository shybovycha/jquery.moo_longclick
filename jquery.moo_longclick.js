(function($) {
    /*
     * Long-tap event handler. Supports touch devices.
     *
     * $().longclick(handler, [ duration ]);
     *
     */
    $.fn.longclick = function(handler, duration) {
        duration = duration || 500;

        function moo_bind(elements, events, event_handler) {
            $(elements).each(function(element_index, element) {
                if (!events.join) {
                    events = events.split(/\s+/);
                }

                $.each(events, function(index, event_name) {
                    element.addEventListener(event_name, function(evt) {
                        evt.preventDefault();

                        return event_handler.bind($(element))(evt);
                    });
                });
            });
        }

        $(this).each(function(index, element) {
            $(element).data('moo.longclickable', true);

            moo_bind($(element), 'mousedown touchstart', function(evt) {
                if ($(element).data('moo.timer')) {
                    return true;
                }

                var timer = window.setTimeout(function() {
                    window.clearTimeout($(element).data('moo.timer'));
                    $(element).data('moo.timer', null);
                    return handler.bind($(element))(evt);
                }, duration);

                return $(element).data('moo.timer', timer);
            });

            moo_bind($(element), [ 'mousemove', 'mouseup', 'mouseout', 'contextmenu', 'touchend', 'touchmove', 'touchcancel' ].join(' '), function(evt) {
                window.clearTimeout($(element).data('moo.timer'));
                $(element).data('moo.timer', null);
                return true;
            });

            moo_bind($(element), 'click', function(evt) {
                if ($(element).data('moo.longclickable')) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    return false;
                } else {
                    return true;
                }
            });
        });
    };
})(jQuery);