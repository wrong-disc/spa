import { api } from '../util/helpers';
import Axios from 'axios';

const all = () => {
    return new Promise((resolve, reject) => {
        Axios.get(api('albums'))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

const explore = () => {
    return new Promise((resolve, reject) => {
        Axios.get(api('albums/explore' ))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

const get = (id) => {
    return new Promise((resolve, reject) => {
        Axios.get(api('albums/' + id))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

const destroy = (id) => {
    return new Promise((resolve, reject) => {
        Axios.delete(api('albums/' + id))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

const create = (album) => {
    return new Promise((resolve, reject) => {
        Axios.post(api('albums'), album)
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

const update = (id, album) => {
    return new Promise((resolve, reject) => {
        Axios.put(api('albums/'+ id), album)
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

export default {
    all, 
    get,
    explore,
    destroy,
    create,
    update,
}
