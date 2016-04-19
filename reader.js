function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// stolen directly from view-source:http://tbluemel.github.io/rtf.js/samples/rtf.html
var settings = {
    onPicture: function(create) {
        var elem = create().attr("class", "rtfpict"); // WHY does addClass not work on <svg>?!
        return setPictBorder(elem, showPicBorder);
    },
    onHyperlink: function(create, hyperlink) {
        var url = hyperlink.url();
        var lnk = create();
        if (url.substr(0, 7) == "http://") {
            // Wrap http:// links into a <span>
            var span = setUnsafeLink($("<span>").addClass("unsafelink").append(lnk), warnHttpLinks);
            span.click(function(evt) {
                if ($("#warnhttplink").prop("checked")) {
                    evt.preventDefault();
                    alert("Unsafe link: " + url);
                    return false;
                }
            });
            return {
                content: lnk,
                element: span
            };
        } else {
            return {
                content: lnk,
                element: lnk
            };
        }
    },
};

// get RTF url and load it
var url = getParameterByName("file") + "?file=";
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    var response = xhr.responseText;
    try {
        var doc = new RTFJS.Document(response);
        $(document.body).append(doc.render(), settings);
    } catch (e) {
        console.error(e);
        console.log(response);
    }
};
xhr.open('GET', url, true);
xhr.send();