import '@fortawesome/fontawesome-free/js/all.min.js';
import './style.css';
import ResumeController from './app/controllers/ResumeController';
import './app/controllers/HeaderController';

const resumeController = new ResumeController();
resumeController.main();
