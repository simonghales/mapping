
const SET_STARRED_TRACKS = 'wonder/starred/SET_STARRED_TRACKS';
const STAR_TRACK = 'wonder/starred/STAR_TRACK';
const UNSTAR_TRACK = 'wonder/starred/UNSTAR_TRACK';

export function setStarredTracks(tracks) {
  return {
    type: SET_STARRED_TRACKS,
    payload: {
      tracks
    }
  };
}

export function starTrack(track) {
  return {
    type: STAR_TRACK,
    payload: {
      track
    }
  };
}

export function unstarTrack(track) {
  return {
    type: UNSTAR_TRACK,
    payload: {
      track
    }
  };
}

function handleSetStarredTracks(state, payload) {
  const {tracks} = payload;
  return {
    ...state,
    starredTracks: tracks
  };
}

function handleStarTrack(state, payload) {
  const {track} = payload;
  console.log('star track', track, state);
  const {
    data: {
      track: {
        track_id: trackId
      }
    }
  } = track;
  state.starredTracks[trackId] = track; // todo - STOP MUTATING
  return state;
}

function handleUnstarTrack(state, payload) {
  const {track} = payload;
  console.log('unstar track', track, state);
  const {
    data: {
      track: {
        track_id: trackId
      }
    }
  } = track;
  delete state.starredTracks[trackId]; // todo - STOP MUTATING
  return state;
}

const ACTION_HANDLERS = {
  [SET_STARRED_TRACKS]: (state, action) => handleSetStarredTracks(state, action.payload),
  [STAR_TRACK]: (state, action) => handleStarTrack(state, action.payload),
  [UNSTAR_TRACK]: (state, action) => handleUnstarTrack(state, action.payload),
};

const initialState = {
  starredTracks: {},
};

export default function reducer(state = initialState, action = {}) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
