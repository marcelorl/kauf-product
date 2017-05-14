'use strict';

(function(){
  const baseUrl = 'http://localhost:3000';
  const offerForm = document.querySelector(".offer__form");

  const bustCache = '?' + new Date().getTime();

  const init = () => {
    offerForm.onsubmit = saveOffer;
  };

  const request = (verb, url) =>
    new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open(verb, url);

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

  const saveOffer = (e) => {
    e.preventDefault();

    const formData = new FormData(offerForm);

    for (var value of formData.entries()) {
      console.log(value);
    }
  };

  init();
})();
