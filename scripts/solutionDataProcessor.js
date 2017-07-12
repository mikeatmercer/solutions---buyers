function solutionDataProcessor(e) {
  /*
  var newTitle;
  if($(e).attr('ows_Solution')) {
    newTitle = $(e).attr('ows_Solution').split(';#')[1].trim();
  }
  if($(e).attr('ows_Product')) {
      newTitle = $(e).attr('ows_Product').split(';#')[1].trim();
  }
  if($(e).attr('ows_ServiceTitle')) {
    newTitle = $(e).attr('ows_ServiceTitle').split(';#')[1].trim();
  }
  */
  var hwc = $(e).attr('ows_Businesses');

  if(hwc) {

    hwc = hwc.split(';#');

    if(hwc[1]) {
      hwc = hwc[1];

    } else {
      hwc = '';
    }
  }
  if(!$(e).attr("ows_NavigateURL")) {
    return;
  }
  var descRaw = $($(e).attr("ows_ShortDescription")).text().trim();


  if(!descRaw || descRaw == ' ') {
    descRaw = 'This solution doesn&rsquo;t have a description yet.'
  }
  var item = {
    id: parseInt($(e).attr("ows_ID")),
    title: $(e).attr("ows_NavigateURL").split(',')[1],
    desc:descRaw,
    url : $(e).attr("ows_NavigateURL").split(',')[0],
    icon : $(e).attr("ows_Icon"),
    needs : arrayListMaker($(e).attr('ows_Client_x0020_Needs')),
    buyers : arrayListMaker($(e).attr('ows_ClientType')),
    solutions: [hwc],
  }
  return item;
}
