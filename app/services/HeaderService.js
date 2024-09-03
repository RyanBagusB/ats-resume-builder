import { resumeService } from "./resumeService";

class HeaderService {
  constructor() {
    this.headerElements = this.#getHeaderElements();
    this.resume = resumeService.getCV();
  }

  #getHeaderElements() {
    const section = document.querySelector('.tab-contents__header .section-content__body');

    return {
      name: section.querySelector('#name'),
      phoneNumber: section.querySelector('#phoneNumber'),
      email: section.querySelector('#email'),
      linkedin: section.querySelector('#linkedin'),
      portofolio: section.querySelector('#portofolio'),
      address: section.querySelector('#address'),
      description: section.querySelector('#description'),
      photo: section.querySelector('#photo'),
    };
  }

  savePhoto(photo) {
    const file = photo.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const photoUrl = e.target.result;
      this.resume.header.photo = photoUrl;
      resumeService.saveCV(this.resume);
    };
    reader.readAsDataURL(file);
  }

  save() {
    const { name, phoneNumber, email, linkedin, portofolio, address, description, photo } = this.headerElements;

    this.resume.header = {
      name: name.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      linkedin: linkedin.value,
      portofolio: portofolio.value,
      address: address.value,
      description: description.value,
    };

    if (photo.files.length > 0) {
      this.savePhoto(photo);
    }

    resumeService.saveCV(this.resume);
  }

  loadPhoto(photoElement) {
    const parent = photoElement.parentElement;
    const gap = 8;
    const padding = 16;
    const labelHeight = 21;
    const photoSize = 150;
  
    parent.style.setProperty('--photo-url', `url(${this.resume.header.photo})`);
    parent.style.setProperty('--photo-top', `${labelHeight + gap + padding}px`);
    parent.style.setProperty('--photo-size', `${photoSize}px`);
    parent.style.setProperty('--input-height', `${photoSize + padding * 2}px`);
    parent.style.setProperty('--content-text', '""');
    document.getElementById('remove-photo').style.display = 'block';
  }
  
  load() {
    const { photo, ...other } = this.resume.header;

    Object.keys(other).forEach((key) => {
      this.headerElements[key].value = other[key];
    });

    photo && this.loadPhoto(this.headerElements.photo);
  }
}

export default new HeaderService();
