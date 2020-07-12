import { api } from '../util/helpers';
import Axios from 'axios';

const get = (id) => {
    return new Promise((resolve, reject) => {
        Axios.get(api('artists/' + id))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

const all = () => {
    return new Promise((resolve, reject) => {
        Axios.get(api('artists'))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

const create = (artist) => {
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        for (let key in artist) {
            formData.append(key, artist[key]);
        }
        Axios.post(api('artists'), formData, { headers: {
            'Content-Type': 'multipart/form-data'
        }})
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

const update = (id, artist) => {
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        for (let key in artist) {
            formData.append(key, artist[key]);
        }
        formData.append("_method", "PUT");
        Axios.post(api('artists/' + id), formData, { headers: {
            'Content-Type': 'multipart/form-data'
        }})
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

const destroy = (id) => {
    return new Promise((resolve, reject) => {
        Axios.delete(api('artists/' + id))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

export default {
    get,
    all,
    destroy,
    create,
    update,
}
