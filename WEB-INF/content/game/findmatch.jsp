<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%@include file="../../template/internal-style-fix.jspf" %>

<ol class="breadcrumb">
    <li>Game</li>
    <li class="active">Find Match</li>
</ol>

<c:choose>
    <c:when test="${fn:length(decks) > 0}">
        <div class='row'>
            <div class='col-md-4'>
                <select id="select-deck-match" class="form-control">
                    <c:forEach var="ref" items="${decks}">
                        <option data-eligible="${ref.eligible}" value='${ref.deck.id}'>${ref.deck.displayName} (Eligible to gameplay: ${ref.eligible})</option>
                    </c:forEach>
                </select>
            </div>
        </div>

        <div class='row'>
            <div id="game-mode-box" class='col-md-4'>
                <h3>Game Modes</h3>

                <label class="checkbox-inline">
                    <input value='ccg' type="checkbox"> DBZ CCG
                </label>
                <label class="checkbox-inline">
                    <input value='ocg' disabled='disabled' type="checkbox"> DBZ OCG
                </label>
                <label class="checkbox-inline">
                    <input value='expz' disabled='disabled' type="checkbox"> Expanded Z
                </label>
            </div>
        </div>

        <div class='row margin-top-1'>
            <div class='col-md-4'>
                <button id='find-match-btn' class='btn btn-default'>Find Match</button>
            </div>
        </div>
        
        
        <script>
            function updateFindButton () {
                var eligible = $("#select-deck-match").find(":selected").attr("data-eligible");
                if(!JSON.parse(eligible) || $('#game-mode-box').find('input:checked').length === 0) {
                    $('#find-match-btn').prop('disabled', true);
                } else {
                    $('#find-match-btn').prop('disabled', false);                    
                }
            }
            
            $('#select-deck-match').change(updateFindButton);
            $('#game-mode-box').find('input[type="checkbox"]').change(updateFindButton);
            
            $('#select-deck-match').trigger('change');
            
            $('#find-match-btn').click(function() {
                window.location.href = '<c:url value="game/match?idDeck=" />' + $("#select-deck-match").val();
            });
        </script>
        
    </c:when>
    <c:otherwise>
        No decks yet!
    </c:otherwise>
</c:choose>