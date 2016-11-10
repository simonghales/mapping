import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {initialPlay, nextTrack, togglePlaying} from 'redux/modules/player';

@connect(
  state => ({player: state.player}),
  dispatch => bindActionCreators({initialPlay, nextTrack, togglePlaying}, dispatch))
export default class Player extends Component {

  constructor(props) {
    super(props);
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    const {initialPlay, player, togglePlaying} = this.props; // eslint-disable-line no-shadow
    const {currentTrack} = player;

    if (currentTrack) {
      togglePlaying();
    } else {
      initialPlay();
    }
  }

  render() {
    const styles = require('./Player.scss'); // initialPlay
    const {nextTrack, player} = this.props; // eslint-disable-line no-shadow
    console.log('whats on my player?', player);
    return (
      <div className={styles['Player']}>
        <div className={styles['info']}></div>
        <div className={styles['controls']}>
          <div className={[styles['btn'], styles['btn--star']].join(' ')}>
            <div className={styles['btnIcon']}></div>
          </div>
          <div className={[styles['btn'], styles['btn--share']].join(' ')}>
            <div className={styles['btnIcon']}></div>
          </div>
          <div className={[styles['btn'], styles['btn--toggle']].join(' ')} onClick={this.handleToggleClick}>
            <div className={styles['btnIcon']}></div>
          </div>
          <div className={[styles['btn'], styles['btn--skip']].join(' ')} onClick={nextTrack}>
            <div className={styles['btnIcon']}></div>
          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  initialPlay: React.PropTypes.func.isRequired,
  nextTrack: React.PropTypes.func.isRequired,
  player: React.PropTypes.object.isRequired,
  togglePlaying: React.PropTypes.func.isRequired,
};
