console.log("reader");

chrome.app.runtime.onLaunched.addListener(function(launchData) {
    chrome.app.window.create('window.html', {
        'id': 'rtf',
        'outerBounds': {
        'width': 400,
        'height': 500
        }
    }, handleViewerOpening);
});

function handleViewerOpening(rtf_window)
{
    var d = rtf_window.contentWindow.document;
    // this is a terrible hack but I can't figure out how to get an onload/ ready event to fire
    setTimeout(function () {d.getElementsByTagName("div")[0].textContent = "WORKING?";}, 500)
}

