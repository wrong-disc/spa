const url = () => process.env.REACT_APP_API_URL;
const api = (resource) => url() + '/api/' + resource;
const csrf = () => url() + '/sanctum/csrf-cookie';

const pad = (num, size) => {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

const fmtMSS = s => ((s-(s%=60))/60+(9<s?':':':0')+s);

export {
    url,
    api,
    csrf,
    pad,
    fmtMSS
};
