import { storageService } from './storageService.js';

const CV_KEY = 'userCV';

export const resumeService = {
  saveCV(cvData) {
    storageService.save(CV_KEY, cvData);
  },

  getCV() {
    return storageService.load(CV_KEY);
  },
};
