<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%@include file="../../template/internal-style-fix.jspf" %>

<ol class="breadcrumb">
    <li>Shop</li>
    <li class="active">Boosters</li>
</ol>

<div class="row">
    <div class="col-md-6 col-md-offset-3">    
        <h1 class="booster-shop-collection-title">Collectible Card Game</h1>
        <c:forEach var="saga" items="${collectibleCardGame}">
            <div class="row booster-shop-booster-row">
                <div class="col-md-offset-2 col-md-2">
                    <div class="row">
                        <div class="col-md-2 col-md-offset-5">
                            <h4 class="booster-shop-quantity-display" id="booster-shop-${saga}-quantity">1x</h4>
                            <input min="1" max="${fn:substringBefore(pageContext.request.userPrincipal.principal.points / boosterPrice,'.')}" step="1" class="booster-shop-quantity-input" type="number" id="booster-shop-${saga}-quantity-input" value="1">
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <button type="button" saga="${saga}" collection="${collectibleCardGameId}" class="purchase-btn btn btn-xl btn-default">
                        ${saga} Saga Booster Pack for <img class="body-currenty-token" src="images/icons/token-currency-icon.png" /> <span id="booster-shop-${saga}-price" class="booster-shop-price-tag">${boosterPrice}</span>
                    </button>
                </div>
            </div>
        </c:forEach>
    </div>
</div>

<script>
    $(document).ready(function () {
        $('.purchase-btn').click(function() {
            if($(this).prop('disabled') === false) {
                $('.purchase-btn').prop('disabled', true);
                var collectionRef = $(this).attr('collection');
                var sagaRef =  $(this).attr('saga');
                var qtt = parseInt($(this).parents('.booster-shop-booster-row').find('.booster-shop-quantity-input').val());
                
                window.InterfaceDBZ.toggleModalProgress();
                
                $.ajax({
                    url: "<c:url value="shop/boosters/buy" />",
                    data: {
                        saga: sagaRef,
                        qtt: qtt,
                        collection: collectionRef
                    },
                    type: "POST"
                })
                
                .complete(function() {
                    window.InterfaceDBZ.toggleModalProgress();
                    $('.purchase-btn').prop('disabled', false);
                })
                
                .fail(function () {
                    alert('Could not complete the booster pack purchase. An error happened.');
                })
                
                .done(function (ret) {
                    if(ret === null) {
                        alert('Could not complete the booster pack purchase. An error happened.');
                    } else {
                        $('#dbz-interface-select-modal').find('.modal-dialog').css('width', '40%');
            
                        $('#dbz-interface-select-modal').on('hide.bs.modal', function () {
                            window.location.reload();
                        });
                        
                        $('#dbz-interface-select-modal').on('shown.bs.modal', function () {
                            var selectModal = this;
                            window.setTimeout(function() {
                                InterfaceDBZ.createLinks(selectModal);
                            }, 150);
                        });
                        
                        var buttons = '<div class="row"><div class="col-md-offset-4 col-md-4"><h4>Booster pack purchase complete</h4></div></div>';
                        buttons += '<div class="row"><div class="col-md-offset-5 col-md-2"><button onclick="$(\'#dbz-interface-select-modal\').modal(\'hide\');" class="btn btn-default">Close</button>';
                        buttons += '</div></div><div class="row"><div class="col-md-offset-2 col-md-8 margin-top-1">';
                        
                        for(var i in ret) {
                            buttons += '<div>{C#' + ret[i].sourceCard + '}</div>';
                        }
    
                        buttons += '</div></div>';
                        InterfaceDBZ.selectWindow(buttons);
                    }
                });
            }
        });
        
        $('.booster-shop-quantity-display').click(function() {
            $(this).hide();
            var input = $(this).siblings('.booster-shop-quantity-input');
            var length = input.val().length;
            input.focus().show()[0].setSelectionRange(length, length);
        });
        
        $('.booster-shop-quantity-input').blur(function() {
            var value = parseInt($(this).val());
            var max = parseInt($(this).attr('max'));
            var min = parseInt($(this).attr('min'));
            
            if(isNaN(value)) {
                value = parseInt($(this).attr('min'));
                $(this).val(value);
            } else if(value > max) {
                value = max;
                $(this).val(max);
            } else if (value < min) {
                value = min;
                $(this).val(min);
            }
            
            $(this).hide();
            $(this).siblings('.booster-shop-quantity-display').show().html(value + 'x');
            $(this).parents('.booster-shop-booster-row').find('.booster-shop-price-tag').html(${boosterPrice} * parseInt(value));
        });
        
        window.InterfaceDBZ.finishLoad(true);
    });
</script>
