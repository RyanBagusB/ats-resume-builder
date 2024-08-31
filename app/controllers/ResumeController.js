import bodyService from "../services/BodyService";
import headerService from "../services/HeaderService";
import saveService from "../services/SaveService";

class ResumeController {
  constructor() {
    this.addBodySectionButton = document.querySelector('.tab-contents__body .section-navigation__add-section');
    this.activeBodySection = document.querySelector('.tab-contents__body .section-content__form.active');
    this.activeStepperSection = document.querySelector('.tab-contents__body .section-navigation__stepper-container__stepper.active');

    headerService.loadHeader();
  }

  main() {
    this.initStepperButtonListener();
    const headerSaveButton = document.querySelector('.tab-contents__header .section-content__footer__next');
    const bodySaveButton = document.querySelector('.tab-contents__body .section-content__footer__next');

    headerSaveButton.addEventListener('click', saveService.headerSaveButtonListener);
    bodySaveButton.addEventListener('click', () => {
      const { activeStepper, activeBody } = saveService.bodySaveButtonListener(this.activeStepperSection, this.activeBodySection);

      this.activeStepperSection = activeStepper;
      this.activeBodySection = activeBody;
    });

    this.addBodySectionButton.addEventListener('click', () => {
      this.addBodySectionListener();
    });
  }

  initStepperButtonListener() {
    const stepper = document.querySelector('.tab-contents__body .section-navigation__stepper-container__stepper.active');
    const bodySection = document.querySelector('.tab-contents__body .section-content__form.active');
    
    this.activeStepperSection.addEventListener('click', () => {
      this.stepperListener(stepper, bodySection);
    });
  }

  addBodySectionListener() {
    const sectionContainer = document.querySelector('.tab-contents__body .section-content');
    const stepperContainer = document.querySelector('.tab-contents__body .section-navigation__stepper-container');

    const stepperLength = stepperContainer.children.length + 1;
    const stepper = bodyService.createStepperElement(stepperLength);
    const bodySection = bodyService.createBodyElement();

    stepper.addEventListener('click', () => {
      this.stepperListener(stepper, bodySection);
    });

    stepperContainer.appendChild(stepper);
    sectionContainer.appendChild(bodySection);
  }

  stepperListener(stepper, bodySection) {
    this.activeStepperSection.classList.remove('active');
    this.activeStepperSection = stepper;
    stepper.classList.add('active');

    this.activeBodySection.classList.remove('active');
    this.activeBodySection = bodySection;
    bodySection.classList.add('active');
  }
}

export default ResumeController;