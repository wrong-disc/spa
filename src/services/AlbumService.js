import { api } from '../util/helpers';
import Axios from 'axios';

const all = () => {
    return new Promise((resolve, reject) => {
        Axios.get(api('albums'))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

export default {
    all
}
