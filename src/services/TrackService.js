import { api } from '../util/helpers';
import Axios from 'axios';

const favouriteTracks = () => {
    return new Promise((resolve, reject) => {
        Axios.get(api('favourites'))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

const favourite = (id) => {
    return new Promise((resolve, reject) => {
        Axios.post(api('favourites/' + id))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

const unfavourite = (id) => {
    return new Promise((resolve, reject) => {
        Axios.delete(api('favourites/' + id))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

const all = () => {
    return new Promise((resolve, reject) => {
        Axios.get(api('tracks'))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

const destroy = (id) => {
    return new Promise((resolve, reject) => {
        Axios.delete(api('tracks/' + id))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

const create = (track) => {
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        for (let key in track) {
            formData.append(key, track[key]);
        }
        Axios.post(api('tracks'), formData, { headers: {
            'Content-Type': 'multipart/form-data'
        }})
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

const update = (id, track) => {
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        for (let key in track) {
            formData.append(key, track[key]);
        }
        formData.append("_method", "PUT");
        Axios.post(api('tracks/' + id), formData, { headers: {
            'Content-Type': 'multipart/form-data'
        }})
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

const get = (id) => {
    return new Promise((resolve, reject) => {
        Axios.get(api('tracks/' + id))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

export default {
    favouriteTracks,
    favourite,
    unfavourite,
    all,
    destroy,
    create,
    update,
    get,
}
