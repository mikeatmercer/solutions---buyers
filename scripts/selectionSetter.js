function selectionSetter() {
  var topSet = $('#s4-workspace').scrollTop();
  $('#result-container .card-list .card').remove();
  $('#trending-solutions').hide();
  $("#result-container .selected-list .tabs").empty();
  $('#no-results').hide();
  location.hash = '';
  //Create Empty Filter Set
  $(app.items).each(function(i,e){
    app.items[i].selected = false;
  });
  var filterSet = {
    solutions: [],
    buyers: [],
    needs: []
  }
  $('#main-filter li.filter-link').each(function(i,e){
    if($(this).hasClass('selected') == false) {
      return;
    }
    var type = $(this).attr('data-type'),
        value = $(this).attr('data-value');
    filterSet[type].push(value);

  });


  //Check if there are no filters selected
  var empty = true
  $.each(filterSet, function(i,e){
    if(e.length) {
      empty = false;
    }
  });
  if(empty) {
    // INVOKE NO SELECTION STATE
    $("#result-container").hide();

    $('#trending-solutions').fadeIn();
    $('#s4-workspace').scrollTop(topSet);

    return false;
  }
  var selectedItems = [];
  var removeIDs = [];
  var currentFilter = 0;

  //LOOP THROUGH SOLUTIONS, BUYERS, NEEDS, filters

  //CREATE INTERACE AND HASHVALUE


  var filterHash = '';
  var filterCount = 0;
  $.each( filterSet, function(type,filterArray) {
    var filterType = type;

    //IF nothing in filter set array, do nothing
    if(!filterArray.length) {
      return;
    }
    filterCount++
    var andText = '';
    var andHash = '';
    if(currentFilter > 0) {
      andHash = '&&';
    }

    var tabs = '';
    var hashQuery = '';

    $(filterArray).each(function(i,e){
      var orText = '';
      var orHash = '';
      if(i > 0) {
        orText = '<span class="orText">or </span>';
        orHash = '||'
      }
      tabs = tabs+orText+'<button type="button" data-value="'+e+'" data-type="'+filterType+'"class="tab">'+e+'</button>';
      hashQuery = hashQuery+orHash+e;
    });

    currentFilter ++;

    $("#result-container .selected-list .tabs").append(
      '<span class="filterBlock">'
        +'<span class="solution-label">'+filterType+': </span>'
        +andText
        +tabs
      +'</span>'

    );

    filterHash = filterHash+andHash+filterType+'='+hashQuery;


  });

  location.hash = encodeURIComponent(filterHash)

  $('#result-container .selected-list button.tab').click(function(e){
    e.preventDefault();
    var value = $(this).attr('data-value');
    var type = $(this).attr('data-type');
    $('#main-filter > li > ul > li').each(function(i,e){
      if($(this).attr('data-value') == value && $(this).attr('data-type') == type) {
        $(this).click();
        return false;
      }
    });
  })

  $.each( filterSet, function(type,filterArray) {
    var filterType = type;

    //IF nothing in filter set array, do nothing
    if(!filterArray.length) {
      return;
    }

    //ADD TO ARRAY IF THERE ARE NO ITEMS
    if(selectedItems.length == 0) {
      $(app.items).each(function(itemIndex,itemObject){
        var wasSelected = false;
        //LOOP THROUGH EACH OPTION IN THE FILTER SET AND ADD IF A MATCH
        $(filterArray).each(function(filterIndex,filterName){
          if (!wasSelected) {
            if($.inArray(filterName, itemObject[type]) !== -1) {
              selectedItems.push(itemObject);
              wasSelected = true;
            }
          }
        });
      });

    } else {
      //PARE DOWN SELECTED ITEMS
      $(selectedItems).each(function(itemIndex, itemObject){
        var willStay = false;
        $(filterArray).each(function(filterIndex, filterName){
          //LOOP THROUGH each option and mark to stay if matched
          if($.inArray(filterName, itemObject[type]) !== -1) {
            willStay = true;

          } else {

          }
        });
        //IF not matched, remove
        if(!willStay) {
          removeIDs.push(itemObject.id);
        }

      });
    }





  });

  $('#result-container').show();
  $('#result-container .card-list').show();
  if(app.stats.length) {
    sortAlpha(selectedItems, 'num', true);
  } else {
    sortAlpha(selectedItems, 'title');
  }

  selectedItems = regionFiltering(selectedItems);

  //console.log(selectedItems.length);

  var placed = 0;
  $(selectedItems).each(function(i,e){

    if(removeIDs.length > 0 && $.inArray(e.id, removeIDs ) != -1) {
      return;
    }
    $('#result-container .card-list').append(cardMaker(e, true));

    placed++;

  });
  if(selectedItems.length < 4 && filterCount < 3) {
    $('#result-container .card-list').append(cardMaker({
      id: 1,
      solutions: 'Missing',
      title:'',
      icon:'',
      desc:'',
      url: 'http://content.mercer.com/Lists/ClientIssuesFeedback/fd_Item_New.aspx'
    }, true));
  }
  if(placed > 0) {
    $('#result-container .card-list .card').each(function(i,e){
      var card = $(this);
      setTimeout(function(){
        $(card).css('opacity',0).animate({opacity:1});
      },i*50)
    });
  } else {
    $('#result-container .card-list').hide();
    $("#no-results").fadeIn();
  }
  $('#s4-workspace').scrollTop(topSet);





}
