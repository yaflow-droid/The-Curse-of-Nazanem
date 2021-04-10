// Source here: https://github.com/stevegreatrex/JsUtils/blob/master/JsUtils/pubsub.js
var events = {},
    defaults = {
        stateful: false,
        async: false
    },
    getEvent = function (event) {
        if (!events[event]) {
            events[event] = {
                subscriptions: []
            };
        }
        return events[event];
    };

window.subscribe = function (event, callback, _this) {
    if (typeof event !== "string") {
        throw "Event name must be a string";
    }

    var subscription;

    if (typeof callback === "function") {
        subscription = $.extend({ callback: callback, this: _this }, defaults);
    } else {
        subscription = $.extend({ this: _this }, defaults, callback);
        if (!subscription.callback) {
            throw "Callback was not specified on options";
        }
    }


    getEvent(event).subscriptions.push(subscription);

    if (subscription.stateful) {
        subscription.callback.call(subscription.this, getEvent(event).lastPayload);
    }
};

window.publish = function (event, data) {
    if (typeof event !== "string") {
        throw "Event name must be a string";
    }

    getEvent(event).lastPayload = data;
    var subscriptions = events[event].subscriptions;
    for (var i = 0; i < subscriptions.length; i++) {
        if (subscriptions[i].async) {
            setTimeout(function () {
                subscriptions[i].callback.call(subscriptions[i].this, data);
            }, 4);
        } else {
            subscriptions[i].callback.call(subscriptions[i].this, data);
        }
    }
};
