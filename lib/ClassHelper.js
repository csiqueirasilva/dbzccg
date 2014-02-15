ClassHelper = {};
ClassHelper.extends = function(obj, cls) {
    for (var key in cls) {
        obj[key] = cls[key];
    }
};
ClassHelper.checkValue = function(src, obj) {
    var ret = false;
    if ((src instanceof Array && src.indexOf(obj) !== -1) ||
            src === obj) {
        ret = true;
    }
    return ret;
};

ClassHelper.getKeyByValue = function(object, value) {
    for (var prop in object) {
        if (object[ prop ] === value)
            return prop;
    }
};