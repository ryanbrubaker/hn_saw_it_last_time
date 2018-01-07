window.onload=function()
{
   var itemIds = Array.prototype.slice.call(document.querySelectorAll('.athing')).map(function (element) 
   {
      return element.id;
   });

   var key = window.location.pathname.substr(1);
   if (key.length == 0)
   {
      key = 'mainPage';
   }


   var storage = chrome.storage.sync;
   storage.get(key, function(seenIds)
   {
      if (seenIds[key])
      {
         var alreadySeen = itemIds.filter(function(itemId)
         {
            return seenIds[key].indexOf(itemId) != -1;
         });

         alreadySeen.forEach(function(itemId)
         {
            var anElement = document.getElementById(itemId);
            anElement.hidden = true;
           anElement.nextElementSibling.hidden = true;
         });
      }

      storage.set({[key]: itemIds}, function() {});
   });
}
   
