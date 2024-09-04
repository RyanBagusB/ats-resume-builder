import bodyService from "../services/BodyService";

class BodyController {
  constructor() {
    this.main();
  }

  main() {
    const backButton = document.querySelector('.tab-contents__body .section-content__footer__back');
    const nextButton = document.querySelector('.tab-contents__body .section-content__footer__next');
    const addBodySectionButton = document.querySelector('.tab-contents__body .section-navigation__add-section');

    const bodyElements = bodyService.load();
    this.loadElements(bodyElements);

    addBodySectionButton.addEventListener('click', this.addBodySectionButtonListener.bind(this));
    backButton.addEventListener('click', this.backButtonListener.bind(this));
    nextButton.addEventListener('click', this.nextButtonListener.bind(this));
  }

  addFunctionalityToButton(stepper, title) {
    const editTitleButton = title.nextElementSibling;

    stepper.addEventListener('click', this.stepperListener.bind(this));
    title.addEventListener('blur', this.titleListener.bind(this));
    editTitleButton.addEventListener('click', this.editTitleButtonListener.bind(this));
  }

  loadElements(bodyElements) {
    bodyElements.forEach((element, index) => {
      const { stepper, form } = element;
      const title = form.querySelector('h2');

      this.addFunctionalityToButton(stepper, title);

      if (index === 0) {
        stepper.classList.add('active');
        form.classList.add('active');
        this.activeStepperSection = stepper;
        this.activeFormSection = form;
      }
    });
  }

  addBodySectionButtonListener() {
    const { stepper, form } = bodyService.createSectionForm();
    const title = form.querySelector('h2');

    this.addFunctionalityToButton(stepper, title);
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

  titleListener(event) {
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
