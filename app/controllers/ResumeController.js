import bodyService from "../services/BodyService";
import headerService from "../services/HeaderService";

class ResumeController {
  constructor() {
    this.addBodySectionButton = document.querySelector('.tab-contents__body .section-navigation__add-section');
    this.activeBodySection = document.querySelector('.tab-contents__body .section-content__form.active');
    this.activeStepperSection = document.querySelector('.tab-contents__body .section-navigation__stepper-container__stepper.active');
    headerService.loadHeader();
  }

  main() {
    const saveButton = document.querySelector('.tab-contents__header .section-content__footer__next');

    saveButton.addEventListener('click', () => {
      const currentTab = document.querySelector('#header');
      const nextTab = currentTab.nextElementSibling.nextElementSibling;
      
      currentTab.checked = false;
      nextTab.checked = true;
      headerService.saveHeader();
    });

    this.addBodySectionButton.addEventListener('click', () => {
      const sectionContainer = document.querySelector('.tab-contents__body .section-content');
      const stepperContainer = document.querySelector('.tab-contents__body .section-navigation__stepper-container');

      const stepperLength = stepperContainer.children.length + 1;
      const stepper = bodyService.createStepperElement(stepperLength);
      const bodySection = bodyService.createBodyElement();

      stepper.addEventListener('click', () => {
        this.activeStepperSection.classList.remove('active');
        this.activeStepperSection = stepper;
        stepper.classList.add('active');

        this.activeBodySection.classList.remove('active');
        this.activeBodySection = bodySection;
        bodySection.classList.add('active');
      });

      stepperContainer.appendChild(stepper);
      sectionContainer.appendChild(bodySection);
    })
  }
}

export default ResumeController;