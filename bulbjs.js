document.addEventListener('DOMContentLoaded', function () {
  const bulbContainer = document.getElementById('bulb-container');
  const bulb = document.getElementById('bulb');
  const tail = document.getElementById('tail');
  let isDragging = false;
  let isDarkMode = false;

  bulbContainer.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;

    const initialY = e.clientY;

    const moveListener = (e) => {
      if (isDragging) {
        const deltaY = e.clientY - initialY;
        tail.style.height = `${80 + deltaY}px`;
      }
    };

    const upListener = () => {
      if (isDragging) {
        isDarkMode = !isDarkMode;
        updateMode();
        playSound(isDarkMode);
        isDragging = false;
      }

      tail.style.height = '80px';
      document.removeEventListener('mousemove', moveListener);
      document.removeEventListener('mouseup', upListener);
    };

    document.addEventListener('mousemove', moveListener);
    document.addEventListener('mouseup', upListener);
  });

  function updateMode() {
    if (isDarkMode) {
      document.body.style.backgroundColor = '#333';
    } else {
      document.body.style.backgroundColor = '#f0f0f0';
    }
  }

  function playSound(isOn) {
    const audio = new Audio();
    audio.src = isOn ? 'on_sound.mp3' : 'off_sound.mp3';
    audio.play();
  }
});
