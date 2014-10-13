<%@taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!-- header -->
<div id="header-content">
    <div id="desktop-menu">
        <div id="logo">
            <a href="<c:url value="/" />">
                <img src="images/html/main-logo.png" />
            </a>
        </div>

        <security:authorize access="isAnonymous()">
            <div class="desktop-menu-option"><a class="desktop-menu-link" data-toggle="modal" data-target="#login-form">Login</a></div>
            <div class="desktop-menu-option"><a class="desktop-menu-link" data-toggle="modal" data-target="#signup-form">Sign Up</a></div>
        </security:authorize>

        <security:authorize access="isAuthenticated()">
            <div id="configuration-menu-icon" class="qtip-menu-icon desktop-menu-option"><a class='desktop-menu-link'>System</a></div>
            <div id="collection-menu-icon" class="qtip-menu-icon desktop-menu-option"><a class='desktop-menu-link'>Collection</a></div>
            <div id="game-menu-icon" class="qtip-menu-icon desktop-menu-option"><a class='desktop-menu-link'>Game</a></div>
            <div id="personal-menu-icon" class="qtip-menu-icon desktop-menu-option"><a class='desktop-menu-link'>${pageContext.request.userPrincipal.principal.displayName}</a></div>
            <div id="points-menu-display"><img src="images/icons/token-currency-icon.png" /><span id="qtt-user-points">${pageContext.request.userPrincipal.principal.points}</span></div>

            <div id="personal-menu-content" class='qtip-menu-content'>
                <div class='title-menu-content'>Account</div>
                <div class='option-menu-content'>Update my information</div>
                <div class='title-menu-content'>System</div>
                <div class='option-menu-content'><a href='<c:url value="auth/logout"/>'>Logout</a></div>
            </div>

            <div id="game-menu-content" class='qtip-menu-content'>
                <div class='title-menu-content'>Battle</div>
                <div class='option-menu-content'><a href='<c:url value="game/find" />'>Find Match</a></div>
                <div class='option-menu-content'>Create Lobby</div>
                <div class='title-menu-content'>Statistics</div>
                <div class='option-menu-content'>Global</div>
                <div class='option-menu-content'>Personal</div>
                <div class='title-menu-content'>Tutorial</div>
                <div class='option-menu-content'>Basics</div>
                <div class='option-menu-content'>Symbols</div>
            </div>

            <div id="collection-menu-content" class="qtip-menu-content">
                <div class='title-menu-content'>My Collection</div>
                <div class='option-menu-content'>View</div>
                <div class='option-menu-content'>Trade</div>
                <div class='option-menu-content'><a href="<c:url value='collection/decks' />">Decks</a></div>
                <div class='title-menu-content'>Shop</div>
                <div class='option-menu-content'><a href="<c:url value='shop/boosters' />">Boosters</a></div>
                <div class='option-menu-content'>Decks</div>
                <div class='option-menu-content'>Cosmetics</div>
            </div>

            <div id="configuration-menu-content" class='qtip-menu-content'>
                <div class='title-menu-content'>Sound</div>
                <div class='option-menu-content'>Edit</div>
                <div class='title-menu-content'>Performance</div>
                <div class='option-menu-content'>Edit</div>
            </div>

            <!-- Starting QTIPs -->
            <script>
                $('.qtip-menu-icon').qtip({
                    show: {
                        event: 'click',
                        solo: true
                    },
                    hide: {
                        event: 'unfocus'
                    },
                    content: {
                        text: function(event, api) {
                            var id = $(this).attr('id').replace('icon', 'content');
                            return document.getElementById(id).innerHTML;
                        }
                    },
                    position: {
                        my: 'bottom center',
                        at: 'top middle',
                        adjust: {mouse: false},
                        viewport: $(window),
                        effect: false
                    },
                    style: {
                        classes: "qtip-rounded qtip-bootstrap",
                        width: 200
                    }
                });
            </script>
        </security:authorize>

    </div>
</div>

