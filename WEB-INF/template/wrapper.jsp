<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<c:choose>
    <c:when test="${!fn:contains(header['User-Agent'],'MSIE')}">
        <%@page contentType="text/html" pageEncoding="UTF-8"%>
        <html>
            <head>
                <title>DBZCCG</title>

                <style type="text/css">
                    <jsp:include page="../../css/bootstrap.min.css" />
                </style>

                <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open+Sans">

                <style type="text/css">
                    <jsp:include page="../../css/site.css" />
                </style>

            </head>
            <body>

                <script>
                    <jsp:include page="../../lib/jquery.min.js" />
                    <jsp:include page="../../lib/bootstrap.min.js" />
                    <jsp:include page="../../lib/HTMLHelper.js" />
                </script>

                <jsp:include page="header.jsp" />

                <div id="header-content-bg-fix"></div>
                
                <div id="header-content-margin-fix"></div>
                
                <div id="main-wrapper">
                    <!-- main content -->
                    <div id="main-content">
                        <jsp:include page="${fn:replace(content, '/', '../content/')}" />
                    </div>
                    <!-- end of main content -->

                </div>

                <jsp:include page="footer.jsp" />

                <h1 id="resolution-error">You need a resolution higher than 800x600 to display this site.</h1>
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
