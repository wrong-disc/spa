import { api, array_move } from '../util/helpers';
import StreamState from './StreamState';
import Axios from 'axios';

const init = () => {
    return new Promise((resolve, reject) => {
        StreamState.stream = document.getElementById('audio-player');
        resolve(StreamState.stream);
    });
};

const addToPlaylist = (track) => {
    return new Promise((resolve, reject) => {
        Axios.get(api('tracks/' + track.id))
        .then(res => {
            let track = res.data;
            StreamState.playlist.push(track);
            resolve();
        })
    });
};

const removeFromPlaylist = (index) => {
    return new Promise((resolve, reject) => {
        StreamState.playlist.splice(index, 1);
        resolve();
    });
};

const clearPlaylist = () => {
    return new Promise((resolve, reject) => {
        StreamState.playlist = [];
        resolve();
    });
};

const moveDown = (index) => {
    return new Promise((resolve, reject) => {
        StreamState.playlist = array_move(StreamState.playlist, index, index - 1);
        if(StreamState.currentIndex === index) {
            StreamState.currentIndex -= 1;
        }
        resolve();
    });
};

const moveUp = (index) => {
    return new Promise((resolve, reject) => {
        StreamState.playlist = array_move(StreamState.playlist, index, index + 1);
        if(StreamState.currentIndex === index) {
            StreamState.currentIndex += 1;
        }
        resolve();
    });
};

const loadFromIndex = (index) => {
    return new Promise((resolve, reject) => {
        if(index >= StreamState.playlist.length || index < 0) {
            _unload().then().catch(reject);
        } else {
            StreamState.currentIndex = index;
            _load(StreamState.playlist[StreamState.currentIndex]).then(resolve).catch(reject);
        }
    });
}

const loadNext = () => {
    return new Promise((resolve, reject) => {
        if(StreamState.currentIndex + 1 >= StreamState.playlist.length) {
            _unload().then().catch(reject);
        } else {
            StreamState.currentIndex++;
            _load(StreamState.playlist[StreamState.currentIndex]).then(resolve).catch(reject);
        }
    });
}

const loadPrev = () => {
    return new Promise((resolve, reject) => {
        if(StreamState.currentIndex === 0) {
            _unload().then(resolve).catch(reject);
        } else {
            StreamState.currentIndex--;
            _load(StreamState.playlist[StreamState.currentIndex]).then(resolve).catch(reject);
        }
    });
}

const load = (track) => {
    return new Promise((resolve, reject) => {
        Axios.get(api('tracks/' + track.id))
        .then(res => {
            let track = res.data;
            StreamState.playlist.splice(StreamState.currentIndex + 1, 0, track);
            if(StreamState.currentIndex + 1 < StreamState.playlist.length) {
                StreamState.currentIndex += 1;
            }
            _load(track).then(resolve).catch(reject);
        })
    });
};

const _load = (track) => {
    return new Promise((resolve, reject) => {
        StreamState.currentlyPlaying = track;
        StreamState.stream.src = api('tracks/' + StreamState.currentlyPlaying.id + '/stream');
        resolve();
    });
}

const _unload = () => {
    return new Promise((resolve, reject) => {
        StreamState.currentlyPlaying = null;
        StreamState.stream.src = "";
        resolve();
    });
}

const play = () => {
    return new Promise((resolve, reject) => {
        if(!StreamState.currentlyPlaying) {
            if(StreamState.playlist.length === 0) {
                resolve(false);
                return;
            }
            _load(StreamState.playlist[0]).then(resolve).catch(reject);
        }
        StreamState.stream.play();
        resolve(true);
    });
};

const scrub = (timestamp) => {
    return new Promise((resolve, reject) => {
        StreamState.stream.currentTime = timestamp;
    });
};


const pause = () => {
    return new Promise((resolve, reject) => {
        StreamState.stream.pause();
        resolve(false);
    });
};

const getTrack = () => StreamState.currentlyPlaying;

const getPlaylist = () => StreamState.playlist;

const getIndex = () => StreamState.currentIndex;

export default {
    init,
    load,
    play,
    pause,
    getTrack,
    getPlaylist,
    getIndex,
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    loadNext,
    loadPrev,
    loadFromIndex,
    moveDown,
    moveUp,
    scrub,
}
