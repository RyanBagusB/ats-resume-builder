const resume = {};
resume.header = [];
resume.body = [];
resume.footer = [];

export const storageService = {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  
  load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : resume;
  },
};
  