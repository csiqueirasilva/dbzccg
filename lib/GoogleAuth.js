var scopes = 'https://www.googleapis.com/auth/youtube';
var apiKey = 'AIzaSyD681Qp5JR0l06ng_lLM0z8ZFl7aNavj-w';

// Use a button to handle authentication the first time.
function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth, 1);
}

function checkAuth() {
    gapi.auth.authorize({scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
        makeApiCall();
    }
}

function handleAuthClick(event) {
    gapi.auth.authorize({scope: scopes, immediate: false}, handleAuthResult);
    return false;
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
    gapi.client.load('youtube', 'v3', function() {});
}