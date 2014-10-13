<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<div class="central-main-content">
    
    <div id="deck-create-button-box" class="row">
        <div class="col-md-offset-4 col-md-4">
            <button type="button" id="deck-list-add-deck" class="btn btn-xl btn-default"><span class="glyphicon glyphicon-plus"></span>Create Deck</button>
        </div>
    </div>

    <div id="deck-list-full-list" class="row">
        <div class="col-md-12">
            <c:choose>
                <c:when test="${fn:length(decks) > 0}">
                    <c:forEach var="ref" items="${decks}">
                        <div class="row">
                            <div class="col-md-12">
                                <span class="jlink deck-link" link="collection/decks/view/${ref.deck.id}">${ref.deck.displayName} (${fn:length(ref.deck.cards) + fn:length(ref.deck.mainPersonality)})</span>
                            </div>
                        </div>
                    </c:forEach>
                </c:when>
                <c:otherwise>
                    <div id='deck-list-no-decks'>
                        No decks yet!
                    </div>
                </c:otherwise>
            </c:choose>
        </div>
    </div>

    <script>
        $(document).ready(function() {

            var deckListRow = '<div class="row">\
                            <div class="col-md-12">\
                                <a href="<c:url value="/collection/decks/register/%deckid%" />">%deckname% (%decksize%)</a>\
                            </div>\
                        </div>';

            $('#deck-list-add-deck').click(function() {

                var btn = this;

                $(btn).attr('disabled', true);

                $.ajax({
                    url: "<c:url value="collection/decks/create" />",
                    type: "POST",
                    data: {
                        uid: ${pageContext.request.userPrincipal.principal.gameId}
                    }
                })

                        .done(function(deck) {
                            $('#deck-list-no-decks').hide();
                            $('#deck-list-full-list > div').append(
                                    deckListRow.replace('%deckid%', deck.id)
                                    .replace('%deckname%', deck.displayName)
                                    .replace('%decksize%', 0)
                                    );
                            $(btn).attr('disabled', false);

                        })

                        .error(function(ev) {
                            alert("An error happened on the server while trying to register your deck.");
                        });

            });

            window.InterfaceDBZ.finishLoad(true);
        });
    </script>

</div>