class BodyExperienceService {
  constructor() {

  }

  createExperienceElement() {
    const experience = document.createElement('div');
    const experienceTitle = document.createElement('h3');

    experienceTitle.innerText = 'Untitled';
    experience.append(experienceTitle);

    return experience;
  }

  save(experiencesElement) {
    const experiences = Array.from(experiencesElement).map(experience => {
      const title = experience.innerText;
      return { title };
    });
  
    return experiences;
  }
}

export default new BodyExperienceService();
