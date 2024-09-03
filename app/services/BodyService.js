import { resumeService } from "./resumeService";

class BodyService {
  constructor() {
    this.resume = resumeService.getCV();
    this.sectionContent = document.querySelector('.tab-contents__body .section-content');
    this.stepperContainer = document.querySelector('.tab-contents__body .section-navigation__stepper-container');
    this.bodyElements = [];
  }

  createStepperElement() {
    const stepper = document.createElement('button');
    const number = this.bodyElements.length + 1;
    stepper.classList.add('section-navigation__stepper-container__stepper');
    stepper.textContent = number;

    return stepper;
  }

  createSectionElement(titleText) {
    const header = document.createElement('div');
    const title = document.createElement('h2');
    const editTitleButton = document.createElement('button');
    const description = document.createElement('p');

    header.classList.add('section-content__header');
    title.classList.add('section-content__header-title');
    editTitleButton.classList.add('section-content__header__edit-title-button');

    title.innerText = titleText;
    editTitleButton.innerHTML = '<i class="fa fa-pencil"></i>';
    description.innerText = 'Share details to showcase your qualifications';

    header.append(title, editTitleButton, description);

    return header;
  }

  createSectionForm(title = 'Untitled') {
    const form = document.createElement('div');
    const stepperElement = this.createStepperElement();
    const sectionElement = this.createSectionElement(title);
    
    form.classList.add('section-content__form');
    form.appendChild(sectionElement);

    this.stepperContainer.appendChild(stepperElement);
    this.sectionContent.appendChild(form);

    const bodyElement = { stepper: stepperElement, form };
    this.bodyElements.push(bodyElement);

    return bodyElement;
  }

  save() {
    this.resume.body = [];
    this.bodyElements.forEach((element) => {
      const form = element.form;
      const title = form.querySelector('h2').textContent;

      this.resume.body.push({ title });
    });
    
    resumeService.saveCV(this.resume);
  }

  load() {
    const { body } = this.resume;


    if (body.length) {
      body.forEach((value) => {
        this.createSectionForm(value.title);
      });
    } else {
      this.createSectionForm();
    }
    
    return this.bodyElements;
  }
}

export default new BodyService();