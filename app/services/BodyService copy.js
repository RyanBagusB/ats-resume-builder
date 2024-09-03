class BodyService {
  constructor() {
    this.initEditButtonListener();
  }

  initEditButtonListener() {
    const title = document.querySelector('.tab-contents__body .section-content__header-title');
    const editTitleButton = document.querySelector('.tab-contents__body .section-content__header__edit-title-button');
    
    this.editTitleHandler(title, editTitleButton);
  }

  createStepperElement(number) {
    const stepper = document.createElement('button');
    stepper.classList.add('section-navigation__stepper-container__stepper');
    stepper.textContent = number;

    return stepper;
  }

  resetTitle(titleElement, editTitleButton) {
    titleElement.removeAttribute('contenteditable');
    editTitleButton.style.display = 'block';
  }

  editTitleListener(titleElement, editTitleButton) {
    titleElement.setAttribute('contenteditable', 'true');
  
    editTitleButton.style.display = 'none';
  
    const range = document.createRange();
    range.selectNodeContents(titleElement);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  editTitleHandler(title, editTitleButton) {
    editTitleButton.addEventListener('click', () => {
      this.editTitleListener(title, editTitleButton);
    });

    title.addEventListener('blur', () =>{
      this.resetTitle(title, editTitleButton);
    });
      
    title.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        title.blur();
      }
    });
  }

  createBodySectionHeader() {
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

    this.editTitleHandler(title, editTitleButton);

    header.append(title, editTitleButton, description);

    return header;
  }

  createBodySection() {
    const form = document.createElement('div');
    form.classList.add('section-content__form');
    
    const header = this.createBodySectionHeader();
    
    form.append(header);

    return form;
  }
}

export default new BodyService();
  