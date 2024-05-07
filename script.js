// Инициализация времени начала посещения
if (!localStorage.getItem('startTime')) {
  localStorage.setItem('startTime', Date.now());
}

// Функция маршрутизации
const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

// Маршруты
const routes = {
  404: "/pages/404.html",
  "/index.html": "/pages/Activity/activity.html",
  "/": "/pages/Activity/activity.html",
  "/map": "/pages/Map/map.html",
  "/timer": "/pages/Timer/timer.html"
};

// Обработка местоположения
const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("main-page").innerHTML = html;
  active(path);

  if (path === '/map') {
    // Добавляем див с id "map"
    const mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapDiv.style.height = '568px';
    mapDiv.style.width = '100%';
    document.getElementById("map-wrapper").appendChild(mapDiv);

    // Имитация загрузки
    setTimeout(() => {
      ymaps.ready(initMap);
    }, "1000")
  }

  if (path === '/timer') {
    // Проверяем, поддерживает ли браузер localStorage
    if (typeof (Storage) !== "undefined") {

      const timerDiv = document.createElement('div');
      timerDiv.id = 'timer';
      timerDiv.style.width = '100%';
      document.getElementById("timer-wrapper").appendChild(timerDiv);

      // Функция для вычисления прошедшего времени и его отображения
      function showElapsedTime() {
        const startTime = localStorage.getItem('startTime');
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;

        // Преобразуем время в формат "часы:минуты:секунды"
        const hours = Math.floor(elapsedTime / 3600000);
        const minutes = Math.floor((elapsedTime % 3600000) / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);

        // Отображаем время на странице
        const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timerDiv.innerHTML = time;
      }

      // Показываем прошедшее время при загрузке страницы
      showElapsedTime();

      // Обновляем время каждые 1 секунду
      setInterval(showElapsedTime, 1000);

      // Обработчик события закрытия вкладки
      window.addEventListener('beforeunload', function () {
        localStorage.removeItem('startTime');
      });
    } else {
      console.log("Извините, ваш браузер не поддерживает localStorage.");
    }
  }
};

// Инициализация карты
function initMap() {
  // Создаем карту
  var myMap = new ymaps.Map("map", {
    center: [55.76, 37.64], // Устанавливаем начальные координаты
    zoom: 10, // Устанавливаем начальный масштаб
  });

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

// Активация ссылок в навигации
function active(path) {
  const navItems = document.querySelectorAll(".nav-link");
  navItems.forEach(item => item.classList.remove("active"));

  const currentLink = document.querySelector(`.nav-link[href="${path}"]`);
  if (currentLink) {
    const currentItem = currentLink.closest(".nav-link");
    currentItem.classList.add("active");
  }
}

// Обработчик изменения состояния инициализации маршрута
window.onpopstate = handleLocation;
window.route = route;

handleLocation();
