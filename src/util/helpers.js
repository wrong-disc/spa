const url = () => process.env.REACT_APP_API_URL;
const api = (resource) => url() + '/api/' + resource;
const csrf = () => url() + '/sanctum/csrf-cookie';

const pad = (num, size) => {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

export {
    url,
    api,
    csrf,
    pad
};
