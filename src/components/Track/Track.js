import React, {Component} from 'react';
import { getTrackPhotoUrl } from 'utils/track';

const classNames = require('classnames');

export default class Track extends Component {

  constructor(props) {
    super(props);
    this.handleSetCurrentTrack = this.handleSetCurrentTrack.bind(this);
  }

  handleSetCurrentTrack() {
    const {setCurrentTrack, trackData} = this.props;
    setCurrentTrack(trackData);
  }

  render() {
    const styles = require('./Track.scss');
    const {
      className,
      isPlaying,
      isSelected,
      trackData} = this.props;
    const {
      index: trackIndex,
      data: {
        title,
        artist: {
          name: artistName,
          photo_url: photoUrl,
          url: artistUrl
        },
        track: {
          url: trackUrl
        }
      }
    } = trackData;
    const chartPosition = trackIndex + 1;
    const convertedPhotoUrl = getTrackPhotoUrl(photoUrl, (chartPosition === 0));
    const trackClassName = classNames(
      className,
      styles['Track'],
      {
        [styles['Track--selected']]: isSelected,
        [styles['Track--playing']]: isPlaying,
      }
    );
    return (
      <div className={trackClassName} onClick={this.handleSetCurrentTrack}>
        <div className={styles['image']}>
          <img src={convertedPhotoUrl} alt="Track Image"/>
        </div>
        <div className={styles['ui']}>
          <div className={styles['ui__top']}>
            <div className={styles['ui__top__left']}>
              <div className={styles['chartPosition']}>{chartPosition}</div>
            </div>
            <div className={styles['ui__top__right']}>
              <div className={styles['starIndicator']}></div>
            </div>
          </div>
          <div className={styles['ui__bottom']}>
            <div className={styles['ui__bottom__left']}>
              <div className={styles['trackTitle']}>
                <a href={trackUrl} target="_blank">{title}</a>
              </div>
              <div className={styles['artistName']}>
                <a href={artistUrl} target="_blank">{artistName}</a>
              </div>
            </div>
            <div className={styles['ui__bottom__right']}>
              <div className={styles['options']}>
                <div className={styles['options__indicator']}></div>
                <ul className={styles['options__list']}>
                  <li className={styles['options__list__option']}>
                    Star Track
                  </li>
                  <li className={styles['options__list__divider']}></li>
                  <li className={styles['options__list__option']}>
                    Share
                  </li>
                  <li className={styles['options__list__divider']}></li>
                  <li className={styles['options__list__option']}>
                    More Like This
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles['ui__centre']}>
            <div className={styles['playIndicator']}></div>
          </div>
        </div>
      </div>
    );
  }
}

Track.propTypes = {
  className: React.PropTypes.string.isRequired,
  isPlaying: React.PropTypes.bool.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  setCurrentTrack: React.PropTypes.func.isRequired,
  trackData: React.PropTypes.object.isRequired,
};
