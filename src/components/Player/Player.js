import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {initialPlay, nextTrack, togglePlaying} from 'redux/modules/player';
import {starTrack, unstarTrack} from 'redux/modules/starred';
import {isTrackStarred} from 'utils/track';
const classNames = require('classnames');
const styles = require('./Player.scss');

@connect(
  state => ({player: state.player, starred: state.starred}),
  dispatch => bindActionCreators({initialPlay, nextTrack, starTrack, unstarTrack, togglePlaying}, dispatch))
export default class Player extends Component {

  constructor(props) {
    super(props);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleNextTrack = this.handleNextTrack.bind(this);
    this.handleStarTrack = this.handleStarTrack.bind(this);
    this.handleStarTrackClick = this.handleStarTrackClick.bind(this);
    this.isStarred = this.isStarred.bind(this);
    this.isTrackSelected = this.isTrackSelected.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
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

  handleNextTrack() {
    if (!this.isTrackSelected()) return;
    const {nextTrack} = this.props; // eslint-disable-line no-shadow
    nextTrack();
  }

  handleStarTrack() {
    const {player, starTrack} = this.props; // eslint-disable-line no-shadow
    const {currentTrack} = player;
    starTrack(currentTrack);
    console.log('starrr');
  }

  handleStarTrackClick() {
    if (this.isStarred()) {
      this.handleUnstarTrack();
    } else {
      this.handleStarTrack();
    }
  }

  handleUnstarTrack() {
    const {player, unstarTrack} = this.props; // eslint-disable-line no-shadow
    const {currentTrack} = player;
    unstarTrack(currentTrack);
    console.log('unstarrr');
  }

  isStarred() {
    const {player, starred} = this.props;
    const {currentTrack} = player;
    if (!this.isTrackSelected()) return false;
    const {starredTracks} = starred;
    return isTrackStarred(currentTrack, starredTracks);
  }

  isTrackSelected() {
    const {player} = this.props;
    const {currentTrack} = player;
    return currentTrack ? true : false;
  }

  renderInfo() {
    const {player} = this.props;
    const {currentTrack} = player;

    if (!currentTrack) return '';

    const {
      data: {
        title,
        artist: {
          name: artistName,
          url: artistUrl
        },
        track: {
          url: trackUrl
        }
      }
    } = currentTrack;

    return (
      <h3 className={styles['info__text']}>
        <a className={styles['info__text__title']} href={trackUrl} target="_blank">{title}</a>
        <span className={styles['info__text__divider']}></span>
        <a className={styles['info__text__artist']} href={artistUrl} target="_blank">{artistName}</a>
      </h3>
    );
  }

  render() {
    const {player} = this.props;
    const {
      playing: isPlaying
    } = player;
    const isStarred = this.isStarred();
    console.log('is starred?', isStarred);
    const trackIsSelected = this.isTrackSelected();
    const rootClasses = classNames(
      styles['Player'],
      {
        [styles['state--empty']]: !trackIsSelected,
        [styles['state--playing']]: isPlaying,
        [styles['state--starred']]: isStarred,
        [styles['state--disabled']]: !trackIsSelected
      }
    );

    return (
      <div className={rootClasses}>
        <div className={styles['info']}>
          {this.renderInfo()}
        </div>
        <div className={styles['controls']}>
          <div className={[styles['btn'], styles['btn--star']].join(' ')} onClick={this.handleStarTrackClick}>
            <div className={styles['btnIcon']}></div>
          </div>
          <div className={[styles['btn'], styles['btn--share']].join(' ')}>
            <div className={styles['btnIcon']}></div>
          </div>
          <div className={[styles['btn'], styles['btn--toggle']].join(' ')} onClick={this.handleToggleClick}>
            <div className={styles['btnIcon']}></div>
          </div>
          <div className={[styles['btn'], styles['btn--skip']].join(' ')} onClick={this.handleNextTrack}>
            <div className={styles['btnIcon']}></div>
          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  initialPlay: React.PropTypes.func,
  nextTrack: React.PropTypes.func,
  player: React.PropTypes.object,
  starred: React.PropTypes.object,
  starTrack: React.PropTypes.func,
  unstarTrack: React.PropTypes.func,
  togglePlaying: React.PropTypes.func,
};
