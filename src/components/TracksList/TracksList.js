import React, {Component} from 'react';
import { Track } from 'components';

export default class TracksList extends Component {

  render() {
    const styles = require('./TracksList.scss');
    return (
    <div className={styles['TracksList']}>
      <Track className={[styles['Track'], styles['Track--jumboSized']].join(' ')}/>
      <Track className={styles['Track']}/>
      <Track className={styles['Track']}/>
      <Track className={styles['Track']}/>
      <Track className={styles['Track']}/>
    </div>
    );
  }
}
