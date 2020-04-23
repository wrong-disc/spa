const api = (resource) => process.env.REACT_APP_API_URL + '/api/' + resource;

const csrf = () => process.env.REACT_APP_API_URL + '/sanctum/csrf-cookie';

export {
    api,
    csrf,
};
