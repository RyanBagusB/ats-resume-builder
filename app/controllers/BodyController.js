import bodyService from "../services/BodyService";

class BodyController {
  constructor() {
    this.addBodySectionButton = document.querySelector('.tab-contents__body .section-navigation__add-section');
    this.main();
  }

  main() {
    const nextButton = document.querySelector('.tab-contents__body .section-content__footer__next');

    const bodyElements = bodyService.load();

    this.addBodySectionButton.addEventListener('click', this.addBodySectionButtonListener.bind(this));
    nextButton.addEventListener('click', this.nextButtonListener.bind(this));
    
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

  stepperListener(event) {
    const stepper = event.target;
    const index = Number(stepper.textContent);
    const sectionContainer = stepper.parentElement.parentElement.nextElementSibling;
    const bodySection = sectionContainer.children[index - 1];

    this.activeStepperSection.classList.remove('active');
    this.activeStepperSection = stepper;
    stepper.classList.add('active');

    this.activeFormSection.classList.remove('active');
    this.activeFormSection = bodySection;
    bodySection.classList.add('active');
  }

  nextButtonListener() {
    bodyService.save();
  }
}

export default new BodyController();
