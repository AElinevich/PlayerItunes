import { addZero } from './supScript.js';
import { toggle } from './toggle.js';

export const videoPlayerInit = () => {

const videoPlayer = document.querySelector('.video-player'),
      videoButtonPlay = document.querySelector('.video-button__play'),
      videoButtonStop = document.querySelector('.video-button__stop'),
      videoProgress = document.querySelector('.video-progress'),
      videoTimePassed = document.querySelector('.video-time__passed'),
      videoTimeTotal = document.querySelector('.video-time__total'),
      videoVolume = document.querySelector('.video-volume'),
      videoPlayerBtn = document.querySelector('.player-video'),
      videoFullscreen = document.querySelector('.video-fullscreen');
   
const toggleIcon = () => {
    if(videoPlayer.paused) {
        videoButtonPlay.classList.remove('fa-pause');
        videoButtonPlay.classList.add('fa-play');
    } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
}
}
const togglePlay = () => {
    if(videoPlayer.paused) {
        videoPlayer.play();
       } else {
        videoPlayer.pause();
       }

       toggleIcon();
}

const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
};

videoPlayerInit.stop = () => {
    if(!videoPlayer.paused) {
        stopPlay();
    }
}

// пауза при нажатии на space
document.addEventListener('keydown', (event) => {
if(videoPlayerBtn.classList.contains('active')) {
    if(event.code === 'Space') {
        const isPaused = videoPlayer.paused;
        videoPlayer.pause();
        toggleIcon()
    if(isPaused && event.code === 'Space') {
        videoPlayer.play();
        toggleIcon();
    }
}
}
});

videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
});

   videoPlayer.addEventListener('click', togglePlay);

   videoButtonPlay.addEventListener('click', togglePlay);

   videoButtonStop.addEventListener('click', stopPlay);

videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;


   });
videoProgress.addEventListener('change', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;
   });

videoVolume.addEventListener('input', () => {
    videoPlayer.volume = videoVolume.value / 100;
   });


document.addEventListener('click', () => {toggle(event, videoPlayer, videoVolume)});

};