import { api } from '../util/helpers';
import Axios from 'axios';
import md5 from 'md5';

const get = (id) => {
    return new Promise((resolve, reject) => {
        Axios.get(api('users/' + id))
        .then(res => {
            res.data.md5 = md5(res.data.email);
            resolve(res.data);
        })
        .catch(err => reject(err.response.data));
    });
};

const all = () => {
    return new Promise((resolve, reject) => {
        Axios.get(api('users'))
        .then(res => {
            let users = res.data;
            for (let i in users){
                users[i].md5 = md5(users[i].email); 
            }
            resolve(users);           
        })
        .catch(err => reject(err.response.data));
    });
};

const update = (id, user) => {
    return new Promise((resolve, reject) => {
        Axios.put(api('users/' + id), user)
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

const destroy = (id) => {
    return new Promise((resolve, reject) => {
        Axios.delete(api('users/' + id))
        .then(res => resolve(res.data))
        .catch(err => reject(err.response.data));
    });
};

export default {
    get,
    all,
    update,
    destroy,
}
