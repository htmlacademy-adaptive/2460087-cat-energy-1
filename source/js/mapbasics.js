document.querySelector('.contacts__map').classList.remove('no-js');

ymaps.ready(function () {
  const sizePlacemark = [
    [57, 53],
    [113, 106]
  ];
  const myMapZoom = [13, 14, 15];

  // Определяем начальный центр карты в зависимости от ширины окна
  let initialCenter = [59.938813148454855, 30.32306884632085];
  if (window.innerWidth >= 1100) {
    initialCenter = [59.938238089377904, 30.30602072589953];
  }

  var myMap = new ymaps.Map('map', {
    center: initialCenter,
    zoom: window.innerWidth <= 500 ? myMapZoom[0] : myMapZoom[1]
  });

  // Создаем метку на фиксированных координатах
  myPlacemark = new ymaps.Placemark([59.938813148454855, 30.32306884632085], {
    hintContent: 'ул. Большая Конюшенная, д. 19/8',
    balloonContent: '<b>ул. Большая Конюшенная, д. 19/8,</b><br/>' + ' Санкт-Петербург'
  }, {
    // Опции.
    // Необходимо указать данный тип макета.
    iconLayout: 'default#image',
    // Своё изображение иконки метки.
    iconImageHref: '../img/icon/map-pin.svg',
    // Размеры метки.
    iconImageSize: window.innerWidth <= 500 ? sizePlacemark[0] : sizePlacemark[1],
    // Смещение левого верхнего угла иконки относительно
    // её "ножки" (точки привязки).
  });

  myMap.geoObjects.add(myPlacemark);

  let check = true;
  myMap.events.add('boundschange', function () {
    if (window.innerWidth <= 500 && check) {
      myPlacemark.options.set('iconImageSize', sizePlacemark[0]);
      myMap.setZoom(myMapZoom[0], { duration: 300 });
      check = false;
    } else if (window.innerWidth > 500 && !check) {
      myPlacemark.options.set('iconImageSize', sizePlacemark[1]);
      myMap.setZoom(myMapZoom[1], { duration: 300 });
      check = true;
    } else if (window.innerWidth > 1200) {
      myMap.setZoom(myMapZoom[2], { duration: 300 });
    }

    // Меняем центр карты, если ширина экрана больше или равна 1100 пикселей
    if (window.innerWidth >= 1100) {
      myMap.setCenter([59.938238089377904, 30.30602072589953]);
    } else {
      myMap.setCenter([59.938813148454855, 30.32306884632085]);
    }
  });
});
