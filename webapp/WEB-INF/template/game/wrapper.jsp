<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta property='og:title' content='DBZWCG' />
        <meta property='og:description' content='A few words' />
        <meta property='og:url' content='http://localhost:8080/DBZWCG' />
        <meta property='og:image' content='http://localhost:8080/DBZWCG/images/cardimages/back.jpg'/>
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='Dragonball Z Web Card Game' />

        <title>DBZWCG</title>

        <base href="${pageContext.request.contextPath}/" target="_self">

        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

        <style>
            <%@include file="/build/dbzccg.min.css" %>
        </style>

        <style type="text/css">
            <%@include file="/css/site.css" %>
        </style>
    </head>
    <body>
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

        <script src="build/dbzccg.min.js"></script>
        <!-- websocket -->
        <script>
            (function() {
                DBZCCG.Network.NetworkObject("<c:url value='/ws' />", function () {
                    DBZCCG.Interface.addMenus(DBZCCG.Network.wrapper);
                });
            })();
        </script>
        <!-- end of websocket -->

        <jsp:include page="header.jsp" />

        <div id="main-content">
            <jsp:include page="/WEB-INF/content/${fn:substring(content, 1, fn:length(content))}" />
        </div>
    </body>
</html>
