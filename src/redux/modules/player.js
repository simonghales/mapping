
// import {List, Map, fromJS} from 'immutable'; // eslint-disable-line no-unused-vars

const INITIAL_PLAY = 'wonder/player/INITIAL_PLAY';
const SET_CURRENT_TRACK = 'wonder/player/SET_CURRENT_TRACK';
const SET_QUEUED_TRACKS = 'wonder/player/SET_QUEUED_TRACKS';
const NEXT_TRACK = 'wonder/player/NEXT_TRACK';
const TOGGLE_PLAYING = 'wonder/player/TOGGLE_PLAYING';

export function initialPlay() {
  return {
    type: INITIAL_PLAY
  };
}

export function nextTrack() {
  return {
    type: NEXT_TRACK
  };
}

export function setCurrentTrack(track) {
  return {
    type: SET_CURRENT_TRACK,
    playload: {
      track
    }
  };
}

export function setQueuedTracks(tracks) {
  return {
    type: SET_QUEUED_TRACKS,
    playload: {
      tracks
    }
  };
}

export function togglePlaying() {
  return {
    type: TOGGLE_PLAYING
  };
}

function handleInitialStart(state) {
  console.log('handle initial start');
  return {
    ...state,
    playing: true
  };
}

function handleNextTrack(state) {
  const {currentTrack, queuedTracks} = state;

  if (!currentTrack) return state;

  const currentTrackIndex = currentTrack.index;
  let nextTrackIndex = 0;

  if (currentTrackIndex < (queuedTracks.length - 1)) {
    nextTrackIndex = currentTrackIndex + 1;
  }

  const nextSelectedTrack = queuedTracks[nextTrackIndex];

  return {
    ...state,
    currentTrack: nextSelectedTrack,
    playing: true
  };
}

function handleSetCurrentTrack(state, payload) {
  console.log('set current track', payload);
  const {track} = payload;
  return {
    ...state,
    currentTrack: track
  };
}

function handleSetQueuedTracks(state, payload) {
  console.log('set queued tracks', payload);
  const {tracks} = payload;
  return {
    ...state,
    currentTrack: tracks
  };
}

function handleTogglePlaying(state) {
  console.log('toggle playing state', state);
  return {
    ...state,
    playing: !state.playing
  };
}

const ACTION_HANDLERS = {
  [INITIAL_PLAY]: (state) => handleInitialStart(state),
  [SET_CURRENT_TRACK]: (state, action) => handleSetCurrentTrack(state, action.payload),
  [SET_QUEUED_TRACKS]: (state, action) => handleSetQueuedTracks(state, action.payload),
  [NEXT_TRACK]: (state) => handleNextTrack(state),
  [TOGGLE_PLAYING]: (state) => handleTogglePlaying(state),
};

const initialState = {
  currentTrack: null,
  queuedTracks: [],
  playing: false,
};

export default function reducer(state = initialState, action = {}) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
