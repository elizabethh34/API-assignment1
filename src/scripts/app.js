const userFormElem = document.querySelector('form');
const userInputElem = document.querySelector('input');
const streetListElem = document.querySelector('.streets');

const searchForStreets = (streetName) => {
  return fetch(`https://api.winnipegtransit.com/v3/streets.json?api-key=Ift6y-RGolzmG6rkd1op&name=${streetName}&usage=long`)
  .then(resp => {
    return resp.json();
  })
  .catch(err => console.log(err));
}

const searchForStops = (streetKey) => {
  return fetch(`https://api.winnipegtransit.com/v3/stops.json?api-key=Ift6y-RGolzmG6rkd1op&street=${streetKey}`)
  .then(resp => {
    return resp.json();
  })
  .catch(err => console.log(err));
}

const createStreetList = (street) => {
  streetListElem.insertAdjacentHTML('beforeend', `<a href="#" data-street-key="${street.key}">${street.name}</a>`);
}

const createNoStreetMessage = () => {
  streetListElem.insertAdjacentHTML('beforeend', '<div class="no-streets">No Streets Found</div>');
}

const clearStreetList = () => {
  streetListElem.innerHTML = '';
}
  
userFormElem.addEventListener('submit', event => {
  event.preventDefault();

  searchForStreets(userInputElem.value)
  .then(resp => {
    clearStreetList();
    if (resp.streets.length === 0) {
      createNoStreetMessage();
    } else {
      resp.streets.forEach(street => {
        createStreetList(street);
      })
    }
  })
  .catch(err => console.log(err));   
});

streetListElem.addEventListener('click', event => {
  if (event.target.nodeName === 'A') {
    const clickedStreet = event.target;
    searchForStops(clickedStreet.dataset.streetKey)
    .then(resp => {
      console.log(resp)
    })
    .catch(err => console.log(err));
  }
});