import bodyService from "../services/BodyService";

class BodyController {
  constructor() {
    this.addBodySectionButton = document.querySelector('.tab-contents__body .section-navigation__add-section');
    this.main();
  }

  main() {
    const backButton = document.querySelector('.tab-contents__body .section-content__footer__back');
    const nextButton = document.querySelector('.tab-contents__body .section-content__footer__next');

    const bodyElements = bodyService.load();
    this.loadElements(bodyElements);

    this.addBodySectionButton.addEventListener('click', this.addBodySectionButtonListener.bind(this));
    backButton.addEventListener('click', this.backButtonListener.bind(this));
    nextButton.addEventListener('click', this.nextButtonListener.bind(this));
  }

  loadElements(bodyElements) {
    bodyElements.forEach((element, index) => {
      const { stepper, form } = element;
      stepper.addEventListener('click', this.stepperListener.bind(this));

      if (index === 0) {
        stepper.classList.add('active');
        form.classList.add('active');
        this.activeStepperSection = stepper;
        this.activeFormSection = form;
      }
    });
  }

  addBodySectionButtonListener() {
    const { stepper } = bodyService.createSectionForm();

    stepper.addEventListener('click', this.stepperListener.bind(this));
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

      return;
    }

    this.moveActiveElement(nextStepper, nextForm);

    bodyService.save();
  }
}

export default new BodyController();
