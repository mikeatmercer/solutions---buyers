function popularSolutions() {
  getSPList('FeaturedTrending',"<FieldRef Name='Solution' /><FieldRef Name='Solution:ID' /><FieldRef Name='FeaturedSelections' />",'<Query><Where><Contains><FieldRef Name="FeaturedSelections" /><Value Type="Text">Trending</Value></Contains></Where></Query>',processSolutions);
  function processSolutions(data) {
    $(data).each(function(i,e){
      var solutionID = $(e).attr('ows_Solution').split(';#')[0];
      getSPList("SolutionPortfolio", "<FieldRef Name='Featured' /><FieldRef Name='NavigateURL' /><FieldRef Name='LinkTitle' /><FieldRef Name='ShortDescription' /><FieldRef Name='Icon' /><FieldRef Name='Businesses' /><FieldRef Name='Client_x0020_Needs' /><FieldRef Name='ClientType' />", '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Text">'+solutionID+'</Value></Eq></Where></Query>', cardProcess);
    });
  }
  function cardProcess(data) {
    var card;
    $(data).each(function(i,e){
      card = solutionDataProcessor($(this));
    });
    $('#trending-solutions .trending-block[data-solution="'+card.solutions[0]+'"] .card-list').append(cardMaker(card));
    $('#trending-solutions .trending-block[data-solution="'+card.solutions[0]+'"]').show();
    if ($('#trending-solutions .trending-block .card').length) {
      $('#trending-solutions .card-list.loading').remove();
    }
    $('#trending-solutions .trending-block').each(function(){
      if($(this).find('.card-list .card').length > 3) {
        $(this).find('.top-header h2 > a').addClass('fullHouse');
      }
    });
  }

}

/*
// GET FEATURED TREDNING
  $().SPServices({
      operation: "GetListItems",
      async: true,
      listName: "FeaturedTrending",
      CAMLRowLimit: '999',
      CAMLQueryOptions: "<QueryOptions><ViewAttributes Scope='Recursive'/></QueryOptions>",
      CAMLViewFields: "<ViewFields><FieldRef Name='Solution' /><FieldRef Name='Solution:ID' /><FieldRef Name='FeaturedSelections' /></ViewFields>",
      completefunc: function(xData, Status) {

          if (Status == "success") {
            $(xData.responseXML).SPFilterNode("z:row").each(function() {

              var item = {
                featured: featuredSplit($(this).attr('ows_FeaturedSelections')).featured,
                trending: featuredSplit($(this).attr('ows_FeaturedSelections')).trending,
                id: parseInt($(this).attr('ows_Solution').split(';#')[0])
              }
              app.featuredItems.push(item);

              function featuredSplit(f) {
                if(!f) {
                  return {
                    featured: false,
                    trending: false
                  }
                }
                var trending = true,
                    featured = true;
                var thea = f.split(';#');
                if( $.inArray("Trending",thea) == -1) {
                  trending = false
                }
                if($.inArray("Featured",thea) == -1) {
                  featured = false
                }
                return {
                  featured: featured,
                  trending: trending
                }
              }

            });


            createTrending();


          }
      }
  });

*/

/*


function createTrending() {
  if(!app.items.length || !app.featuredItems.length) {

    return false;
  }
//  createFeatured();
  var sections = [
    "Health",
    "Wealth",
    "Career"
  ];
  var isItems = false;
  $(sections).each(function(i,e){
    var cards= '',
        section = e;
    $(app.items).each(function(i,e){
      if(e.solutions[0] == section ) {
        var id = e.id;
        $(app.featuredItems).each(function(ea,item){
          if(item.id == id && item.trending) {
            cards = cards + cardMaker(e);
            isItems = true;
          }
        });

      }
    });
    var fullHouse = '';
    if(cards.length > 3) {
      fullHouse = 'fullHouse'
    }
    if(cards.length == 0) {
      return;
    }
    $('#trending-solutions .card-list.loading').remove();
    $('#trending-solutions').append(
      '<div class="trending-block">'
        +'<div class="top-header">'
          +'<h2>In '+section+' <a class="internal-reload '+fullHouse+'" href="#solutions%3D'+section+'">all '+section+' solutions</a> </h2>'
        +'</div>'
        +'<div class="card-list">'
          +cards
        +'</div>'
      +'</div>'
    );

  });
  $('.trending-block .internal-reload').click(function(){

    getQueries($(this).attr('href'), true);
    return false;
  });
  if(!isItems) {
    $('#trending-solutions').remove();
  }


}
*/
