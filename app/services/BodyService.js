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

  createSectionElement() {
    const header = document.createElement('div');
    const title = document.createElement('h2');
    const editTitleButton = document.createElement('button');
    const description = document.createElement('p');

    header.classList.add('section-content__header');
    title.classList.add('section-content__header-title');
    editTitleButton.classList.add('section-content__header__edit-title-button');

    title.innerText = 'Untitled';
    editTitleButton.innerHTML = '<i class="fa fa-pencil"></i>';
    description.innerText = 'Share details to showcase your qualifications';

    header.append(title, editTitleButton, description);

    return header;
  }

  createSectionForm() {
    const form = document.createElement('div');
    const stepperElement = this.createStepperElement();
    const sectionElement = this.createSectionElement();
    
    form.classList.add('section-content__form');
    form.appendChild(sectionElement);

    this.stepperContainer.appendChild(stepperElement);
    this.sectionContent.appendChild(form);

    const bodyElement = { stepper: stepperElement, form };
    this.bodyElements.push(bodyElement);

    return bodyElement;
  }

  save() {
    console.log(this.bodyElements)
  }

  load() {
    const { body } = this.resume;


    if (body) {
      body.forEach((value) => {
        console.log(value.title);
      });
    } else {
      this.createSectionForm();
    }
    
    return this.bodyElements;
  }
}

export default new BodyService();