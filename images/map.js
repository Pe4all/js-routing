document.addEventListener("DOMContentLoaded", function () {
    ymaps.ready(init);
  });
  console.log("first");

  function init() {
    // Создаем карту
    var myMap = new ymaps.Map("map", {
      center: [55.76, 37.64], // Устанавливаем начальные координаты
      zoom: 10, // Устанавливаем начальный масштаб
    });

    console.log("second");

    // Создаем маркер в месте проживания
    var myPlacemark = new ymaps.Placemark([55.76, 37.64], {
      // Координаты маркера
      hintContent: "Москва", // Текст подсказки
      balloonContent: "Столица России", // Содержание балуна
    });

    // Добавляем маркер на карту
    myMap.geoObjects.add(myPlacemark);

    // Убираем прелоадер после загрузки карты
    document.getElementById("loader").style.display = "none";
  }