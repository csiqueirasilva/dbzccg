<%@taglib uri="http://www.springframework.org/security/tags" prefix="security" %>

<!-- header -->
<div id="header-content">
    <div id="logo-mobile"><img src="http://${header.host}/DBZWCG/images/html/main-logo.png" /></div>
    <div id="desktop-menu">

<!--        <div class="desktop-menu-option">
            <a target="_blank" href="game.htm">Demo</a>
        </div>
        <div class="desktop-menu-option">
            <a target="_blank" href="album.htm">Album</a>
        </div>-->

        <div id="logo"><img src="http://${header.host}/DBZWCG/images/html/main-logo.png" /></div>

        <security:authorize access="isAnonymous()">
<!--            <div class="div-line"></div>-->
<!--            <div class="desktop-menu-option"><a class="jlink" data-toggle="modal" data-target="#login-form">Login</a></div>-->
<!--            <div class="desktop-menu-option"><a class="jlink" data-toggle="modal" data-target="#signup-form">Sign Up</a></div>-->
        </security:authorize>
    </div>
</div>

<security:authorize access="isAuthenticated()">
    <p>${pageContext.request.userPrincipal.principal.displayName}</p>
    <p><a href="http://${header.host}/DBZWCG/auth/logout">Log out</a></p>
</security:authorize>

<!-- Login Form -->
<div class="modal fade" id="login-form" tabindex="-1" role="dialog" aria-labelledby="Login" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Login</h4>
            </div>
            <form role="form">
                <div class="modal-body" id="login-body">
                    <div class='form-error' id="login-error"></div>
                    <div class="form-group">
                        <label for="login-username">Email</label>
                        <input type="text" maxlength="32" name="email" id="login-username" placeholder="email" />
                    </div>
                    <div class="form-group">
                        <label for="login-password">Password</label>
                        <input name="password" maxlength="32" type="password" id="login-password" placeholder="password" />
                    </div>
                    <span><a class="jlink">Forgot password?</a> | <a class="jlink">Need to register?</a></span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Enter</button>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- End of login Form -->

<!-- Sign Up Form -->
<div class="modal fade" id="signup-form" tabindex="-1" role="dialog" aria-labelledby="Sign Up" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Sign Up</h4>
            </div>
            <form role="form">
                <div class="modal-body" id="signup-body">
                    <div id="signup-help">All fields are required.</div>
                    <div class='form-error' id="signup-error"></div>
                    <div class="form-group">
                        <label for="signup-displayname">Display Name</label>
                        <input autocomplete="off" name="displayname" maxlength="32" type="text" id="signup-displayname" placeholder="display name" />
                    </div>
                    <div class="form-group">
                        <label for="signup-username">Email</label>
                        <input autocomplete="off" name="username" maxlength="32" type="text" id="signup-username" placeholder="email" />
                    </div>
                    <div class="form-group">
                        <label for="signup-password">Password</label>
                        <input autocomplete="off" name="password" maxlength="32" type="password" id="signup-password" placeholder="password" />
                    </div>
                    <div class="form-group">
                        <label for="signup-c-password">Confirm Password</label>
                        <input autocomplete="off" name="c-password" maxlength="32" type="password" id="signup-c-password" placeholder="password" />                
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Enter</button>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- End of Sign Up Form -->

<script>
    $('.modal').on('show.bs.modal', function() {
        $(this).find('.form-error').html('');
        $(this).find('has-error').removeClass('has-error');
        $(this).find('has-success').removeClass('has-success');
        $(this).find('has-warning').removeClass('has-warning');

        $('.form-group:first').children('input').focus();

        window.history.pushState(null, null, 'http://${header.host}/DBZWCG/index.htm#' + this.id);
    });

    $('.modal').on('hide.bs.modal', function() {
        window.history.pushState(null, null, 'http://${header.host}/DBZWCG/index.htm');
    });

    $('#login-form').find('input').keypress(function(ev) {
        if (ev.keyCode === 13) { // enter
            $('#login-form').find('.modal-footer').children('button').click();
        }
    });

    $('#login-form').find('.modal-footer').children('button').click(function() {
        $.ajax({
            url: 'j_spring_security_check',
            type: 'POST',
            data: {
                'j_username': $('#login-username').val(),
                'j_password': $('#login-password').val()
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
        });
    });

    var hash = window.location.hash;

    if ($(hash).hasClass('modal')) {
        $(hash).modal('show');
    }
</script>

<!-- end of header -->