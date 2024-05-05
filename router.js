const route = (event) => {
    event = event || window.event;
    event.preventDefault(); 
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404: "/pages/404.html",
    "/index.html": "/pages/Activity/activity.html",
    "/": "/pages/Activity/activity.html",
    "/map": "/pages/Map/map.html",
    "/timer": "/pages/timer.html"
};

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
};

function initMap() {
  // Создаем карту
  var myMap = new ymaps.Map("map", {
    center: [55.76, 37.64], // Устанавливаем начальные координаты
    zoom: 10, // Устанавливаем начальный масштаб
  });

  console.log("second");
  console.log(myMap);

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

function active(path) {
    const navItems = document.querySelectorAll(".nav-link");
    navItems.forEach(item => item.classList.remove("active"));
  
    const currentLink = document.querySelector(`.nav-link[href="${path}"]`);
    if (currentLink) {
      const currentItem = currentLink.closest(".nav-link");
      currentItem.classList.add("active");
    }
  }

window.onpopstate = handleLocation;
window.route = route

handleLocation();