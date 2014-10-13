DBZCCG.Callbacks = {};

DBZCCG.Callbacks.CompareCallbacks = function(a, b) {
    if (a.priority > b.priority)
        return -1;
    if (a.priority < b.priority)
        return 1;
    return 0;
};

DBZCCG.Callbacks.create = function(player, callbackName, attribCallback) {
    player[callbackName] = [];
    var upperCaseName = callbackName.charAt(0).toUpperCase() + callbackName.substring(1);

    player['remove' + upperCaseName] = function(callback) {
        var idx = this[callbackName].indexOf(callback);
        if (idx !== -1) {
            this[callbackName].splice(idx, 1);
            this[callbackName].sort(DBZCCG.Callbacks.CompareCallbacks);
        }
    };

    player['add' + upperCaseName] = function(callback) {
        var idx = this[callbackName].indexOf(callback);
        if (idx === -1) {
            attribCallback(callback);
            this[callbackName].push(callback);
            this[callbackName].sort(DBZCCG.Callbacks.CompareCallbacks);
        }
    };

    player['solve' + upperCaseName] = function(argsCallback, solveCallback) {
        var cb;
        if (argsCallback instanceof Function && solveCallback instanceof Function) {
            for (var i = 0; i < this[callbackName].length; i++) {
                cb = this[callbackName][i];
                if (cb.f instanceof Function) {
                    var ret = argsCallback(cb);

                    if (ret instanceof Object) {
                        solveCallback(ret);
                    } else if (ret === DBZCCG.cancelAction) {
                        return DBZCCG.cancelAction;
                    }

                    if (cb.life === false) {
                        this['remove' + upperCaseName](cb);
                        i--;
                    }
                }
            }
        }
    };

};