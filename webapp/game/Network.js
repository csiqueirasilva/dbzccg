DBZCCG.Network.NetworkObject = function(url, callback) {
    if (DBZCCG.Network.wrapper === undefined) {
        var socket = new SockJS(url);

        var stompClient = Stomp.over(socket);

        stompClient.heartbeat.outgoing = 20000;
        stompClient.heartbeat.incoming = 20000;

        stompClient.setCloseCallback(function() {
            alert('disconnected');
        });

        stompClient.connect({}, function(frame) {
            callback(stompClient, frame);
        });

        this.send = function(path, header, body) {
            stompClient.send(path, header, JSON.stringify(body));
        };

        this.subscribe = function(path, callback) {
            return stompClient.subscribe(path, callback);
        };
        
        this.receive = function(path, callback) {
            var subObject = stompClient.subscribe(path, function(o, fr) {
                callback(o, fr);
                subObject.unsubscribe();
            });
            return subObject;
        };
        
        DBZCCG.Network.wrapper = this;
    }
};