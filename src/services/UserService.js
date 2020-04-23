import { api } from '../util/helpers';
import Axios from 'axios';

const get = () => {
    return new Promise((resolve, reject) => {
        Axios.get(api('user'))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

export default {
    get
}
