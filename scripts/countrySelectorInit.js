function countrySelectorInit() {

  if(!app.countries.length || !app.userInfo) {
    return false;
  }

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
 var countryOptions = '';
 $(app.countries).each(function(i,e){
   var selected = '';
   if(app.userInfo.Country == e.title) {
     selected = 'selected';
   }
   countryOptions += '<option '+selected+' value="'+e.id+'">'+e.title+'</option>';

 });
 $('.country-holder .selector').append(
   '<select id="country-selector" onchange="countryChange()">'
    +'<option value="All">All Solutions</option>'
    +'<option value="Global">Global Solutions</option>'
    +countryOptions
   +'</select>'
 );
 /*
 if(!app.userInfo.Country) {
   return false;
 }
 if($('#country-selector option:contains("'+app.userInfo.Country+'")').length) {
   var v = $('#country-selector option:contains("'+app.userInfo.Country+'")').attr('value');
   //$('#country-selector').val(v).trigger('change');
   $('#country-selector').blur();

 }
 */


}
