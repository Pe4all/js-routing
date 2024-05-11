export function initTimer() {
    // Проверяем, поддерживает ли браузер localStorage
    if (typeof (Storage) !== "undefined") {
        const timerDiv = document.createElement('div');
        timerDiv.id = 'timer';
        timerDiv.style.width = '100%';
        document.getElementById("timer-wrapper").appendChild(timerDiv);
        timerDiv.innerHTML = 'Загрузка';

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
        timerDiv.innerHTML = 'Извините, ваш браузер не поддерживает localStorage.';
    }
}
