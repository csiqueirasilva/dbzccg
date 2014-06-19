<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Hello WebSocket</title>
        <script src="lib/sockjs-0.3.4.min.js"></script>
        <script src="lib/stomp.js"></script>
        <script type="text/javascript">
            var stompClient = null;

            function setConnected(connected) {
                document.getElementById('connect').disabled = connected;
                document.getElementById('disconnect').disabled = !connected;
                document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
                document.getElementById('response').innerHTML = '';
            }

            function connect() {
                var socket = new SockJS("<c:url value='/chat' />");
                stompClient = Stomp.over(socket);
                stompClient.connect({}, function(frame) {
                    console.log(frame);
                    
                    var user = frame.headers['user-name'];
                    var suffix = frame.headers['queue-suffix'];
                    
                    console.log(suffix);
                    
                    setConnected(true);
                    console.log('Connected: ' + frame);
                    
                    stompClient.subscribe('/chat/global', function(output) {
                        console.log('global chat');
                        showGreeting(JSON.parse(output.body).output);
                    });
                    
                    stompClient.subscribe('/user/chat/private', function(output) {
                        console.log('private chat');
                        showGreeting(JSON.parse(output.body).output);
                    });
                });
            }

            function disconnect() {
                stompClient.disconnect();
                setConnected(false);
                console.log("Disconnected");
            }

            function sendName() {
                var name = document.getElementById('name').value;
                stompClient.send("/app/chat/global", {}, JSON.stringify({'input': name}));
            }

            function showGreeting(message) {
                var response = document.getElementById('response');
                var p = document.createElement('p');
                p.style.wordWrap = 'break-word';
                p.appendChild(document.createTextNode(message));
                response.appendChild(p);
            }
        </script>
    </head>
    <body>
        <noscript><h2 style="color: #ff0000">Seems your browser doesn't support Javascript! Websocket relies on Javascript being enabled. Please enable
            Javascript and reload this page!</h2></noscript>
        <div>
            <div>
                <button id="connect" onclick="connect();">Connect</button>
                <button id="disconnect" disabled="disabled" onclick="disconnect();">Disconnect</button>
            </div>
            <div id="conversationDiv">
                <label>What is your name?</label><input type="text" id="name" />
                <button id="sendName" onclick="sendName();">Send</button>
                <p id="response"></p>
            </div>
        </div>
    </body>
</html>