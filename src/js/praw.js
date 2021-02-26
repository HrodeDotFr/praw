var Praw = {
    preparePost: function (selector, additionalData) {
        var data = {};

        if (selector) {
            selector = $(selector);

            if (selector.is("input") || selector.is("textarea") || selector.is("select")) {
                selector = $('<div>').append(selector);
            }

            $.each(selector.find("input,select,textarea").filter(':enabled').serializeArray(), function (i, v) {
                data[v.name] = v.value;
            });
        }

        if (additionalData) {
            data = $.extend(data, additionalData);
        }

        return data;
    }
}