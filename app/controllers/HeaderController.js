import headerService from "../services/HeaderService";

class HeaderController {
  constructor() {
    this.photo = document.querySelector('#photo');
    this.main();
  }

  main() {
    const nextButton = document.querySelector('.tab-contents__header .section-content__footer__next');
    const removePhoto = document.querySelector('#remove-photo');

    headerService.load();

    nextButton.addEventListener('click', this.nextButtonListener);
    this.photo.addEventListener('change', this.addPhotoListener);
    removePhoto.addEventListener('click', this.removePhotoListener.bind(this));
  }

  addPhotoListener(event) {
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
    
    headerService.save();
  }

  removePhotoListener() {
    const parentPhoto = this.photo.parentElement;

    parentPhoto.style.setProperty('--photo-url', 'none');
    parentPhoto.style.setProperty('--content-text', '"Drop your photo here or click to upload"');
    parentPhoto.style.setProperty('--photo-top', 'initial');
    parentPhoto.style.setProperty('--photo-size', 'initial');
    parentPhoto.style.setProperty('--input-height', 'initial');

    document.getElementById('remove-photo').style.display = 'none';

    const fileInput = parentPhoto.querySelector('input[type="file"]');
    fileInput.value = '';
    headerService.save();
  }

  nextButtonListener() {
    const currentTab = document.querySelector('#header');
    const nextTab = currentTab.nextElementSibling.nextElementSibling;
    
    currentTab.checked = false;
    nextTab.checked = true;
    headerService.save();
  }
}

export default new HeaderController();
