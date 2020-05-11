import { api } from '../util/helpers';
import StreamState from './StreamState';
import Axios from 'axios';

const init = () => {
    return new Promise((resolve, reject) => {
        StreamState.stream = document.getElementById('audio-player');
        resolve(StreamState.stream);
    });
};

const load = (track) => {
    return new Promise((resolve, reject) => {
        Axios.get(api('tracks/' + track.id))
        .then(res => {
            let track = res.data;
            StreamState.currentlyPlaying = track;
            StreamState.stream.src = api('tracks/' + StreamState.currentlyPlaying.id + '/stream');
            resolve();
        })
    });
};

const play = () => {
    return new Promise((resolve, reject) => {
        if(!StreamState.currentlyPlaying) {
            resolve(false);
            return;
        }
        StreamState.stream.play();
        resolve(true);
    });
};

const pause = () => {
    return new Promise((resolve, reject) => {
        StreamState.stream.pause();
        resolve(false);
    });
};

const getTrack = () => StreamState.currentlyPlaying;

export default {
    init,
    load,
    play,
    pause,
    getTrack
}
