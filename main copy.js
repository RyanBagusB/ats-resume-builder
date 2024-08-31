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
    document.getElementById('remove-photo').style.display = 'block';
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

document.querySelector('#remove-photo').addEventListener('click', () => {
  const parent = document.getElementById('photo').parentElement;

  // Clear the photo from the background and reset styles
  parent.style.setProperty('--photo-url', 'none');
  parent.style.setProperty('--content-text', '"Drop your photo here or click to upload"');
  parent.style.setProperty('--photo-top', 'initial');
  parent.style.setProperty('--photo-size', 'initial');
  parent.style.setProperty('--input-height', 'initial');

  // Hide the remove button
  document.getElementById('remove-photo').style.display = 'none';

  // Reset the file input so the user can upload the same file again
  const fileInput = parent.querySelector('input[type="file"]');
  fileInput.value = '';
})
