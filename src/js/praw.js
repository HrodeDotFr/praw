var Praw = {};


/*
 * preparePost
 */
Praw.preparePost = function (selector, additionalData) {
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
};


/*
 * getUniqId
 */
Praw.getUniqId = function () {
    var uid = "", chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', charlen = chars.length;
    for (var i = 0; i < 32; i++) {
        uid += chars.charAt(Math.floor(Math.random() * charlen));
    }
    return uid;
};


/*
 * Loader
 */
Praw.loader = {};

Praw.loader.open = function (options) {
    var id = Praw.getUniqId();
    Praw.loader.lastId = id;

    var container = $('body');
    if (options) {
        if (options.container) {
            container = $(options.container);
        }
    }

    container.addClass('loaderParent').append($('<div>').addClass('loader').append($('<div>'))).attr('data-prawloader', id);

    return id;
};

Praw.loader.close = function (id) {
    if (id) {
        // ok
    } else if (Praw.loader.lastId) {
        id = Praw.loader.lastId;
        delete Praw.loader.lastId;
    } else {
        return;
    }

    $('[data-prawloader="' + id + '"]').removeAttr('data-prawloader').removeClass('loaderParent').find('.loader').remove();
};


/*
 * Modal
 */
Praw.modal = {};

Praw.modal.open = function (options) {
    var id = Praw.getUniqId();
    Praw.modal.lastId = id;

    /*
     * TODO
     */

    return id;
};

Praw.modal.close = function (id) {
    if (id) {
        // ok
    } else if (Praw.modal.lastId) {
        id = Praw.modal.lastId;
        delete Praw.modal.lastId;
    } else {
        return;
    }

    $('[data-prawmodal="' + id + '"]').remove();
};