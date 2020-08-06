import axios from 'axios';
const API_URL = 'https://api.marktube.tv/v1/book';

export default class bookService {
  static async getBooks(token) {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}
