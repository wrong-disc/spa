const url = () => process.env.REACT_APP_API_URL;
const api = (resource) => url() + '/api/' + resource;
const csrf = () => url() + '/sanctum/csrf-cookie';

export {
    url,
    api,
    csrf,
};
