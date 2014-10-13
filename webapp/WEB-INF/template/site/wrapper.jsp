<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<c:choose>
    <c:when test="${!fn:contains(header['User-Agent'],'MSIE')}">
        <%@page contentType="text/html" pageEncoding="UTF-8"%>
        <!DOCTYPE html>
        <html lang="en">
            <head>

                <meta property='og:title' content='DBZWCG' />
                <meta property='og:description' content='A few words' />
                <meta property='og:url' content='http://localhost:8080/DBZWCG' />
                <meta property='og:image' content='http://localhost:8080/DBZWCG/images/cardimages/back.jpg'/>
                <meta property='og:type' content='website' />
                <meta property='og:site_name' content='Dragonball Z Web Card Game' />

                <title>DBZCCG</title>

                <base href="${pageContext.request.contextPath}/" target="_self">

                <meta name="viewport" content="width=device-width, initial-scale=1.0">

                <link href='http://fonts.googleapis.com/css?family=Alegreya+Sans:300' rel='stylesheet' type='text/css'>

                <style>
                    <c:choose>
                        <c:when test="${fn:contains(content, 'game/demo')}" >
                            <%@include file="/build/dbzccg-demo.min.css" %>
                        </c:when>
                        <c:otherwise>
                            <%@include file="/build/dbzccg.min.css" %>
                        </c:otherwise>
                    </c:choose>
                </style>

                <style type="text/css">
                    <%@include file="/css/site.css" %>
                </style>

            </head>
            <body id="body">

                <div id="fb-root"></div>
                <script>(function(d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id))
                            return;
                        js = d.createElement(s);
                        js.id = id;
                        js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.0";
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));</script>

                <div class="modal js-loading-bar">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                Progressing...
                            </div>
                            <div class="modal-body">
                                <div class="progress progress-popup progress-striped active">
                                    <div class="progress-bar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div tabindex="-1" role="dialog" aria-labelledby="Card Details" aria-hidden="true" class="modal in" id="object-info">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 class="modal-title">Card Details</h4>
                            </div>

                            <div class="row modal-body">
                                <div id='display-object-screen' class="col-md-5" style='min-height: 50vmin; cursor: all-scroll;'>
                                </div>

                                <div class="col-md-7" style='text-align: justify;'>
                                    <div id='descriptionBox'>
                                    </div>

                                    <div id='descriptionBoxContent'>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <script>
                    sourceDefaultUrl = '<c:url value="/" />';
                </script>

                <c:choose>
                    <c:when test="${fn:contains(content, 'game/demo')}">
                        <script type="text/javascript" src="<c:url value="/build/dbzccg-demo.min.js" />">
                        </script>
                    </c:when>
                    <c:otherwise>
                        <script type="text/javascript" src="<c:url value="/build/dbzccg.min.js" />">
                        </script>
                    </c:otherwise>
                </c:choose>

                <script>
                    <c:if test="${content != '/index.jsp' && !fn:contains(content, 'game')}">
                    DBZCCG.loadFunction(function() {
                        DBZCCG.loadCounter = 0;
                        DBZCCG.loadIcr = 0;
                        return true;
                    });
                    </c:if>

                    (function() {

                        window.CardInformation = {
                            Effects: DBZCCG.Combat.Effect,
                            Attack: DBZCCG.Combat.Attack,
                            Saga: DBZCCG.Card.Saga,
                            Type: DBZCCG.Card.Type,
                            Defense: DBZCCG.Combat.Defense,
                            Personality: DBZCCG.Personality.Personalities,
                            Rarity: DBZCCG.Card.Rarity,
                            Style: DBZCCG.Card.Style,
                            Alignment: DBZCCG.Personality.alignment,
                            Limit: DBZCCG.Limits
                        };

                        window.ClassHelper = ClassHelper;

                        $.ajax({
                            url: '<c:url value="collection/card/source" />',
                            type: 'POST',
                            dataType: 'json'
                        })

                                .fail(function() {
                                    console.log('error fetching card data!');
                                })

                                .done(function(data) {
                                    for (var i in data) {
                                        DBZCCG[i] = data[i];
                                        for (var j in data[i]) {
                                            for (var k in data[i][j]) {
                                                DBZCCG.Card.sourceCardsReference[data[i][j][k].id] = data[i][j][k];
                                            }
                                        }
                                    }
                                    DBZCCG.Load.sourceCardFetch = true;
                                });

                    <c:if test="${fn:contains(content,'collection')}">
                        window.UserCollection = [];
                    </c:if>

                    <c:choose>
                        <c:when test="${fn:contains(content, 'game/match') || fn:contains(content, 'game/demo')}">
                        DBZCCG.qtipElement = $('#hud');
                        </c:when>
                        <c:otherwise>
                        DBZCCG.qtipElement = $('body');
                        </c:otherwise>
                    </c:choose>
                        InterfaceDBZ.startQtip();
                        InterfaceDBZ.createLeftScreen();

                    <c:if test="${not publicContent}">
                        <c:if test="${fn:contains(content, 'shop') || fn:contains(content, 'game') || fn:contains(content, 'collection')}">
                        DBZCCG.Interface.addMenus("${content}", "<c:url value='/chat' />");
                        </c:if>
                    </c:if>

                        window.onresize();
                    })();
                </script>

                <jsp:include page="header.jsp" />

                <c:if test="${not fn:contains(content, 'game/album') && not fn:contains(content, 'game/match') && not fn:contains(content, 'game/demo') && not fn:contains(content, 'game/match')}">

                    <div id="main-wrapper">
                        <!-- main content -->
                        <div id="main-content">

                        </c:if>


                        <jsp:include page="../content/${fn:substring(content, 1, fn:length(content))}" />

                        <c:if test="${not fn:contains(content, 'game/album') && not fn:contains(content, 'game/match') && not fn:contains(content, 'game/demo') && not fn:contains(content, 'game/match')}">

                        </div>
                        <!-- end of main content -->
                    </div>

                    <jsp:include page="footer.jsp" />

                    <h1 id="resolution-error">You need a resolution higher than 800x600 to display this site.</h1>

                </c:if>

            </body>
        </html>
    </c:when>
    <c:otherwise>
        <html>
            <body>
                We do not support Internet Explorer and never will.
            </body>
        </html>
    </c:otherwise>
</c:choose>
