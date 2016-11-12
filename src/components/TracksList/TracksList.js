import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setCurrentTrack, togglePlaying} from 'redux/modules/player';
import {starTrack, unstarTrack} from 'redux/modules/starred';
import { Track } from 'components';
import {isTrackStarred} from 'utils/track';

const classNames = require('classnames');
const styles = require('./TracksList.scss');

@connect(
  state => ({
    player: state.player,
    starred: state.starred,
  }),
  dispatch => bindActionCreators({setCurrentTrack, starTrack, togglePlaying, unstarTrack}, dispatch))
export default class TracksList extends Component {
  constructor(props) {
    super(props);
    this.renderTracks = this.renderTracks.bind(this);
  }
  renderTracks(tracks) {
    const {
      player,
      setCurrentTrack, // eslint-disable-line no-shadow
      starred,
      starTrack, // eslint-disable-line no-shadow
      togglePlaying, // eslint-disable-line no-shadow
      unstarTrack, // eslint-disable-line no-shadow
    } = this.props; // eslint-disable-line no-shadow
    const {
      playing: playerIsPlaying
    } = player;
    const {currentTrack} = player;
    const {starredTracks} = starred;
    const trackProps = {
      setCurrentTrack,
      starTrack,
      togglePlaying,
      unstarTrack,
    };
    return (
      tracks.map((trackMap, index) => {
        const track = trackMap;
        const isJumbo = (index === 0);
        const isSelected = (currentTrack) ? (currentTrack && (track.index === currentTrack.index)) : false;
        const isStarred = isTrackStarred(track, starredTracks);
        const isPlaying = (isSelected && playerIsPlaying);
        const trackClassName = classNames(
          styles['Track'],
          {
            [styles['Track--jumboSized']]: isJumbo
          }
        );
        return (
          <Track className={trackClassName}
                 trackData={track}
                 isPlaying={isPlaying}
                 isSelected={isSelected}
                 isStarred={isStarred}
                 {...trackProps}/>
        );
      })
    );
  }
  render() {
    const {player} = this.props;
    const {queuedTracks: tracks} = player;
    return (
      <div className={styles['TracksList']}>
        {this.renderTracks(tracks)}
      </div>
    );
  }
}

TracksList.propTypes = {
  player: React.PropTypes.object,
  setCurrentTrack: React.PropTypes.func,
  starred: React.PropTypes.object,
  starTrack: React.PropTypes.func,
  togglePlaying: React.PropTypes.func,
  unstarTrack: React.PropTypes.func,
};

