ClassHelper = {};

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

ClassHelper.getNestedKeyByValue = function(objects, value) {
    for (var key in objects) {
        var ret = ClassHelper.getKeyByValue(objects[key], value);
        if (ret) return ret;
    }
};