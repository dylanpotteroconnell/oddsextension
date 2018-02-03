var elements = document.getElementsByTagName('*');

// Used these resources heavily
// https://stackoverflow.com/questions/7168362/run-script-each-time-chrome-extension-icon-clicked
// https://www.bennadel.com/blog/55-using-methods-in-javascript-replace-method.htm
// https://9to5google.com/2015/06/14/how-to-make-a-chrome-extensions/

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
// Three possible conversions
// 1. Moneyline -> Implied Probability
            var text = node.nodeValue;
// Finds patterns of +X or -X, where X is decimal number.
            var pattern = /([+|-])([0-9]+)([^0-9]?)/gi;
// Replaces it with the form |X%|, where X has one digit of decimal
            var replacedText = text.replace(pattern, 
                                            function(fm,$1,$2,$3)
                                            {
                                              if ($1=="+")
                                              {
                                                return("|"+String(Math.round(100.0/(100.0+parseInt($2))*1000)/10.0)+"\%"+"|"+$3)
                                              } else
                                              {
                                                return("|"+String(Math.round(parseInt($2)/(100.0+parseInt($2))*1000)/10.0)
                                                         +"\%"+"|"+$3)
                                              }
                                            });
// 2. Implied Probability -> Moneyline
            var textRev = node.nodeValue;
            var patternRev = /\|([0-9][0-9]\.?[0-9]?)%\|/gi;
// Finds patterns of our own created implied probabilities, |X%|
            var replacedTextRev = textRev.replace(patternRev,
                                                  function(fm,$1)
                                                  {
                                                    var impprob = parseFloat($1)/100.0;
                                                    if (impprob > .5)
                                                    {
                                                      return("-"+String(Math.round(100.0*impprob/(1-impprob))))
                                                    } else
                                                    {   
                                                      return("+"+String(Math.round(100.0/impprob - 100)))
                                                    }
                                            });                   
// 3. Fractional Odds -> Implied Probability
            var textOdds = node.nodeValue;
// Only finds pattern of X/Y, where X and Y are integers
            var patternOdds = /([0-9]+)\/([0-9]+)([^0-9]?)/gi;
// Replaces it with the form |X%|, where X has one digit of decimal
            var replacedTextOdds = textRev.replace(patternOdds,
                                                  function(fm,$1,$2,$3)
                                                  {
                                                     return("|"+String(Math.round(1000*parseFloat($2)/(parseFloat($2)+parseFloat($1)))/10.0)+"%" +"|"+$3) 
                                                  } 
                                            );
// In order, check which of the three conversions detected, and make the switch
            if (replacedTextRev !== textRev) {
                element.replaceChild(document.createTextNode(replacedTextRev), node);
            } else if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            } else if (replacedTextOdds !== textOdds) {
                element.replaceChild(document.createTextNode(replacedTextOdds), node);
            }
        }

    }
}
