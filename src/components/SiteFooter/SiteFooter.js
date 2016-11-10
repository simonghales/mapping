import React, {Component} from 'react';
import soundcloudLogo from 'assets/soundcloud/soundcloud_black.png';

export default class SiteFooter extends Component {

  render() {
    const styles = require('./SiteFooter.scss');
    return (
      <footer className={styles['SiteFooter']}>
        <ul className={styles['list']}>
          <li>
            <a href="">
              <img src={soundcloudLogo} alt="Soundcloud Logo"/>
            </a>
          </li>
          <li>
            Soundcloud Connect
          </li>
          <li>
            Twitter Follow
          </li>
          <li>
            Hydric Media
          </li>
        </ul>
      </footer>
    );
  }
}
