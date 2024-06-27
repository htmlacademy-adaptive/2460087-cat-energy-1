var myMap;

ymaps.ready(init);

function init() {
  myMap = new ymaps.Map('map', getMapOptions());

  window.addEventListener('resize', function () {
    var mapOptions = getMapOptions();
    myMap.setCenter(mapOptions.center, mapOptions.zoom);
  });
}

function getMapOptions() {
  if (window.innerWidth <= 1440) {
    return {
      center: [59.938631, 30.323037],
      zoom: 15
    };
  } else {
    return {
      center: [59.938439, 30.319246],
      zoom: 16
    };
  }
}
