<%@taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<security:authorize access="isAuthenticated()">
    <div class="container-fluid">
        <div id="top-options-menu">
            <div class="top-options-menu-cell"><span link="news" class="jlink top-options-menu-link">News</span></div>
            <div class="top-options-menu-cell"><span link="game/find" class="jlink top-options-menu-link">Game</span></div>
            <div class="top-options-menu-cell"><span class="jlink top-options-menu-link">Collection</span></div>
            <div class="top-options-menu-cell"><span link="collection/decks" class="jlink top-options-menu-link">Decks</span></div>
            <div class="top-options-menu-cell"><span class="jlink top-options-menu-link">Shop</span></div>
            <div class="top-options-menu-cell"><span class="jlink top-options-menu-link">Options</span></div>
        </div>
    </div>

    <script>
        (function() {
            var baseUrl = "http://${header.host}${pageContext.request.contextPath}/";

            $(document).ready(function() {

                function jLink() {
                    if (DBZCCG.finishedLoading) {
                        var a = $(this).attr("link");
                        if (a !== undefined) {
                            DBZCCG.loadFunction(function() {
                                DBZCCG.finishedLoading = false;
                                DBZCCG.loadCounter = 1;
                                DBZCCG.loadIcr = 0;
                                return true;
                            });
                            
                            $.ajax({
                                url: baseUrl + a,
                                type: "POST",
                                data: {contentOnly: true}
                            })

                                    .done(function(o) {
                                        window.history.pushState(null, null, baseUrl + a);
                                        $('#main-content').html(o);
                                        jLinkify();
                                    })


                                    .fail(function() {
                                        $('#main-content').html("<div class='central-main-content'><h1>Unable to fetch data from the server</h1></div>");
                                    })

                                    .always(function() {
                                        jLinkify();
                                        DBZCCG.loadIcr++;
                                    });
                        } else {
                            $("#main-content").empty();
                        }
                    }
                }

                function jLinkify() {
                    DBZCCG.finishedLoading = true;
                    $("span.jlink").unbind('click', jLink);
                    $("span.jlink").bind('click', jLink);
                }
                jLinkify();
            });
        })();
    </script>
</security:authorize>