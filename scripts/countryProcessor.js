function countryProcessor(c) {
  if(!c) {
    return [];
  }
  var ca=c.split(';#');
  var solutionCountries = [];
  for (i = 0; i < ca.length; i++) {
    if(i % 2) {
      var item = {
        id: parseInt(ca[i-1]),
        title: ca[i]
      }
      var toAdd = true
      $(app.countries).each(function(i,e){
        if(e.id === item.id) {
          toAdd = false;
          return false;
        }
      });
      if(toAdd) {
        app.countries.push(item);
      }
      solutionCountries.push(item.id);
    }
  }
  return solutionCountries;
}
