
import vimeoPlayer from '@vimeo/player' // додаємо посилання на встановлену бібліотеку
import throttle from "lodash.throttle"  // додаємо посилання на встановлену бібліотеку

const iframe = document.querySelector('iframe');
const player = new vimeoPlayer(iframe);
const STORAGE_KEY = 'videoplayer-current-time'; // замінюємо зрозумілою константою назву ключа в local storage (необов'язково)

player.on('timeupdate', throttle(onTimeUpdate, 1000)); // застосовуємо метод on(), оновлюэмо час timeupdate, додаємо throttle

function onTimeUpdate(evt) {
   localStorage.setItem(STORAGE_KEY, evt.seconds); // метод для запису ключа/значення в local storage
}

player
.setCurrentTime(localStorage.getItem(STORAGE_KEY)) // поновлюємо відтворення зі збереженої позиції, метод setCurrentTime() 
.catch(function (error) {
    console.error(error)  
});