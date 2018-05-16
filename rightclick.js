// Taken from https://stackoverflow.com/questions/4376167/text-selection-and-display-in-context-menu-chrome-extension
// https://stackoverflow.com/questions/41024969/right-click-context-menu-for-chrome

var selection_callbacks = []; 
function getSelection(callback) { 
 selection_callbacks.push(callback); 
    chrome.tabs.executeScript(null, { file:"selection.js" }); 
  }; 
  chrome.extension.onRequest.addListener(function (request) { 
    var callback = selection_callbacks.shift(); 
    callback(request); 
  });

function openConverter(selectedText) {
  var serviceCall = 'converter.html'; 
  chrome.tabs.create({url: serviceCall}, function (tab) {
    var c = "document.getElementById('ip').value = 'abc';"
    chrome.tabs.executeScript(tab.id, {code: c});
   });
}
var tx = getSelection();
var title = "Convert: '" + tx + "' title";
// %s bit goes here
var id = chrome.contextMenus.create({
    title: "Convert Odds?", 
    contexts:["selection"], 
    onclick: function(info, tab) {
        openConverter(info.selectionText);
    }
});
console.log("selection item:" + id);
