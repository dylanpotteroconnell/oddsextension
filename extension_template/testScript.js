var elements = document.getElementsByTagName('*');
// https://stackoverflow.com/questions/7168362/run-script-each-time-chrome-extension-icon-clicked
for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var pattern = /Harry/gi;
            var text = node.nodeValue;
            var replacedText = text.replace(pattern, 'testingharryabc');

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}
