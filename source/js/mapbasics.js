document.querySelector('.contacts__map').classList.remove('no-js');

ymaps.ready(function () {
  const sizePlacemark = [
    [57, 53],
    [113, 106]
  ];
  const offsetPlacemark = [
    [-28.5, -53], // Смещение для маленькой иконки
    [-56.5, -106] // Смещение для большой иконки
  ];
  const myMapZoom = [13, 14, 15];

  var myMap = new ymaps.Map('map', {
    center: [59.938051, 30.323037],
    zoom: window.innerWidth <= 600 ? myMapZoom[0] : myMapZoom[1]
  });

  var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
    hintContent: 'ул. Большая Конюшенная, д. 19/8',
    balloonContent: '<b>ул. Большая Конюшенная, д. 19/8,</b><br/>' + ' Санкт-Петербург'
  }, {
    iconLayout: 'default#image',
    iconImageHref: '../img/icon/map-pin.svg',
    iconImageSize: window.innerWidth <= 500 ? sizePlacemark[0] : sizePlacemark[1],
    iconImageOffset: window.innerWidth <= 500 ? offsetPlacemark[0] : offsetPlacemark[1]
  });

  myMap.geoObjects.add(myPlacemark);

  let check = true;
  myMap.events.add('boundschange', function () {
    if (window.innerWidth <= 600 && check) {
      myPlacemark.options.set('iconImageSize', sizePlacemark[0]);
      myPlacemark.options.set('iconImageOffset', offsetPlacemark[0]);
      myMap.setZoom(myMapZoom[0], { duration: 300 });
      check = false;
    } else if (window.innerWidth > 600 && !check) {
      myPlacemark.options.set('iconImageSize', sizePlacemark[1]);
      myPlacemark.options.set('iconImageOffset', offsetPlacemark[1]);
      myMap.setZoom(myMapZoom[1], { duration: 300 });
      check = true;
    } else if (window.innerWidth > 1100) {
      myMap.setZoom(myMapZoom[2], { duration: 300 });
    }
  });
});
