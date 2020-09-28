import { addZero } from './supScript.js';
import { toggle } from './toggle.js';

export const musicPlayerInit = () => {
   const audio = document.querySelector('.audio'),
   audioImg = document.querySelector('.audio-img'),
   audioHeader = document.querySelector('.audio-header'),
   audioPlayer = document.querySelector('.audio-player'),
   audioNavigation = document.querySelector('.audio-navigation'),
   audioButtonPlay = document.querySelector('.audio-button__play'),
   audioProgress = document.querySelector('.audio-progress'),
   audioProgressTiming = document.querySelector('.audio-progress__timing'),
   audioTimePassed = document.querySelector('.audio-time__passed'),
   audioVolume = document.querySelector('.audio-volume'),
   audioPlayerBtn = document.querySelector('.player-audio'),
   audioTimeTotal = document.querySelector('.audio-time__total');

   const playlist = ['признаки жизни', 'бесконечный магазин', 'звездный лорд', 'очертя', 'brazil','душегуб','rusty pot', 'дети', 'звездный лорд'];
   
   let trackIndex = 0;

   const loadTrack = () => {
       const isPlayed = audioPlayer.paused;
       const track = playlist[trackIndex];

       audioPlayer.src = `/audio/${track}.mp3`;
       audioImg.src = `/audio/${track}.jpg`;
       audioHeader.textContent = track.toUpperCase();

       if(isPlayed) {
           audioPlayer.pause();
       } else {
        audioPlayer.play();
       }
       

   };
   const prevTrack = () => {
    if(trackIndex !== 0) {
        trackIndex--;
    } else {
        trackIndex = playlist.length - 1;
    }
    loadTrack();
   };

   const nextTrack = () => {
    if(trackIndex === playlist.length - 1) {
        trackIndex = 0;
    } else {
        trackIndex++;
    }
    loadTrack();
   };
   musicPlayerInit.stop = () => {
       if(!audioPlayer.paused) {
           audioPlayer.pause();
           audio.classList.remove('play');
           audioButtonPlay.classList.remove('fa-pause');
           audioButtonPlay.classList.add('fa-play');
       }
   }
   const updateTime = () => {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progress = (currentTime / duration) * 100;

    audioProgressTiming.style.width = progress + '%';

    const minutesPassed = Math.floor(currentTime / 60) || '0';
    const secondsPassed = Math.floor(currentTime % 60) || '0';

    const minutesTotal = Math.floor(duration / 60) || '0';
    const secondsTotal = Math.floor(duration % 60) || '0';

    audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
   }


   document.addEventListener('keydown', (event) => {
    //    event.preventDefault();
    if(audioPlayerBtn.classList.contains('active')) {
        if(event.code === 'Space') {
            const isPaused = audioPlayer.paused;
            audioPlayer.pause();
            
        if(!isPaused && event.code === 'Space') {
            audioPlayer.play();
            
        }
    }
    }
    });

   audioPlayer.addEventListener('canplay', updateTime)

   audioNavigation.addEventListener('click', event => {
       const target = event.target;

       if(target.classList.contains('audio-button__play')) {
           audio.classList.toggle('play');
           audioButtonPlay.classList.toggle('fa-play');
           audioButtonPlay.classList.toggle('fa-pause');

           if(audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
       const track = playlist[trackIndex];
        audioHeader.textContent = track.toUpperCase();
       };
    
       if(target.classList.contains('audio-button__prev')) {
            prevTrack();
       }
       if(target.classList.contains('audio-button__next')) {
            nextTrack();
       }

   });

   audioPlayer.addEventListener('ended', () => {
       nextTrack();
       audioPlayer.play();
   });

audioPlayer.addEventListener('timeupdate', updateTime);


audioProgress.addEventListener('click', (event) => {
    const x = event.offsetX;
    const allWidth = audioProgress.clientWidth;
    const progress = (x / allWidth) * audioPlayer.duration;
    audioPlayer.currentTime = progress;
});
audioVolume.addEventListener('input', () => {
    audioPlayer.volume = audioVolume.value / 100;

});
document.addEventListener('click', () => {toggle(event, audioPlayer, audioVolume)});
};