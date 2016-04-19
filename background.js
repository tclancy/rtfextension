var filters = {urls: ["http://*/*.rtf", "https://*/*.rtf"]};

chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    // console.log("onBeforeRequest");
    // TODO: make this a case-insenitive regex match, needs to be end of url only, can we check mime-type?
    // You'd think Chrome would make this a bit easier
    if (info.url.indexOf('.rtf') != -1 && info.url.indexOf("?file=") == -1) {
        // console.log("Found an RTF!");
        chrome.tabs.create(
            {url: "reader.html?file=" + info.url}
        );
        return {
            cancel: true
        };
    }
  },
  filters,
  ["blocking"]
);