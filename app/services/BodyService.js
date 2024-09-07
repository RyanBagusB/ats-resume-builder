import bodyExperienceService from "./BodyExperienceService";
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

  createSectionHeaderElement(titleText) {
    const header = document.createElement('div');
    const titleContainer =document.createElement('div');
    const titleConfiguration  = document.createElement('div');
    const title = document.createElement('h2');
    const editTitleButton = document.createElement('button');
    const description = document.createElement('p');
    const deleteSectionButton = document.createElement('button');

    titleConfiguration.append(title, editTitleButton);
    titleConfiguration.classList.add('section-content__header__configuration');
    titleContainer.classList.add('section-content__header__configuration__container');
    titleContainer.append(titleConfiguration, description);
    header.classList.add('section-content__header');
    title.classList.add('section-content__header-title');
    editTitleButton.classList.add('section-content__header__edit-title-button');
    title.innerText = titleText;
    deleteSectionButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    editTitleButton.innerHTML = '<i class="fa fa-pencil"></i>';
    description.innerText = 'Share details to showcase your qualifications';

    header.append(titleContainer, deleteSectionButton);

    return header;
  }

  createSectionBodyElement() {
    const body = document.createElement('div');
    body.classList.add('section-content__body');

    return body;
  }

  createSectionFooterElement() {
    const footer = document.createElement('div');
    const addExperienceButton = document.createElement('button');

    addExperienceButton.classList.add('section-content__footer__add-experience-button');
    addExperienceButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add Experience';
    footer.classList.add('section-content__footer');
    footer.appendChild(addExperienceButton);

    return footer;
  }

  createSectionForm(title = 'Untitled') {
    const form = document.createElement('div');
    const stepperElement = this.createStepperElement();
    const header = this.createSectionHeaderElement(title);
    const body = this.createSectionBodyElement();
    const footer = this.createSectionFooterElement();
    
    form.classList.add('section-content__form');
    form.append(header, body, footer);

    this.stepperContainer.appendChild(stepperElement);
    this.sectionContent.appendChild(form);

    const bodyElement = { stepper: stepperElement, form, body, footer };
    this.bodyElements.push(bodyElement);

    return bodyElement;
  }

  save() {
    this.resume.body = [];
    this.bodyElements.forEach((element) => {
      const form = element.form;
      const title = form.querySelector('h2').textContent;

      const experiences = bodyExperienceService.save(element.body);

      this.resume.body.push({ title, experiences });
    });

    resumeService.saveCV(this.resume);
  }

  load() {
    const { body } = this.resume;

    if (body.length) {
      body.forEach(({ title, experiences }) => {
        const { body } = this.createSectionForm(title);
        bodyExperienceService.load(experiences, body);
      });
    } else {
      this.createSectionForm();
    }
    
    return this.bodyElements;
  }
}

export default new BodyService();
