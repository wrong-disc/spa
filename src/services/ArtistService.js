import { api } from '../util/helpers';
import Axios from 'axios';

const get = (id) => {
    return new Promise((resolve, reject) => {
        Axios.get(api('artists/' + id))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

export default {
    get
}
