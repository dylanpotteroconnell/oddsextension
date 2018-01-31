// Taken from https://stackoverflow.com/questions/4376167/text-selection-and-display-in-context-menu-chrome-extension
// https://stackoverflow.com/questions/41024969/right-click-context-menu-for-chrome

function convertold(input){
  var text = String(input);
  var pattern = /([+|-])([0-9]+)([^0-9]?)/gi;
  var replacedText = text.replace(pattern,
	  function(fm,$1,$2,$3)
	  {
	    if ($1=="+")
	    {
	      return("|"+String(Math.round(100.0/(100.0+parseInt($2))*1000)/10.0)+"\%"+"|"+$3)
	    } else
	    {
	      return("|"+String(Math.round(parseInt($2)/(100.0+parseInt($2))*1000)/10.0)+"\%"+"|"+$3)
	    }
          });
  if(text !== replacedText) {
    return(replacedText)
  } else {
    return(text)
  } 
}

var selection_callbacks = []; 
function getSelection(callback) { 
 selection_callbacks.push(callback); 
    chrome.tabs.executeScript(null, { file:"selection.js" }); 
  }; 
  chrome.extension.onRequest.addListener(function (request) { 
    var callback = selection_callbacks.shift(); 
    callback(request); 
  });

function sendSearch(selectedText) {
  var serviceCall = 'http://www.therx.com/odds-converter-payout-calculator'
  chrome.tabs.create({url: serviceCall});
}
var tx = getSelection();
var title = "Test '" + tx + "' title";
// %s bit goes here
var id = chrome.contextMenus.create({
    title: "Open odds converter website", 
    contexts:["selection"], 
    onclick: function(info, tab) {
        sendSearch(info.selectionText);
    }
});
console.log("selection item:" + id);
