<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<div class="central-main-content">

    <div class="row">
        <div class="col-lg-7">
            <div class="container-fluid"><span class="deck-view-name">${deck.displayName}</span>
                <c:if test="${owner == true}">
                    <button>Edit</button>
                    <button>Erase</button>
                </c:if>
            </div>
            <div class="container-fluid">
                
            </div>
        </div>
        <div class="col-lg-5">
            <c:choose>
                <c:when test="${(matchStats.loses + matchStats.wins) == 0}">
                    No matches yet
                </c:when>
                <c:otherwise>
                    <div>${matchStats.wins} - ${matchStats.loses}</div>
                    <div>${matchStats.wins / (matchStats.wins + matchStats.loses)}</div>
                    
                    <div>
                        <c:forEach var="match" items="${recentMatches}">
                            ${match}
                        </c:forEach>
                    </div>
                </c:otherwise>
            </c:choose>
            
        </div>
    </div>

</div>