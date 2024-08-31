class BodyService {
  createStepperElement(number) {
    const stepper = document.createElement('button');
    stepper.classList.add('section-navigation__stepper-container__stepper');
    stepper.textContent = number;

    return stepper;
  }

  createBodyElement() {
    const form = document.createElement('div');
    form.classList.add('section-content__form');

    const sectionHtml = `
      <div class="section-content__header">
        <h2>Untitled</h2>
        <p>Share details to showcase your qualifications</p>
      </div>
    `;

      form.innerHTML = sectionHtml;
    return form;
  }
}

export default new BodyService();
  