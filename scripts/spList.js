function getSPList(list,fields,query,callback) {

  $().SPServices({
      operation: "GetListItems",
      async: true,
      listName: list,
      CAMLRowLimit: '9999',
      CAMLQuery: query,
      CAMLQueryOptions: "<QueryOptions><ViewAttributes Scope='Recursive'/></QueryOptions>",
      CAMLViewFields: "<ViewFields><FieldRef Name='ID' />"+fields+"</ViewFields>",
      completefunc: function(xData, Status) {
          if (Status == "success") {
  
            callback($(xData.responseXML).SPFilterNode("z:row"));

          }
      }
  });
}
