import bodyExperienceService from "../services/BodyExperienceService";
import bodyService from "../services/BodyService";

class BodyController {
  constructor() {
    this.main();
  }

  main() {
    const backButton = document.querySelector('.tab-contents__body .section-button__back');
    const nextButton = document.querySelector('.tab-contents__body .section-button__next');
    const addBodySectionButton = document.querySelector('.tab-contents__body .section-navigation__add-section');

    const bodyElements = bodyService.load();
    this.loadElements(bodyElements);

    addBodySectionButton.addEventListener('click', this.addBodySectionButtonListener.bind(this));
    backButton.addEventListener('click', this.backButtonListener.bind(this));
    nextButton.addEventListener('click', this.nextButtonListener.bind(this));
  }

  addFunctionalityToButton(stepper, title, addExperienceButton, removeSection) {
    const editTitleButton = title.nextElementSibling;

    stepper.addEventListener('click', this.stepperListener.bind(this));
    title.addEventListener('blur', this.titleOnBlurListener.bind(this));
    title.addEventListener('keydown', this.titleOnKeydownListener.bind(this));
    editTitleButton.addEventListener('click', this.editTitleButtonListener.bind(this));
    addExperienceButton.addEventListener('click', this.addBodyExperienceButtonListener.bind(this));
    removeSection.addEventListener('click', this.removeSectionButtonListener.bind(this));
  }

  loadElements(bodyElements) {
    bodyElements.forEach((element, index) => {
      const { stepper, form, body, footer } = element;
      const title = form.querySelector('h2');
      const addBodySectionButton = footer.querySelector('button');
      const experienceContainer = body.children;
      const removeSection = form.querySelector('.section-content__header').querySelector('.section-content__header__remove-section');
      
      Array.from(experienceContainer).forEach((element) => {
        element.querySelector('input').addEventListener('input', this.experienceNameListener.bind(this));
        const accordion = element.querySelector('.section-content__body__experience__header__button__accordion');
        const addDescription = element.querySelector('.section-content__body__experience__form').querySelector('button');
        const inputDescription = addDescription.previousElementSibling;
        addDescription.addEventListener('click', this.addExperienceButtonListener.bind(this));
        inputDescription.addEventListener('keydown', this.addExperienceButtonKeydownListener.bind(this));
        accordion.addEventListener('click', this.accordionListener.bind(this));
      });

      this.addFunctionalityToButton(stepper, title, addBodySectionButton, removeSection);

      if (index === 0) {
        stepper.classList.add('active');
        form.classList.add('active');
        this.activeStepperSection = stepper;
        this.activeFormSection = form;
      }
    });
  }

  addBodySectionButtonListener() {
    const { stepper, form, footer } = bodyService.createSectionForm();
    const title = form.querySelector('h2');
    const addBodySectionButton = footer.querySelector('button');
    const removeSection = form.querySelector('.section-content__header').querySelector('.section-content__header__remove-section');

    this.addFunctionalityToButton(stepper, title, addBodySectionButton, removeSection);
  }

  removeSectionButtonListener() {

  }

  moveActiveElement(stepper, form) {
    this.activeStepperSection.classList.remove('active');
    this.activeStepperSection = stepper;
    stepper.classList.add('active');

    this.activeFormSection.classList.remove('active');
    this.activeFormSection = form;
    form.classList.add('active');
  }

  stepperListener(event) {
    const stepper = event.target;
    const index = Number(stepper.textContent);
    const sectionContainer = stepper.parentElement.parentElement.nextElementSibling;
    const form = sectionContainer.children[index - 1];

    this.moveActiveElement(stepper, form);
  }

  titleOnKeydownListener(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.blur();
    }
  }

  titleOnBlurListener(event) {
    const title = event.target;
    const editTitleButton = title.closest('.section-content__header').querySelector('.section-content__header__edit-title-button');
    const svg = editTitleButton.children[0];
    const pencil = svg.children[0];
    
    title.removeAttribute('contenteditable');
    editTitleButton.style.display = 'block';
    pencil.style.display = 'block';
    svg.style.display = 'block';
  }

  editTitleButtonListener(event) {
    const editTitleButton = event.target;
    const title = editTitleButton.closest('.section-content__header').querySelector('h2');
    title.setAttribute('contenteditable', 'true');

    editTitleButton.style.display = 'none';

    const range = document.createRange();
    range.selectNodeContents(title);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  accordionListener(event) {
    const accordion = event.target;
    const form = accordion.parentElement.parentElement.nextElementSibling;
    const experience = form.parentElement;

    accordion.classList.toggle('active');
    experience.classList.toggle('active');
    form.classList.toggle('active');
  }

  addBodyExperienceButtonListener(event) {
    const addBodyExperienceButton = event.target;
    const experienceContainer = addBodyExperienceButton.parentElement.previousElementSibling;

    const experience = bodyExperienceService.createExperienceElement();
    experience.querySelector('input').addEventListener('input', this.experienceNameListener.bind(this));
    const addDescription = experience.querySelector('.section-content__body__experience__form').querySelector('button');
    const inputDescription = addDescription.previousElementSibling;
    const accordion = experience.querySelector('.section-content__body__experience__header__button__accordion');
    
    addDescription.addEventListener('click', this.addExperienceButtonListener.bind(this));
    inputDescription.addEventListener('keydown', this.addExperienceButtonKeydownListener.bind(this));
    accordion.addEventListener('click', this.accordionListener.bind(this));
    experienceContainer.appendChild(experience);
  }

  experienceNameListener(event) {
    const experienceName = event.target;
    const experienceTitle = experienceName.parentElement.parentElement.previousElementSibling.querySelector('h3');
    experienceTitle.innerText = experienceName.value;
  }

  addExperienceButtonListener(event) {
    const addButton = event.target;
    const input = addButton.previousElementSibling;
    const experienceContainer = addButton.parentElement.nextElementSibling;

    if (input.value.trim() === '') {
      return;
    }

    experienceContainer.appendChild(bodyExperienceService.createDescriptionList(input.value));
    input.value = '';
  }

  addExperienceButtonKeydownListener(event) {
    if (event.key === 'Enter') {
      const input = event.target;
      const addButton = input.nextElementSibling;
      const experienceContainer = addButton.parentElement.nextElementSibling;

      if (input.value.trim() === '') {
        return;
      }

      experienceContainer.appendChild(bodyExperienceService.createDescriptionList(input.value));
      input.value = '';
    }
  }
  
  backButtonListener() {
    const currentTab = document.querySelector('#body');
    const previousTab = currentTab.previousElementSibling.previousElementSibling;
    const previousStepper = this.activeStepperSection.previousElementSibling;
    const previousForm = this.activeFormSection.previousElementSibling;
    
    if (!previousForm) {
      currentTab.checked = false;
      previousTab.checked = true;

      return;
    }

    this.moveActiveElement(previousStepper, previousForm);
  }

  nextButtonListener() {
    const currentTab = document.querySelector('#body');
    const nextTab = currentTab.nextElementSibling.nextElementSibling;
    const nextStepper = this.activeStepperSection.nextElementSibling;
    const nextForm = this.activeFormSection.nextElementSibling;

    if (!nextForm) {
      currentTab.checked = false;
      nextTab.checked = true;

      bodyService.save();
      return;
    }

    this.moveActiveElement(nextStepper, nextForm);

    bodyService.save();
  }
}

export default new BodyController();
