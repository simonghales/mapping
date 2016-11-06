import React, {Component} from 'react';
import { Player, PlayerScrubber } from 'components';

export default class SiteHeader extends Component {

  render() {
    const styles = require('./SiteHeader.scss');
    return (
    <div className={styles['SiteHeader']}>
      <div>
        <PlayerScrubber />
      </div>
      <div>
        <div>
          <div className={styles['info']}>
            <div className={styles['nav']}>
              <div className={styles['icon']}></div>
            </div>
            <div className={styles['logo']}>
              <a href="">
                <div className={styles['icon']}></div>
              </a>
            </div>
            <div className={[styles['socialLink'], styles['socialLink--twitter']].join(' ')}>
              <a href="" target="_blank">
                <div className={styles['icon']}></div>
              </a>
            </div>
            <div className={[styles['socialLink'], styles['socialLink--soundcloud']].join(' ')}>
              <a href="" target="_blank">
                <div className={styles['icon']}></div>
              </a>
            </div>
          </div>
        </div>
        <div>
          <Player />
        </div>
      </div>
    </div>
    );
  }
}
