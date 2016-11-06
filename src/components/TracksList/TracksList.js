import React, {Component} from 'react';
import { Track } from 'components';
import { prepTracks } from 'utils/track';
const EXAMPLE_TRACKS = require('../../data/example/chart.json').chart;
const styles = require('./TracksList.scss');

export default class TracksList extends Component {
  renderTracks(tracks) {
    return (
      tracks.map((trackMap, index) => {
        const track = trackMap;
        if (index === 0) {
          return (
              <Track className={[styles['Track'], styles['Track--jumboSized']].join(' ')} trackData={track}/>
          );
        }
        return (
          <Track className={styles['Track']} trackData={track} trackChartPosition={index + 1}/>
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
