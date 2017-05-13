'use strict';

(function(){
  const baseUrl = 'http://localhost:3000/offers';
  const bustCache = '?' + new Date().getTime();

  function get(url) {
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url);

      req.onload = function() {
        if (req.status == 200) {
          resolve(req.response);
        }
        else {
          reject(Error(req.statusText));
        }
      };

      req.onerror = function() {
        reject(Error("Network Error"));
      };

      req.send();
    });
  }

  function listOffers () {
    get(`${baseUrl}?${bustCache}`)
      .then(res => {
        let list = '';
        const result = JSON.parse(res);

        for(let i = 0, size = result.length; i < size; i++) {
          list += '<tr>';
            list += `<td>${result[i].name}</td>`;
            list += `<td>${result[i].description}</td>`;
          list += '</tr>';
        }

        document.getElementById('kauf-offers__list').innerHTML = list;
      });

  }

  listOffers();

})();
