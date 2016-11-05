import React, {Component} from 'react';

export default class Track extends Component {

  render() {
    const styles = require('./Track.scss');
    const { className } = this.props;
    const trackClassName = [className, styles.Track].join(' ');
    return (
      <div className={trackClassName}>
        <div className={styles.image}>
          <img src="http://media.wonder.fm/media/photos/daniela-andrade.jpg.505x505_q85.jpg" alt="Track Image"/>
        </div>
        <div className={styles.ui}>
          <div className={styles.ui__centre}>
            <div className={styles.playIndicator}>
              >
            </div>
          </div>
          <div className={styles.ui__top}>
            <div className={styles.ui__top__left}>
              <div className={styles.chartPosition}>1</div>
            </div>
            <div className={styles.ui__top__right}>
              <div className={styles.starIndicator}>*</div>
            </div>
          </div>
          <div className={styles.ui__bottom}>
            <div className={styles.ui__bottom__left}>
              <div className={styles.trackTitle}>
                <a href="">Track Title</a>
              </div>
              <div className={styles.artistName}>
                <a href="">Artist Name</a>
              </div>
            </div>
            <div className={styles.ui__bottom__right}>
              <div className={styles.optionsIndicator}>:</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Track.propTypes = {
  className: React.PropTypes.string.isRequired
};
