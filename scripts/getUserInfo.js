function getUserInfo() {

  var info = $.parseJSON($('input#hdnMLDTM').val());

  app.userInfo = info;
  countrySelectorInit();
  /*
  $.ajax({
  url: "/_layouts/userdisp.aspx?Force=True",
  context: document.body
  }).done(function(data) {
    var account = $(data).find('table.ms-formtable tbody tr:first-child td:last-child').text().trim();
    function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
    }
    var userInfo = {}
    var cookieArray = getCookie('MLDTMCookie_'+account).split('&');
    $(cookieArray).each(function(i,e){
      var split = e.split('=');
      userInfo[split[0]] = split[1];
    });
    app.userInfo = userInfo;
    countrySelectorInit();
  });
  */


}
