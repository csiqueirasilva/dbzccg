<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<div class="central-main-content">
    <h1 id="news-title">News</h1>

    <c:forEach var="ref" items="${news}">
        <div class="news-header">${ref}</div>
    </c:forEach>
</div>
