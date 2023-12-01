import axios from 'axios';

const axiosApi = axios.create({
  baseURL:'https://blog-a7f88-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;