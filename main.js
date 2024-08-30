import '@fortawesome/fontawesome-free/js/all.min.js';
import './style.css';

document.getElementById('photo').addEventListener('change', function(event) {
  const input = event.target;
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const parent = input.parentElement;
    const gap = 8;
    const padding = 16;
    const labelHeight = parent.querySelector('label').offsetHeight;
    const photoSize = 150;

    parent.style.setProperty('--photo-url', `url(${e.target.result})`);
    parent.style.setProperty('--photo-top', `${labelHeight + gap + padding}px`);
    parent.style.setProperty('--photo-size', `${photoSize}px`);
    parent.style.setProperty('--input-height', `${photoSize + padding * 2}px`);
    parent.style.setProperty('--content-text', '""');
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});
