class BodyService {
  constructor() {
    this.initEditButtonListener();
  }

  initEditButtonListener() {
    const title = document.querySelector('.tab-contents__body .section-content__header-title');
    const editTitleButton = document.querySelector('.tab-contents__body .section-content__header__edit-title-button');

    title.addEventListener('blur', () => {
      title.removeAttribute('contenteditable');
    });
  
    title.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        title.blur();
      }
    });

    editTitleButton.addEventListener('click', () => {
      this.editTitleListener(title);
    });
  }

  createStepperElement(number) {
    const stepper = document.createElement('button');
    stepper.classList.add('section-navigation__stepper-container__stepper');
    stepper.textContent = number;

    return stepper;
  }

  editTitleListener(title) {
    title.setAttribute('contenteditable', 'true');

    const range = document.createRange();
    range.selectNodeContents(title);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  createBodySectionHeader() {
    const header = document.createElement('div');
    const title = document.createElement('h2');
    const editTitleButton = document.createElement('button');
    const saveTitleButton = document.createElement('button');
    const description = document.createElement('p');

    header.classList.add('section-content__header');
    title.classList.add('section-content__header-title');
    saveTitleButton.classList.add('section-content__header__edit-title-button');
    saveTitleButton.classList.add('section-content__header__save-title-button');

    title.innerText = 'Untitled';
    editTitleButton.innerHTML = '<i class="fa fa-pencil"></i>';
    saveTitleButton.innerHTML = '<i class="fas fa-save"></i>';

    title.addEventListener('blur', () => {
      title.removeAttribute('contenteditable');
    });
  
    title.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        title.blur();
      }
    });

    editTitleButton.addEventListener('click', () => {
      this.editTitleListener(title);
    });

    header.append(title, editTitleButton, saveTitleButton, description);

    return header;
  }

  createBodySection() {
    const form = document.createElement('div');
    form.classList.add('section-content__form');
    
    const header = this.createBodySectionHeader();

    const sectionHtml = `
      <div class="section-content__body">
        <input type="text">
      </div>
    `;

    form.append(header);

    // form.innerHTML = sectionHtml;
    return form;
  }
}

export default new BodyService();
  