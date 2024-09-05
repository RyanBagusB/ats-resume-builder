class BodyExperienceService {
  constructor() {

  }

  createTitleForm(formTitleText) {
    const sectionContentBodyInput = document.createElement('div');
    const titleLable = document.createElement('label');
    const titleForm = document.createElement('input');
  
    sectionContentBodyInput.classList.add('section-content__body__input');
    titleLable.innerText = 'Name';
    titleForm.placeholder = 'Enter experience name';
    titleForm.value = formTitleText;

    sectionContentBodyInput.append(titleLable, titleForm);

    return sectionContentBodyInput;
  }

  createPositionForm(position) {
    const sectionContentBodyInput = document.createElement('div');
    const positionLable = document.createElement('label');
    const positionForm = document.createElement('input');
  
    sectionContentBodyInput.classList.add('section-content__body__input');
    positionLable.innerText = 'Position';
    positionForm.placeholder = 'Enter experience position';
    positionForm.value = position;

    sectionContentBodyInput.append(positionLable, positionForm);

    return sectionContentBodyInput;
  }

  createLocationForm(location) {
    const sectionContentBodyInput = document.createElement('div');
    const locationLable = document.createElement('label');
    const locationForm = document.createElement('input');
  
    sectionContentBodyInput.classList.add('section-content__body__input');
    locationLable.innerText = 'Location';
    locationForm.placeholder = 'Enter experience location';
    locationForm.value = location;

    sectionContentBodyInput.append(locationLable, locationForm);

    return sectionContentBodyInput;
  }

  createDateForm(date) {
    const sectionContentBodyInput = document.createElement('div');
    const dateLable = document.createElement('label');
    const dateForm = document.createElement('input');
  
    sectionContentBodyInput.classList.add('section-content__body__input');
    dateLable.innerText = 'Date';
    dateForm.placeholder = 'Enter experience date';
    dateForm.value = date;

    sectionContentBodyInput.append(dateLable, dateForm);

    return sectionContentBodyInput;
  }

  createLinkForm(link) {
    const sectionContentBodyInput = document.createElement('div');
    const linkLable = document.createElement('label');
    const linkForm = document.createElement('input');
  
    sectionContentBodyInput.classList.add('section-content__body__input');
    linkLable.innerText = 'Link';
    linkForm.placeholder = 'Enter experience link';
    linkForm.value = link;

    sectionContentBodyInput.append(linkLable, linkForm);

    return sectionContentBodyInput;
  }

  createExperienceFormElement(title, position, location, date, link) {
    const experienceFormContainer = document.createElement('div');
    const titleForm = this.createTitleForm(title);
    const positionForm = this.createPositionForm(position);
    const locationForm = this.createLocationForm(location);
    const dateForm = this.createDateForm(date);
    const linkForm = this.createLinkForm(link);

    experienceFormContainer.append(titleForm, positionForm, locationForm, dateForm, linkForm);

    return experienceFormContainer;
  }

  createExperienceElement(title = 'Untitled', position = '', location = '', date = '', link = '') {
    const experience = document.createElement('div');
    experience.classList.add('section-content__body');
    const experienceTitle = document.createElement('h3');
    const experienceFormContainer = this.createExperienceFormElement(title, position, location, date, link);

    experienceTitle.innerText = title;
    experience.append(experienceTitle, experienceFormContainer);

    return experience;
  }
 
  save(experiencesElement) {
    return Array.from(experiencesElement.children).map(experience => ({
      title: experience.querySelector('div').children[0].querySelector('input').value,
      position: experience.querySelector('div').children[1].querySelector('input').value,
      location: experience.querySelector('div').children[2].querySelector('input').value,
      date: experience.querySelector('div').children[3].querySelector('input').value,
      link: experience.querySelector('div').children[4].querySelector('input').value,
    }));
  }

  load(experiences, container) {
    experiences.forEach(({ title, position, location, date, link }) => {
      container.appendChild(this.createExperienceElement(title, position, location, date, link));
    });
  }
}

export default new BodyExperienceService();
