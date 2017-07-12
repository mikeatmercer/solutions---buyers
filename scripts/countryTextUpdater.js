function countryTextUpdater() {
  var v = $('#country-selector').val();
  var text = $('#country-selector option:selected').text();
  if(v == 'All') {
    $('.country-holder .top').text('Showing:');
    $('.country-holder .selector .text').text('All Solutions');
    return false;
  }

  if(v == 'Global') {
    $('.country-holder .top').text('Showing:');
    $('.country-holder .selector .text').text('Global Solutions');
    return false;
  }
  $('.country-holder .top').text('Solutions Available in:');
  $('.country-holder .selector .text').text(text);
}
