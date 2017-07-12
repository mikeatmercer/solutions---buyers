function regionFiltering(items) {
  var v = $('select#country-selector').val();

  if(v == 'All') {
    return items;
  }
  if(v == 'Global') {
    return $.grep(items, function( e ) {
      return e.global == true;
    });
  }
  return $.grep(items, function( e ) {
    return $.inArray( parseInt(v), e.countries ) !== -1 || e.global == true ;
  });
}
