function cardMaker(e, none) {
  var icon,
      hide = '',
      longTitle = ''

  if(!e.icon) {

    icon = '/'+folderValue+'/default-icon.png';
  } else {
    icon = e.icon;
  }
  if(none) {
    hide = 'invisible-card';
  }
  if(e.title.length > 60) {
    longTitle = 'long-title';
  }

  return (
    '<div data-id="'+e.id+'" data-desc="'+e.desc+'" class="card solution-'+e.solutions+' '+hide+' '+longTitle+'" data-num="'+e.num+'">'
      +'<a href="'+e.url+'" target="_blank">'
        +'<span class="header" style="background-image: url(/'+folderValue+'/card-triangles-'+(e.id % 3)+'.png);">'
          +'<span class="title">'+e.title+'</span>'
          +'<span class="icon-holder">'
            +'<img src="'+icon+'" alt="'+e.title+'" />'
          +'</span>'
        +'</span>'
        +'<span class="content-holder">'
          + '<div class="desc">'+e.desc+'</div>'
          + '<span class="more-btn">Learn More</span>'
        +'</span>'
      +'</a>'
    +'</div>'
  )
}
