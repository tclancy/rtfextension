chrome.app.runtime.onLaunched.addListener(function(launchData) {
    debugger;
    chrome.app.window.create('window.html', {
        'outerBounds': {
        'width': 400,
        'height': 500
        }
    });
    console.log("called");
});