const userFormElem = document.querySelector('form');
const userInputElem = document.querySelector('input');

const searchForStreets = (streetName) => {
  return fetch(`https://api.winnipegtransit.com/v3/streets.json?api-key=Ift6y-RGolzmG6rkd1op&name=${streetName}&usage=long`)
  .then(resp => {
    return resp.json();
  })
  .catch(err => console.log(err));
}

searchForStreets('kenaston')
.then(resp => {
  console.log(resp)
})

userFormElem.addEventListener('submit', event => {
  event.preventDefault();
})