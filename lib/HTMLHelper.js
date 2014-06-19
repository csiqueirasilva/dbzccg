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

// SRC: http://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/

// NEW selector
jQuery.expr[':'].Contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
};