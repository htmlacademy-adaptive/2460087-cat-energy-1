var myMap;

ymaps.ready(init);

function init() {
  myMap = new ymaps.Map('map', {
    center: [59.93, 30.32],
    zoom: 12
  });

}
