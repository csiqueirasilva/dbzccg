DBZCCG.Network.NetworkObject = function(url, callback) {
    var stompClient;
    var socket = new SockJS(url);
    
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        callback(stompClient);
    });
    
    this.send = function (path, o, data) {
        stompClient.send(path, o, JSON.stringify(data));
    };
};

//(function() {
//    var stompClient = null;
//    var channelsIds = null;
//
//    DBZCCG.startSocket = function(url, channels) {
//        if (stompClient === null) {
//            channelsIds = channels;
//
//
//
////    function disconnect() {
////        stompClient.disconnect();
////        setConnected(false);
////        console.log("Disconnected");
////    }
//
//            function sendName() {
//                var name = document.getElementById('name').value;
//                stompClient.send("/app/chat/global", {}, JSON.stringify({'input': name}));
//            }
//        }
//    };
//
//})();