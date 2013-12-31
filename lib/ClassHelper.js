ClassHelper = {};

ClassHelper.extends = function (obj, cls) {
    for (var key in cls) {
        obj[key] = cls[key];
    }
};