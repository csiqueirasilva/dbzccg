HTMLHelper = {};

HTMLHelper.collectFormTextInputs = function() {
    var inputs = $('.modal-body').children('input:visible');
    var ret = {};
    for (var i = 0; i < inputs.length; i++) {
        ret[inputs[i].name] = $(inputs[i]).val();
    }
    
    $('.form-group').children('input:visible').val('');
    return ret;
};