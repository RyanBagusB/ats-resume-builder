import headerService from "../services/HeaderService";

class SaveService {
  headerSaveButtonListener() {
    const currentTab = document.querySelector('#header');
    const nextTab = currentTab.nextElementSibling.nextElementSibling;
    
    currentTab.checked = false;
    nextTab.checked = true;
    headerService.saveHeader();
  }
}

export default new SaveService();