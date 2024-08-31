import headerService from "./HeaderService";

class navigationService {
  headerNextButtonListener() {
    const currentTab = document.querySelector('#header');
    const nextTab = currentTab.nextElementSibling.nextElementSibling;
    
    currentTab.checked = false;
    nextTab.checked = true;
    headerService.saveHeader();
  }
  
  bodyNextButtonListener(activeStepper, activeBody) {
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

  bodyBackButtonListener(activeStepper, activeBody) {
    const currentTab = document.querySelector('#body');
    const previousTab = currentTab.previousElementSibling.previousElementSibling;
    const previousStepper = activeStepper.previousElementSibling;
    const previousBody = activeBody.previousElementSibling;
    
    if (!previousBody) {
      currentTab.checked = false;
      previousTab.checked = true;
      return { activeStepper, activeBody };
    }

    activeStepper.classList.remove('active');
    previousStepper.classList.add('active');
    
    activeBody.classList.remove('active');
    previousBody.classList.add('active');

    return { activeStepper: previousStepper, activeBody: previousBody };
  }
}

export default new navigationService();