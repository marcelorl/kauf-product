'use strict';

(function(){
  const baseUrl = 'http://localhost:3000';
  const offerForm = document.querySelector(".offer__form");

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const bustCache = '?' + new Date().getTime();

  const init = () => {
    if(id) {
      offerForm.onsubmit = editOffer;
      findOffer(id);
    } else {
      offerForm.onsubmit = saveOffer;
    }
  };

  const request = (verb, url, data) =>
    new Promise(function(resolve, reject) {
      let req = new XMLHttpRequest();
      req.open(verb, url);
      if(verb === 'POST' || verb === 'PUT') {
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      }

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

      req.send(data);
    });

  const saveOffer = (e) => {
    e.preventDefault();

    const formData = new FormData(offerForm);
    let formValues = '';

    for (let value of formData.entries()) {
      formValues += `${value[0]}=${value[1]}&`;
    }

    request('POST', `${baseUrl}/offers`, formValues);
  };

  const findOffer = id => {
    request('GET', `${baseUrl}/offers/${id}?${bustCache}`)
      .then(res => {
        const result = JSON.parse(res)[0];

        for (var key in result) {
          const element = offerForm.querySelector(`#${key}`);
          if (element) {
            element.value = result[key];
          }
        }

        offerForm.querySelector('#priceCode').value = result.originalPrice.currencyCode;
        offerForm.querySelector('#priceAmount').value = result.originalPrice.amount;
        offerForm.querySelector('#discountCode').value = result.reducedPrice.currencyCode;
        offerForm.querySelector('#discountAmount').value = result.reducedPrice.amount;
      });
  };

  const editOffer = (e) => {
    e.preventDefault();

    const formData = new FormData(offerForm);
    let formValues = '';

    for (let [key, value] of formData.entries()) {
      formValues += `${key}=${value}&`;
    }

    request('PUT', `${baseUrl}/offers/${id}`, formValues);
  };

  init();
})();
