import headerService from "../services/HeaderService";

class SaveService {
  headerSaveButtonListener() {
    const currentTab = document.querySelector('#header');
    const nextTab = currentTab.nextElementSibling.nextElementSibling;
    
    currentTab.checked = false;
    nextTab.checked = true;
    headerService.saveHeader();
  }
  
  bodySaveButtonListener(activeStepper, activeBody) {
    const currentTab = document.querySelector('#body');
    const nextTab = currentTab.nextElementSibling.nextElementSibling;
    const nextStepper = activeStepper.nextElementSibling;
    const nextBody = activeBody.nextElementSibling;

    if (!nextBody) {
      currentTab.checked = false;
      nextTab.checked = true;
      return { activeStepper, activeBody };
    }

    activeStepper.classList.remove('active');
    nextStepper.classList.add('active');
    
    activeBody.classList.remove('active');
    nextBody.classList.add('active');

    return { activeStepper: nextStepper, activeBody: nextBody };
  }
}

export default new SaveService();