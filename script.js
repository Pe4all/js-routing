import { initMap } from './pages/Map/map.js';
import { initTimer } from './pages/Timer/timer.js';
import { active } from './scrtpts/active.js';
import { routes } from './routes.js';

// Инициализация времени начала посещения
if (!localStorage.getItem('startTime')) {
  localStorage.setItem('startTime', Date.now());
}

const initialPath = window.location.pathname;

// Функция маршрутизации
const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

// Обработка местоположения
const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("main-page").innerHTML = html;
  active(path);

  // Инициализация карты
  if (path === '/map') {
    ymaps.ready(initMap());
  }

  // Инициализация таймера
  if (path === '/timer') {
    initTimer()
  }
};

// Активация ссылок в навигации
active(initialPath);

// Обработчик изменения состояния инициализации маршрута
window.onpopstate = handleLocation;
window.route = route;

handleLocation();
