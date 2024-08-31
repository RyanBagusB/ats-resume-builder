import headerService from "../services/HeaderService";

class ResumeController {
  constructor() {
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
  }
}

export default ResumeController;