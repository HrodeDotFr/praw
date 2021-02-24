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

jQuery.fn.preparePost = function (additionalData) {
    return Praw.preparePost(this, additionalData);
};

jQuery.fn.disable = function (additionalData) {
    var sel = this;
    if (sel.is("input") || sel.is("textarea") || sel.is("select")) {
        sel = $('<div>').append(sel);
    }
    sel.find("input,select,textarea,button").filter(':enabled').prop("disabled", true);
};

jQuery.fn.enable = function (additionalData) {
    var sel = this;
    if (sel.is("input") || sel.is("textarea") || sel.is("select")) {
        sel = $('<div>').append(sel);
    }
    sel.find("input,select,textarea,button").filter(':disabled').prop("disabled", false);
};