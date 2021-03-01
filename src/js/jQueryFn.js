jQuery.fn.preparePost = function (additionalData) {
    if (typeof additionalData !== "object") {
        additionalData = {};
    }
    return Praw.preparePost(this, additionalData);
};

jQuery.fn.disable = function () {
    var sel = this;
    if (sel.is("input") || sel.is("textarea") || sel.is("select")) {
        sel = $('<div>').append(sel);
    }
    sel.find("input,select,textarea,button").filter(':enabled').prop("disabled", true);
};

jQuery.fn.enable = function () {
    var sel = this;
    if (sel.is("input") || sel.is("textarea") || sel.is("select")) {
        sel = $('<div>').append(sel);
    }
    sel.find("input,select,textarea,button").filter(':disabled').prop("disabled", false);
};