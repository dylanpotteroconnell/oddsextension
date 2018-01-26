
var elements = document.getElementsByTagName('*');
// https://stackoverflow.com/questions/7168362/run-script-each-time-chrome-extension-icon-clicked
// https://www.bennadel.com/blog/55-using-methods-in-javascript-replace-method.htm
for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var pattern = /([+|-])([0-9][0-9][0-9])([^0-9])/gi;
            var text = node.nodeValue;
            var replacedText = text.replace(pattern, 
                                            function(fm,$1,$2,$3)
                                            {
                                              if ($1=="+")
                                              {
                                                return(String(Math.round(100.0/(100.0+parseInt($2))*1000)/10.0)+"\%"+$3)
                                              } else
                                              {
                                                return(String(Math.round(parseInt($2)/(100.0+parseInt($2))*1000)/10.0)+"\%"+$3)
                                              }
                                            });

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}
