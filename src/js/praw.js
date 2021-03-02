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
Praw.loader = class {
    constructor(options) {
        this.id = Praw.getUniqId();

        var container = $('body');
        if (options) {
            if (options.container) {
                container = $(options.container);
            }
        }

        container.addClass('loaderParent').append($('<div>').addClass('loader').append($('<div>'))).attr('data-prawloader', this.id);
    }

    close() {
        $('[data-prawloader="' + this.id + '"]').removeAttr('data-prawloader').removeClass('loaderParent').find('.loader').remove();
    }
};


/*
 * Modal
 */
Praw.modal = class {
    constructor(options) {
        if (!options) {
            options = {};
        }

        /*
         * Générales
         */
        if (options.type) {
            if (options.type === "conf") {
                if (!options.title) {
                    options.title = "Confirmation";
                }
                if (!options.modalClass) {
                    options.modalClass = "border-solid border-conf border-x2";
                }
                if (!options.titleClass) {
                    options.titleClass = "color-conf";
                }
            } else if (options.type === "err") {
                if (!options.title) {
                    options.title = "Error";
                }
                if (!options.modalClass) {
                    options.modalClass = "border-solid border-err border-x2";
                }
                if (!options.titleClass) {
                    options.titleClass = "color-err";
                }
            } else if (options.type === "warn") {
                if (!options.title) {
                    options.title = "Warning";
                }
                if (!options.modalClass) {
                    options.modalClass = "border-solid border-warn border-x2";
                }
                if (!options.titleClass) {
                    options.titleClass = "color-warn";
                }
            } else if (options.type === "info") {
                if (!options.title) {
                    options.title = "Information";
                }
                if (!options.modalClass) {
                    options.modalClass = "border-solid border-info border-x2";
                }
                if (!options.titleClass) {
                    options.titleClass = "color-info";
                }
            }
        }

        if (!options.title) {
            options.title = "";
        }

        if (!options.content) {
            options.content = "";
        }

        /*
         * Callbacks
         */
        var m = this;
        var closeModalFunction = function () {
            m.close();
        };

        if (!(options.overlayClosureCallback && typeof options.overlayClosureCallback === "function")) {
            options.overlayClosureCallback = closeModalFunction;
        }

        if (!(options.modalClosureCallback && typeof options.modalClosureCallback === "function")) {
            options.modalClosureCallback = closeModalFunction;
        }

        this.id = Praw.getUniqId();

        var modal = $('<div>').addClass("modal-content").css('min-width', "600px");
        if (options.modalClass) {
            modal.addClass(options.modalClass);
        }
        var tmp = $('<h6>').text(options.title).addClass("d-inline");
        if (options.titleClass) {
            tmp.addClass(options.titleClass);
        }
        modal.append($('<div>').addClass("modal-header").append(tmp).append($('<div>').addClass("u-pull-right").append($('<span>').addClass("icon-x font-size-x15 cursor-pointer").on('click', options.modalClosureCallback))));
        modal.append($('<div>').addClass("modal-body").append(options.content));

        var buttons = [];
        $.each(options.buttons, function (i, btn) {
            var tmp = $('<button>').addClass("btn-small");
            if (btn.name) {
                tmp.text(btn.name);
            }
            if (btn.type) {
                if (btn.type === "conf") {
                    tmp.addClass("btn-conf");
                } else if (btn.type === "err") {
                    tmp.addClass("btn-err");
                } else if (btn.type === "warn") {
                    tmp.addClass("btn-warn");
                } else if (btn.type === "info") {
                    tmp.addClass("btn-info");
                }
            }
            if (btn.onClick && typeof btn.onClick === "function") {
                tmp.on('click', btn.onClick);
            } else {
                tmp.on('click', closeModalFunction);
            }
            buttons.push(tmp);
        });
        if (buttons.length === 0) {
            buttons.push($('<button>').addClass("btn-small").text("Close").on('click', closeModalFunction));
        }
        modal.append($('<div>').addClass("modal-footer text-right").append(buttons));

        modal = $('<div>').addClass("modal").attr('data-prawmodal', this.id).append(modal).append($('<div>').addClass("modal-overlay modal-close-btn").on('click', options.overlayClosureCallback));

        if (options.animation) {
            modal.addClass("modal-animated-" + options.animation);
        } else {
            modal.addClass("modal-animated-dropdown");
        }

        $('body').append(modal);
    }

    close() {
        $('[data-prawmodal="' + this.id + '"]').remove();
    }
};