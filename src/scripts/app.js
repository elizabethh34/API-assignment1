const userFormElem = document.querySelector('form');
const userInputElem = document.querySelector('input');
const streetListElem = document.querySelector('.streets');
const streetNameElem = document.querySelector('#street-name');
const scheduleTableElem = document.querySelector('tbody');

const searchForStreets = (streetName) => {
  return fetch(`https://api.winnipegtransit.com/v3/streets.json?api-key=Ift6y-RGolzmG6rkd1op&name=${streetName}&usage=long`)
  .then(resp => {
    return resp.json();
  })
  .catch(err => console.log(err));
}

const searchForStops = (streetKey) => {
  return fetch(`https://api.winnipegtransit.com/v3/stops.json?api-key=Ift6y-RGolzmG6rkd1op&usage=long&street=${streetKey}`)
  .then(resp => {
    return resp.json();
  })
  .catch(err => console.log(err));
}

const searchForSchedules = (stopNumber) => {
  return fetch(`https://api.winnipegtransit.com/v3/stops/${stopNumber}/schedule.json?api-key=Ift6y-RGolzmG6rkd1op&usage=long&max-results-per-route=2`)
  .then(resp => {
    return resp.json();
  })
  .catch(err => console.log(err));
}

const createStreetListElement = (street) => {
  streetListElem.insertAdjacentHTML('beforeend', `<a href="#" data-street-key="${street.key}">${street.name}</a>`);
}

const createNoStreetMessage = () => {
  streetListElem.insertAdjacentHTML('beforeend', '<div class="no-streets">No Streets Found</div>');
}

const clearStreetList = () => {
  streetListElem.innerHTML = '';
}

const formatTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  let hour = date.getHours();
  const minutes = date.getMinutes();
  let addOn;
  let zero;
  
  if (minutes <= 9) {
    zero = 0;
  } else if (minutes > 9) {
    zero = '';
  }

  if (hour >= 12) {
    addOn = 'PM';
  } else if (hour < 12) {
    addOn = 'AM';
  }

  if (hour > 12) {
    hour = hour - 12;
  }
  return `${hour}:${zero}${minutes} ${addOn}`
}

const getAllSchedules = (stopData) => {
  const stopScheduleArray = [];
  for (const stop of stopData.stops) {
    stopScheduleArray.push(searchForSchedules(stop.number)); 
  }
  return Promise.all(stopScheduleArray);
}

const getWholeStreetList = (streetData) => {
  clearStreetList();
  if (streetData.streets.length === 0) {
    createNoStreetMessage();
  } else {
    streetData.streets.forEach(street => {
      createStreetListElement(street);
    });
  }
}

const renderBusList = (busOjectArray) => {
  busOjectArray.forEach(busSchedule => {
    busSchedule['stop-schedule']['route-schedules'].forEach(routeSchedule => {
      routeSchedule['scheduled-stops'].forEach(stop => {
        scheduleTableElem.insertAdjacentHTML('beforeend', 
        `<tr>
          <td>${busSchedule['stop-schedule'].stop.street.name}</td>
          <td>${busSchedule['stop-schedule'].stop['cross-street'].name}</td>
          <td>${busSchedule['stop-schedule'].stop.direction}</td>
          <td>${routeSchedule.route.number}</td>
          <td>${formatTime(stop.times.departure.scheduled)}</td>
        </tr>`);
      });
    });
  });
}

const clearBusTimes = () => {
  scheduleTableElem.innerHTML = '';
} 

userFormElem.addEventListener('submit', event => {
  event.preventDefault();
  if (userInputElem.value !== '') {
    searchForStreets(userInputElem.value)
    .then(resp => getWholeStreetList(resp))
    .catch(err => console.log(err));   
  } 
});

streetListElem.addEventListener('click', event => {
  if (event.target.nodeName === 'A') {
    const clickedStreet = event.target;
    streetNameElem.textContent = `Displaying results for ${clickedStreet.textContent}`;
    searchForStops(clickedStreet.dataset.streetKey)
    .then(resp => getAllSchedules(resp))
    .then(data => {
      clearBusTimes();
      renderBusList(data);
    })
    .catch(err => console.log(err));
  }
});