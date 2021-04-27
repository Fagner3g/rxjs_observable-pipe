const { Observable, Observer } = require("rxjs");
const { map } = require("rxjs/operators");
const axios = require("axios");

const notas = [6.1, 6.5, 7, 9, 10];

function httpGet(url) {
  return new Observable((subscriber) => {
    axios
      .get(url)
      .then((resp) => {
        if (Array.isArray(resp.data)) {
          resp.data.forEach((element) => {
            subscriber.next(element);
          });
        } else {
          subscriber.next(resp.data);
        }
      })
      .then(() => subscriber.complete());
  });
}

httpGet("http://localhost:3001/films")
  .pipe(
    map((film) => film.Actors),
    map((actorsString) => actorsString.split(/\s*,\s*/g))
  )
  .subscribe((dado) => console.log(dado));
