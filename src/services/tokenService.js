const LOCALSTORAGE_KEY = 'token';

export default class tokenService {
  static save(token) {
    localStorage.setItem(LOCALSTORAGE_KEY, token);
  }

  static get() {
    return localStorage.getItem(LOCALSTORAGE_KEY);
  }

  static remove() {
    localStorage.removeItem(LOCALSTORAGE_KEY);
  }
}
