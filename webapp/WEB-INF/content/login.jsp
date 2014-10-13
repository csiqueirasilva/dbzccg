<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib uri="http://www.springframework.org/security/tags" prefix="security" %>


<security:authorize access="isAnonymous()">
    <form id="login-form" role="form">
        <div class="modal-body" id="login-body">
            <div class='form-error' id="login-error"></div>
            <div class="form-group">
                <label for="login-username">Email</label>
                <input class="form-control" type="text" maxlength="32" name="email" id="login-username" placeholder="email" />
            </div>
            <div class="form-group">
                <label for="login-password">Password</label>
                <input class="form-control" name="password" maxlength="32" type="password" id="login-password" placeholder="password" />
            </div>
            <span><!--a class="jlink">Forgot password?</a> | --><a class="jlink" target="_blank" href="<c:url value="#signup-form" />">Need to register?</a></span>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary">Enter</button>
        </div>
    </form>

    <script>
        var urlInModal = false;
        var originalURL;
        (function() {
            function helpEnter(ev) {
                if (ev.keyCode === 13) { // enter
                    $('#login-form').find('.modal-footer').children('button').click();
                }
            }

            $('#login-form').find('input').keypress(helpEnter);

            $('#login-form').find('.modal-footer').children('button').click(function() {
                var btn = this;

                $(btn).attr('disabled', true);

                $.ajax({
                    url: '<c:url value="/" />',
                    type: 'POST',
                    data: {
                        'username': $('#login-username').val(),
                        'password': $('#login-password').val()
                    }
                })

                        .fail(function() {
                            alert('Failed to check your login! Internal application error.');
                        })

                        .done(function(responseText) {
                            // It comes as json
                            var result = responseText;

                            if (!result) {
                                document.getElementById('login-error').innerHTML = 'Username and/or Password invalid.';
                                $('#login-form').find('input').toggleClass('has-error');
                            } else {
                                $('#login-form').modal('hide');
                                window.location.reload();
                            }

                            $(btn).attr('disabled', false);
                        });
            });

        })();
    </script>
</security:authorize>