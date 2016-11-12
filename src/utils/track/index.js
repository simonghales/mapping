
import { TRACK_PHOTO_URL_MEDIUM, TRACK_PHOTO_URL_LARGE } from '../../constants/track';

export function prepTracks(tracks) {
  return tracks.map((track, index) => {
    const preppedTrack = {
      index: index,
      data: track
    };
    return preppedTrack;
  });
}

export function getTrackPhotoUrl(photoUrl, large = false) {
  if (large) return photoUrl + TRACK_PHOTO_URL_LARGE;
  return photoUrl + TRACK_PHOTO_URL_MEDIUM;
}

export function isTrackStarred(track, starredTracks) {
  if (!track || !starredTracks) return false;
  const {
    data: {
      track: {
        track_id: trackId
      }
    }
  } = track;
  return starredTracks[trackId] ? true : false;
}
