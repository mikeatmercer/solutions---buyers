function arrayListMaker(list) {
  if(!list) {
    return [];
  }
  var wiped = list.replace(/[0-9]/g, '').replace(/;#;#/g, '_^_').replace(';#','');
  return wiped.split('_^_');
}

function sortAlpha(thea,t,toHigh) {
  if(toHigh) {
    thea.sort(function(a, b){
      if(a[t] > b[t]) return -1;
      if(a[t] < b[t]) return 1;
      return 0;
    });

  } else {
    thea.sort(function(a, b){
      if(a[t] < b[t]) return -1;
      if(a[t] > b[t]) return 1;
      return 0;
    });
  }
  return thea;
}
