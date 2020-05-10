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

export default {
    favouriteTracks,
    favourite,
    unfavourite
}
