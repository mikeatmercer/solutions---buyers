$(document).ready(function(){

  app.solutions = [],
  app.needs = [],
  app.buyers = [],
  app.countries = [],
  app.items = [];
  app.menu = {
    solutions: {
      Health: 0,
      Wealth: 0,
      Career: 0
    },
    needs: [],
    buyers: []
  }
  app.featuredItems = [];
  app.stats = [];

  var idArray = [];
/*
  $('head title').remove();
  $('head').append('<title>Solutions & Buyers</title>');
  document.title = "Solutions & Buyers";
*/

  //$('#feature-rotator h1.logo ').prepend('<a href="/'+folderValue+'/"><img src="/'+folderValue+'/s_b_logo.png" /></a>')


  getUserInfo();
  popularSolutions() ;

  $('.trending-block a.internal-reload').click(function(){
    getQueries($(this).attr('href'), true);
    return false;
  });

  $('select#country-selector').on('change',function(e){
    e.preventDefault();
    selectionSetter();
  //  $(this).blur();
    //countryTextUpdater();
  //  return false;
  });
  $('select#country-selector').on('click', 'option', function() {
    $('select#country-selector').blur();
  });

  $('#client-issues-wrapper').append(
    '<br/><br/>'
    +'<a href="http://content.mercer.com/Lists/ClientIssuesFeedback/fd_Item_New.aspx" target="_blank">'
      +'<img src="/'+folderValue+'/suggestion-banner.jpg" style="display:block; border:0; margin: 0 auto;"/>'
    +'</a>'

  );











/*
  $().SPServices({
      operation: "GetListItems",
      async: true,
      listName: "SolutionsBuyers",
      CAMLRowLimit: '9999',
      CAMLQuery: '<Query><Where><Contains><FieldRef Name="FileRef" /><Value Type="Text">.js</Value></Contains></Where></Query>',
      CAMLQueryOptions: "<QueryOptions><ViewAttributes Scope='Recursive'/></QueryOptions>",
      CAMLViewFields: "<ViewFields><FieldRef Name='ID' /><FieldRef Name='Title' /><FieldRef Name='Name' /></ViewFields>",
      completefunc: function(xData, Status) {
          if (Status == "success") {

            $(xData.responseXML).SPFilterNode("z:row").each(function(i,e) {


              console.log($(this));




            });

          }
      }
  });
*/

  $().SPServices({
      operation: "GetListItems",
      async: true,
      listName: "SolutionPortfolio",
      CAMLRowLimit: '9999',
      CAMLQueryOptions: "<QueryOptions><ViewAttributes Scope='Recursive'/></QueryOptions>",
      CAMLQuery: '<Query><Where><Eq><FieldRef Name="Published" /><Value Type="Text">1</Value></Eq></Where></Query>',
      CAMLViewFields: "<ViewFields><FieldRef Name='ID' /><FieldRef Name='Featured' /><FieldRef Name='NavigateURL' /><FieldRef Name='LinkTitle' /><FieldRef Name='ShortDescription' /><FieldRef Name='Icon' /><FieldRef Name='Businesses' /><FieldRef Name='Client_x0020_Needs' /><FieldRef Name='ClientType' /><FieldRef Name='Regions' /><FieldRef Name='Countries' /></ViewFields>",
      completefunc: function(xData, Status) {
          if (Status == "success") {

            $(xData.responseXML).SPFilterNode("z:row").each(function(i,e) {


              var item = solutionDataProcessor($(this));
              item.global = globalCheck($(this).attr('ows_Regions'));
              item.countries = countryProcessor($(this).attr('ows_Countries'));


              app.items.push(item);


            });

            app.countries = sortAlpha(app.countries, 'title');
            countrySelectorInit();
            app.items = sortAlpha(app.items,'title');
            addStats();
            createNav();
            //createTrending();

            //selectionSetter();
          }
      }
  });

  function createNav() {
    $(app.items).each(function(i,e){
      app.menu.solutions[e.solutions[0]] = app.menu.solutions[e.solutions[0]] + 1;



    });

    $('#main-filter #solutions > ul li').each(function(){
      var hwc = $(this).attr('data-value');
      if(app.menu.solutions[hwc] < 1) {
        $(this).remove();
        return;
      }
      $(this).find('.count').text('('+app.menu.solutions[hwc]+')');

    });
    $('#main-filter #solutions > ul').removeAttr('style');

    function filterMaker( tag, cols) {
      $(app.items).each(function(i,e){
        $(e[tag]).each(function(i,e){
          var inarray = false,
          itemName = e;
          $(app.menu[tag]).each(function(i,e){
            if(e.name == itemName) {
              inarray = true;
              app.menu[tag][i].count++;
            }
          });
          if(!inarray) {
            app.menu[tag].push({
              name: itemName,
              count: 1
            })
          }
        });
      });

      app.menu[tag] = sortAlpha(app.menu[tag], 'name');

      if(app.menu[tag] < 1) {
        $('#main-filter #'+tag).remove();
      } else {
        if(cols === 2) {
          function sideMaker(side) {
            var HTMLstring = '';
            $(side).each(function(i,e){

              var item = (
                '<li class="filter-link" data-type="'+tag+'" data-value="'+e.name+'">'
                +'<span class="tag">'
                  +e.name
                  +' <span class="count">('+e.count+')</span>'
                +'</span>'
                +'</li>'
              ) ;
              HTMLstring += item;
            });
            return HTMLstring;
          }
          var half_length = Math.ceil(app.menu[tag].length / 2);
          var leftSide = app.menu[tag].splice(0,half_length);

          var leftItems = sideMaker(leftSide);
          var rightItems = sideMaker(app.menu[tag]);
          $('#main-filter #'+tag+' >ul ').html(
            '<li class="left-side"><ul>'+leftItems+'</ul></li>'
            +'<li class="right-side"><ul>'+rightItems+'</ul></li>'
          );

          return null;
        }
        $(app.menu[tag]).each(function(i,e){
          $('#main-filter #'+tag+' > ul').append(
            '<li class="filter-link" data-type="'+tag+'" data-value="'+e.name+'">'
            +'<span class="tag">'
              +e.name
              +' <span class="count">('+e.count+')</span>'
            +'</span>'
            +'</li>'
          );
        });
      }
    }
    filterMaker('buyers');
    filterMaker('needs',2);


    //Add Events
    $('#main-filter li.filter-link').click(function(e){
      e.preventDefault();
      $(this).toggleClass("selected");
      selectionSetter();

    });

    $('#main-filter > li').addClass('active');
    getQueries(location.hash);



  }

  $('#result-container .selected-list button.clear-selected').click(function(e){
    e.preventDefault();
    $('#main-filter li.filter-link').removeClass('selected');
    selectionSetter();
  })
  //selectionSetter();



  function createFeatured() {
    var featuredCards = [];
    var hasItems = false;
    $(app.items).each(function(i,e){
      var id = e.id
      $(app.featuredItems).each(function(ea,item){
        if(item.id == id && item.featured) {
          featuredCards.push(cardMaker(e));
          hasItems = true;
        }
      });
    });

    if(!hasItems) {
      $('#featured-solutions').remove();

      return false;

    }
    $('#featured-solutions .card-list.loading').remove();
    $('#featured-solutions').append(
      '<div id="featured-slider">'

        +'<div class="container card-list"></div>'
      +'</div>'
    );
    if(featuredCards.length < 5) {
      $('#featured-slider > button').remove();
    }
    $(featuredCards).each(function(i,e){
      $('#featured-slider .container').append(
        '<div class="card-container">'
          +e
        +'</div>'
      );
    });
    $("#featured-slider .container").slick({
      autoplay:false,
      prevArrow: '<button type="button"  class="left-arrow slick-prev"></button>',
      nextArrow: '<button type="button" class="right-arrow slick-next"></button>',
      appendArrows: $('#featured-slider'),
      useCSS: false,
      useTransform: false,
      infinite: false,
      slidesToShow: 4,
      variableWidth: true,
      zIndex:1,
      speed: 150

    });
  }






//ROTATOR

  $().SPServices({
      operation: "GetListItems",
      async: true,
      listName: "ClientIssuesRotator",
      CAMLRowLimit: '5',
      CAMLQueryOptions: "<QueryOptions><ViewAttributes Scope='Recursive'/></QueryOptions>",
      CAMLViewFields: "<ViewFields><FieldRef Name='Image' /><FieldRef Name='Internal' /><FieldRef Name='Link' /><FieldRef Name='Order' /></ViewFields>",
      completefunc: function(xData, Status) {
          app.rotator = [];
          if (Status == "success") {

            $(xData.responseXML).SPFilterNode("z:row").each(function() {
              var item = {
                order: parseInt($(this).attr("ows_Order0")),
                link: $(this).attr("ows_Link"),
                image: $(this).attr("ows_Image"),
                internal: $(this).attr('ows_Internal')
              }
              app.rotator.push(item);



            });

            app.rotator.sort(function(a, b){
                var keyA = a.order,
                    keyB = b.order;
                // Compare the 2 dates
                if(keyA < keyB) return -1;
                if(keyA > keyB) return 1;
                return 0;
            });
            createRotator();

          }
      }
  });



  function createRotator() {

    $(app.rotator).each(function(i,e){
      var internal = 'internal-reload';
      if(!e.internal) {
        internal = '';
      }
      $('#feature-rotator-new .container').append(
        '<div class="slide">'
        +'<a class="'+internal+'" href="'+e.link+'" target="_blank">'
        +'<img data-src="'+e.image+'" />'
        +'</a>'
        +'</div>'
      );


    });
    $('#feature-rotator-new .container').on('init', function(event, slick, direction){
      $('#feature-rotator-new').addClass('loaded');
      $('.slick-slide a').click(function(e){
        if(!$(this).parent().hasClass('slick-active')) {
          e.preventDefault();
        }
        if($(this).hasClass('internal-reload') && $(this).parent().hasClass('slick-active')) {
          e.preventDefault();
          getQueries($(this).attr('href'), true);

        }

      });
    });
    $('#feature-rotator-new .container .slide:first-child img').one('load',function(){
      $('#feature-rotator div.loading').remove();
      $('#feature-rotator-new .container').slick({
        autoplay: true,
        arrows:false,
        dots: true,
        vertical: true,
        verticalSwiping:true,
        speed: 250,
        appendDots: $('#feature-rotator-new .dot-container'),
        //variableWidth: true,
        useCSS: false,
        useTransform: false,
        autoplaySpeed:5000,
        focusOnSelect:true
      });
    });
    $('#feature-rotator-new .container .slide img').each(function(){
      var src = $(this).attr('data-src');
      $(this).attr('src', src);
    });

  }

  function getQueries(toHash, move) {
    $('#main-filter li.filter-link').removeClass('selected');
    var toClick = {};
    var hash = decodeURIComponent(toHash.substr(1)).split('&&');
    if(!hash[0]) {
      return false;
    }
    $(hash).each(function(i,e){
      var cut = e.split('=');
      if(!cut[0] || !cut[1]) {
        return;
      }
      toClick[cut[0]] = cut[1].split('||');
    });
    $.each( toClick, function(type,theArray) {
      $(theArray).each(function(i,e){

        $('#main-filter  li.filter-link[data-type="'+type+'"][data-value="'+e+'"]').addClass('selected');
      });

    });
    if(move) {
      $('#s4-workspace').scrollTop(200);
    }
    selectionSetter();


  }



  $.ajax({
    url: '/'+folderValue+'/solution_stats.csv'
  }).done(function(data) {


   var d = data.split("\r\n");
    var thing = [];
  $(d).each(function(i,e){
    var obj = e.split(',');
    thing.push({
      title: obj[0],
      num: parseInt(obj[1])
    });
  });
  app.stats = thing;

  addStats();

});

function addStats() {

  if(!app.items.length || !app.stats.length) {
    return false;
  }

  $(app.items).each(function(i,e){
    var view = 0;
    var itemTitle = e.url.replace('http://solutions.mercer.com/','').replace('http://solutions-ua.mercer.com/','').replace('/','').replace('default.aspx','').trim();
    var indexI = i;
      $(app.stats).each(function(i,e){
        if(itemTitle.toLowerCase() == e.title.toLowerCase()) {
          view = e.num;
          return false;
        }
      });
    if(view == 0) {
      console.log(itemTitle);
    }
    app.items[indexI]['num'] = view ;
  });



}




});
