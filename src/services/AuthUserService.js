import { api } from '../util/helpers';
import Axios from 'axios';
import md5 from 'md5';

const get = () => {
    return new Promise((resolve, reject) => {
        Axios.get(api('user'))
        .then(res => {
            res.data.md5 = md5(res.data.email);
            resolve(res.data);
        })
        .catch(err => reject(err.response.data));
    });
};

const update = (user) => {
    return new Promise((resolve, reject) => {
        Axios.put(api('user'), user)
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

export default {
    get,
    update,
}
