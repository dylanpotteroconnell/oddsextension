$(function() {
  $('#s').click(function() {
     var url  = "https://www.google.com/search?q=" + $('#q').val();
     chrome.tabs.create({url: url});
  });
});

document.addEventListener('DOMContentLoaded');
