const app = () => {
  const doc = document;
  const song = doc.querySelector('.song');
  const play = doc.querySelector('.play');
  const outline = doc.querySelector('.moving-outline circle');
  const video = doc.querySelector('.vid-container video');

  //sounds
  const sounds = doc.querySelectorAll('.sound-picker button');
  //time display
  const timeDisplay = doc.querySelector('.time-display');
  const timeSelect = doc.querySelectorAll('.time-select button');
  //Get the Length of the outline
  const outlineLength = outline.getTotalLength();
  //Duration
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

    //Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });
    

  //play sound
  play.addEventListener('click', () => {
    checkPlaying(song);
  });

  //select sound
  timeSelect.forEach((option) => {
    option.addEventListener('click', function () {
      fakeDuration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
    });
  });

  //Create a function to stop and play the sound
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  };

  //We can animated the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    //Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //Animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;
    //Check if song is finished
    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = './svg/play.svg';
      video.pause();
    }
  };
};

app();
