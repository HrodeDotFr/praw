jQuery.fn.preparePost = function (additionalData) {
    var data = {};
    var sel = this;
    if (sel.is("input") || sel.is("textarea") || sel.is("select")) {
        sel = $('<div>').append(sel);
    }

    $.each(sel.find("input,select,textarea").filter(':enabled').serializeArray(), function (i, v) {
        data[v.name] = v.value;
    });

    if (additionalData) {
        data = $.extend(data, additionalData);
    }

    return data;
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