<security:authorize access="isAnonymous()">
    <!-- Login Form -->
    <div class="modal in" id="login-form" tabindex="-1" role="dialog" aria-labelledby="Login" aria-hidden="true">
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
            </div>
        </div>
    </div>
    <!-- End of login Form -->

    <!-- Sign Up Form -->
    <div class="modal in" id="signup-form" tabindex="-1" role="dialog" aria-labelledby="Sign Up" aria-hidden="true">
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
                            <input class="form-control" type="text" autocomplete="off" name="displayname" maxlength="32" id="signup-displayname" placeholder="display name" />
                        </div>
                        <div class="form-group">
                            <label for="signup-username">Email</label>
                            <input class="form-control" type="text" autocomplete="off" name="username" maxlength="32" id="signup-username" placeholder="email" />
                        </div>
                        <div class="form-group">
                            <label for="signup-password">Password</label>
                            <input class="form-control" autocomplete="off" name="password" maxlength="32" type="password" id="signup-password" placeholder="password" />
                        </div>
                        <div class="form-group">
                            <label for="signup-c-password">Confirm Password</label>
                            <input class="form-control" autocomplete="off" name="c-password" maxlength="32" type="password" id="signup-c-password" placeholder="password" />                
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
        var urlInModal = false;
        var originalURL;
        (function() {

            function resetForm() {
                $(this).find('.form-error').html('');
                $(this).find('has-error').removeClass('has-error');
                $(this).find('has-success').removeClass('has-success');
                $(this).find('has-warning').removeClass('has-warning');
                $(this).find('input').val('');

                $('.form-group:first').children('input').focus();

                if (!urlInModal) {
                    originalURL = document.URL;
                    var addedSharp = '#';
                    if (originalURL.charAt(originalURL.length - 1) !== "/") {
                        addedSharp = '/#';
                    }
                    window.history.pushState(null, null, document.URL + addedSharp + this.id);
                }

                urlInModal = false;
            }

            function resetUrl() {
                window.history.pushState(null, null, originalURL);
            }

            function helpEnter(ev) {
                if (ev.keyCode === 13) { // enter
                    $('#login-form').find('.modal-footer').children('button').click();
                }
            }

            $('#signup-form').on('show.bs.modal', resetForm);
            $('#signup-form').on('hide.bs.modal', resetUrl);
            $('#signup-form').find('input').keypress(helpEnter);

            $('#signup-form').find('.modal-footer').children('button').click(function() {

                $('#signup-form').find('.form-error').html('');
                $('#signup-form').find('has-error').removeClass('has-error');
                $('#signup-form').find('has-success').removeClass('has-success');
                $('#signup-form').find('has-warning').removeClass('has-warning');

                var btn = this;

                $(btn).attr('disabled', true);

                $.ajax({
                    url: '<c:url value="/auth/signup" />',
                    type: 'POST',
                    data: {
                        'email': $('#signup-username').val(),
                        'cPassword': $('#signup-c-password').val(),
                        'password': $('#signup-password').val(),
                        'displayName': $('#signup-displayname').val()
                    },
                    dataType: 'json'
                })

                        .fail(function() {
                    alert('Failed to check your login! Internal application error.');
                })

                        .done(function(responseText) {
                    // It comes as json
                    var result = responseText;

                    if (!result.success) {
                        document.getElementById('signup-error').innerHTML = result.error;
                        $('#signup-form').find('input').toggleClass('has-error');
                    } else {
                        alert("Registration successful!");
                        $('#signup-form').modal('hide');
                        window.location.reload();
                    }

                    $(btn).attr('disabled', false);
                });

            });

            $('#login-form').on('show.bs.modal', resetForm);
            $('#login-form').on('hide.bs.modal', resetUrl);
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

<script>
    $(document).ready(function() {
        var hash = window.location.hash;

        if ($(hash).hasClass('modal')) {
            urlInModal = true;
            originalURL = window.location.origin + window.location.pathname;
            $(hash).modal('show');
        }
    });
</script>
<!-- end of header -->