import axios from 'axios';

export const getZipCodeDetails = (zipCode: string) =>
  axios.get(`https://viacep.com.br/ws/${zipCode.replace('-', '')}/json/`);
