import axios from 'axios';

const instacnce = axios.create({
    baseURL: 'http://localhost:9000',
})

export default instacnce;