var DB = (function() {
  var private = {
    instance: null,
    getInstance: function() {
      return new Promise(function(resolve, reject) {
        if (!private.instance) {
          private.instance = indexedDB.open('html-const', 1)

          private.instance.onsuccess = function(e) {
            private.instance = private.instance.result
            resolve(private.instance)
          }

          private.instance.onerror = function(e) {
            reject(e);
          }
        }
        else {
          resolve(private.instance)
        }
      });
    }
  }

  return private.getInstance()
})();

var siteCollection = (function() {
  var private = {
    show: function(siteId) {
      DB.then(function(data) {
        const transaction = data.transaction(["sites"], "readwrite")
        var objectStore = transaction.objectStore("sites");
        var objectStoreRequest = objectStore.get(parseInt(siteId))

        objectStoreRequest.onsuccess = function(event) {
          var currentSite = objectStoreRequest.result
          renderer.renderSite(currentSite)
        };
      })
    }
  }
  return private
})();

var renderer = (function() {
  var private = {
    renderSite: function(site) {
      if(site) {
        window.document.title = site.title
        document.body.innerHTML = site.body
      }else {
        window.document.title = 'Ошибка'
        document.body.innerHTML = '<h1>Сайт не найден</h1>'
      }
    }
  }
  return private
})();

(function () {
  const urlParams = new URLSearchParams(window.location.search)
  const siteId = urlParams.get('id')

  siteCollection.show(siteId)
}());
