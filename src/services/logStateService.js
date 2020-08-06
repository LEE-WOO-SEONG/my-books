const LOCALSTORAGE_KEY = 'keepLogState';

export default class logStateService {
  static save(logState) {
    localStorage.setItem(LOCALSTORAGE_KEY, logState);
  }

  static get() {
    return localStorage.getItem(LOCALSTORAGE_KEY);
  }

  static remove() {
    localStorage.removeItem(LOCALSTORAGE_KEY);
  }
}
