import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setCurrentTrack} from 'redux/modules/player';
import { Track } from 'components';
import { prepTracks } from 'utils/track';
const EXAMPLE_TRACKS = require('../../data/example/chart.json').chart;
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
    const {currentTrack} = player;
    const trackProps = {
      currentTrack,
      setCurrentTrack,
    };
    return (
      tracks.map((trackMap, index) => {
        const track = trackMap;
        if (index === 0) {
          return (
              <Track className={[styles['Track'], styles['Track--jumboSized']].join(' ')}
                     trackData={track}
                     {...trackProps} />
          );
        }
        return (
          <Track className={styles['Track']}
                 trackData={track}
                 {...trackProps}/>
        );
      })
    );
  }
  render() {
    const tracks = prepTracks(EXAMPLE_TRACKS);
    return (
      <div className={styles['TracksList']}>
        {this.renderTracks(tracks)}
      </div>
    );
  }
}

TracksList.propTypes = {
  player: React.PropTypes.object.isRequired,
  setCurrentTrack: React.PropTypes.func.isRequired,
};

