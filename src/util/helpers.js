const url = () => process.env.REACT_APP_API_URL;
const api = (resource) => url() + '/api/' + resource;
const csrf = () => url() + '/sanctum/csrf-cookie';

const pad = (num, size) => {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

const fmtMSS = s => ((s-(s%=60))/60+(9<s?':':':0')+s);

const array_move = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

export {
    url,
    api,
    csrf,
    pad,
    fmtMSS,
    array_move,
};
