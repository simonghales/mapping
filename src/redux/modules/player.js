
// import {List, Map, fromJS} from 'immutable'; // eslint-disable-line no-unused-vars

import { prepTracks } from 'utils/track';

const FETCH_TRACKS = 'wonder/player/FETCH_TRACKS';
const FETCH_TRACKS_FAILURE = 'wonder/player/FETCH_TRACKS_FAILURE';
const FETCH_TRACKS_SUCCESS = 'wonder/player/FETCH_TRACKS_SUCCESS';
const INITIAL_PLAY = 'wonder/player/INITIAL_PLAY';
const SET_CURRENT_TRACK = 'wonder/player/SET_CURRENT_TRACK';
const SET_QUEUED_TRACKS = 'wonder/player/SET_QUEUED_TRACKS';
const NEXT_TRACK = 'wonder/player/NEXT_TRACK';
const TOGGLE_PLAYING = 'wonder/player/TOGGLE_PLAYING';

export function fetchTracks() {
  console.log('fetching tracks yo...');
  return {
    types: [FETCH_TRACKS, FETCH_TRACKS_SUCCESS, FETCH_TRACKS_FAILURE],
    promise: (client) => client.get('/api/promochart/?genre=indie') // params not used, just shown as demonstration
  };
}

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
    payload: {
      track,
    }
  };
}

export function setQueuedTracks(tracks) {
  return {
    type: SET_QUEUED_TRACKS,
    payload: {
      tracks
    }
  };
}

export function togglePlaying() {
  return {
    type: TOGGLE_PLAYING
  };
}

function handleFetchTracks(state) {
  console.log('FETCH???');
  return {
    ...state,
    isFetchingTracks: true,
  };
}

function handleFetchTracksFailure(state, action) {
  console.log('FAILED TO FETCH...', action);
  return {
    ...state,
    isFetchingTracks: false,
    isFetchingTracksFailure: true,
  };
}

function handleFetchTracksSuccess(state, action) {
  console.log('SUCCESSFULLY MANAGED TO FETCH...', action);
  const { result } = action;
  const { chart } = result;
  const tracks = prepTracks(chart);
  return {
    ...state,
    isFetchingTracks: false,
    isFetchingTracksFailure: false,
    queuedTracks: tracks,
  };
}

function handleInitialStart(state) {
  const {queuedTracks} = state;
  if (!queuedTracks.length) return state;
  const firstTrack = queuedTracks[0];
  return {
    ...state,
    currentTrack: firstTrack,
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
    currentTrackIndex: nextTrackIndex,
    playing: true,
  };
}

function handleSetCurrentTrack(state, payload) {
  const {track} = payload;
  return {
    ...state,
    currentTrack: track,
    playing: true,
  };
}

function handleSetQueuedTracks(state, payload) {
  console.log('set queued tracks', payload);
  const {tracks} = payload;
  return {
    ...state,
    queuedTracks: tracks,
  };
}

function handleTogglePlaying(state) {
  return {
    ...state,
    playing: !state.playing,
  };
}

const ACTION_HANDLERS = {
  [FETCH_TRACKS]: (state) => handleFetchTracks(state),
  [FETCH_TRACKS_FAILURE]: (state, action) => handleFetchTracksFailure(state, action),
  [FETCH_TRACKS_SUCCESS]: (state, action) => handleFetchTracksSuccess(state, action),
  [INITIAL_PLAY]: (state) => handleInitialStart(state),
  [SET_CURRENT_TRACK]: (state, action) => handleSetCurrentTrack(state, action.payload),
  [SET_QUEUED_TRACKS]: (state, action) => handleSetQueuedTracks(state, action.payload),
  [NEXT_TRACK]: (state) => handleNextTrack(state),
  [TOGGLE_PLAYING]: (state) => handleTogglePlaying(state),
};

const initialState = {
  currentTrack: null,
  isFetchingTracks: false,
  isFetchingTracksFailure: false,
  playing: false,
  queuedTracks: [],
};

export default function reducer(state = initialState, action = {}) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
