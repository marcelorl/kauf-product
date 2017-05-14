'use strict';

(function(){
  const baseUrl = 'http://localhost:3000';
  const imagePlaceholder = './images/placeholder.png';

  const bustCache = '?' + new Date().getTime();

  const request = (verb, url) =>
    new Promise(function(resolve, reject) {
      let req = new XMLHttpRequest();
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

  const deleteOffer = (id) => {
    request('DELETE', `${baseUrl}/offers/${id}?${bustCache}`)
      .then(res => {
        alert(res);
        window.location.replace('http://localhost:3000');
      });
  };


  const listOffers = () =>
    request('GET', `${baseUrl}/offers?${bustCache}`)
      .then(res => {
        let list = '<tbody>';
        const result = JSON.parse(res);

        for(let i = 0, size = result.length; i < size; i++) {
          const { name, originalPrice, reducedPrice, productImagePointer } = result[i].properties;

          const image = productImagePointer.itemName || imagePlaceholder;

          list +=
            `<tr>
              <td><img class="offer__list__image" src="${image}"></td>
              <td><a href="${baseUrl}/offer.html?id=${result[i].id}">${name || ''}</a></td>
              <td>${originalPrice.currencyCode.toUpperCase() || ''} ${originalPrice.amount || ''}</td>
              <td>${reducedPrice.currencyCode.toUpperCase() || ''} ${reducedPrice.amount || ''}</td>
              <td><button class="delete-button" data-id="${result[i].id}">Delete</button></td>
            </tr>`;
        }

        list += '</tbody>';

        document.getElementById('kauf-offers__list').insertAdjacentHTML('beforeend', list);

        const deleteButtons = document.querySelectorAll('.delete-button');

        for(let i = 0, size = deleteButtons.length; i < size; i++) {
          deleteButtons[i].addEventListener('click', () => {
            const id = deleteButtons[i].getAttribute('data-id');

            deleteOffer(id);
          });
        }
      });

  listOffers();

})();
