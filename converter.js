function convML(obj) {
  if(/^[\+|-] ?[0-9]+$/.test(obj.value)){
    var pattern = /([+|-]) ?([0-9]+)/;
    var newIP = obj.value.replace(pattern,
      function(fm,$1,$2)
      {
        if ($1=="+")
        {
	  return(Math.round(100.0/(100.0+parseInt($2))*1000)/10.0)
        } else
	{
	  return(Math.round(parseInt($2)/(100.0+parseInt($2))*1000)/10.0)
        }
      });
     var newFrac = String(Math.round(100/(newIP/100.0)-100)/100)+"/"+"1";
     document.getElementById('ip').value = newIP;
     document.getElementById('frac').value = newFrac;
  } 
}

function convFrac(obj) {
  document.getElementById('ip').value = obj.value;
// Add decimals

  if(/^[0-9]+\.?[0-9]*\/[0-9]+\.?[0-9]*$/.test(obj.value)){
    var pattern = /([0-9]+\.?[0-9]*)\/([0-9]+\.?[0-9]*)/;
    var newIP  = obj.value.replace(pattern,
					  function(fm,$1,$2)
					  {
					     return(Math.round(1000*parseFloat($2)/(parseFloat($2)+parseFloat($1)))/10.0)
					  }
				    );
     document.getElementById('ip').value = newIP;
     document.getElementById('ml').value = IPtoML(parseFloat(newIP)/100.0);
  }
}

function convIP(obj) {
  if(/^[0-9]+\.?[0-9]*$/.test(obj.value)){
    document.getElementById('ml').value = IPtoML(parseFloat(obj.value)/100.0);
  }
}

function IPtoML(IP) {
  if (IP > .5) {
    return("-" + String(Math.round(100.0*IP/(1-IP))))
  } else if (IP <= .5) {
    return("+"+String(Math.round(100.0/IP - 100)))
  }
}
