import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setCurrentTrack} from 'redux/modules/player';
import { Track } from 'components';

const classNames = require('classnames');
const styles = require('./TracksList.scss');

@connect(
  state => ({player: state.player}),
  dispatch => bindActionCreators({setCurrentTrack}, dispatch))
export default class TracksList extends Component {
  constructor(props) {
    super(props);
    this.renderTracks = this.renderTracks.bind(this);
  }
  renderTracks(tracks) {
    const {player, setCurrentTrack} = this.props; // eslint-disable-line no-shadow
    const {
      playing: playerIsPlaying
    } = player;
    const {currentTrack} = player;
    const trackProps = {
      setCurrentTrack,
    };
    return (
      tracks.map((trackMap, index) => {
        const track = trackMap;
        const isJumbo = (index === 0);
        const isSelected = (currentTrack) ? (currentTrack && (track.index === currentTrack.index)) : false;
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
};

