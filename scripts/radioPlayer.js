import { toggle } from './toggle.js';

export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio'),
    radioCoverImg = document.querySelector('.radio-cover__img'),
    radioHeaderBig = document.querySelector('.radio-header__big'),
    radioNavigation = document.querySelector('.radio-navigation'),
    radioItem = document.querySelectorAll('.radio-item'),
    radioPlayer = document.querySelector('.radio-player'),
    radioVolume = document.querySelector('.radio-volume'),
    radioPlayerBtn = document.querySelector('.player-radio'),
    radioStop = document.querySelector('.radio-stop');

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }

    radioPlayerInit.stop = () => {
            audio.pause();
            changeIconPlay();

        
    }
  // пауза при нажатии на space
    document.addEventListener('keydown', (event) => {
        if(radioPlayerBtn.classList.contains('active')) {
            if(event.code === 'Space') {
                const isPaused = audio.paused;
                audio.pause();
                changeIconPlay()
            if(isPaused && event.code === 'Space') {
                audio.play();
                changeIconPlay();
            }
        }
        }
        });

    radioNavigation.addEventListener('change',  event => {
        radioStop.disabled = false;
        const target = event.target;
        const parrent = target.closest('.radio-item');
        selectItem(parrent);

        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;
        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        audio.src = target.dataset.radioStantion;

        audio.play();
        changeIconPlay();
    });

    const changeIconPlay = () => {
        if(audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
            radio.classList.add('play');
        }
    }


    radioStop.addEventListener('click', () => {
        if(audio.paused) {
            audio.play();
            
        } else {
            audio.pause();
        }
        changeIconPlay();
    });

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;

    });

    document.addEventListener('click', () => {toggle(event, audio, radioVolume)});

    
}