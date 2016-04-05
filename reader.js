chrome.app.runtime.onLaunched.addListener(function(launchData) {
    chrome.app.window.create('window.html', {
        'id': 'rtf',
        'outerBounds': {
        'width': 400,
        'height': 500
        }
    }, function (rtf_window) {
        chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
            if (response) {
                console.log(response.farewell);
            } else {
                console.log("NO CARRIER");
            }
        });
    });


    // console.log(reader);
    // chrome.app.window.getAll()[0]
    // document here refers to the background page and not the window we have open
    //document.getElementsByTagName("div")[0].textContent = "Bite me";
});

