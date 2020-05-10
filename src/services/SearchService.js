import { api } from '../util/helpers';
import Axios from 'axios';

const search = (query) => {
    return new Promise((resolve, reject) => {
        Axios.get(api('search/' + query))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

export default {
    search
}
