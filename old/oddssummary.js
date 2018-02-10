chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    switch (request.message){
        case "loadNewTab":
            console.log(request.data);
            //You have the object as request.data with tabUrl and tabHtml
            break;
    }
});
