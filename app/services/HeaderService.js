import { resumeService } from "./resumeService";

class HeaderService {
  getHeaderElements() {
    const section = document.querySelector('.tab-contents__header .section-content__body');

    const name = section.querySelector('#name');
    const phoneNumber = section.querySelector('#phoneNumber');
    const email = section.querySelector('#phoneNumber');
    const linkedin = section.querySelector('#linkedin');

    return { name, phoneNumber, email, linkedin };
  }

  saveHeader () {
    const { name, phoneNumber, email } = this.getHeaderElements();
    const resume = resumeService.getCV();

    resume.header = {
      name: name.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      linkedin: linkedin.value,
    };

    resumeService.saveCV(resume);
  }

  loadHeader() {
    const { name, phoneNumber, email } = this.getHeaderElements();
    const { header } = resumeService.getCV();

    header.name ? name.value = header.name : '';
    header.phoneNumber ? phoneNumber.value = header.phoneNumber : '';
    header.email ? email.value = header.email : '';
    header.linkedin ? linkedin.value = header.linkedin : '';
  }
}

export default new HeaderService();
