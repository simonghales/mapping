import React, {Component} from 'react';
import { APP_LINKS } from '../../constants/apps';
import { HYDRIC_LINK, SITE_LINKS } from '../../constants/sites';
import {AppLinks, SiteLink} from 'components';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.renderAppLinks = this.renderAppLinks.bind(this);
    this.renderSiteLinks = this.renderSiteLinks.bind(this);
  }

  // Render

  renderAppLinks() {
    let appLinks = '';

    if (APP_LINKS.apps) {
      appLinks = <AppLinks apps={APP_LINKS} />;
    }

    return appLinks;
  }

  renderSiteLinks() {
    let siteLinks = []; // eslint-disable-line prefer-const

    for (let index = 0, len = SITE_LINKS.links.length; index < len; index++) {
      const site = SITE_LINKS.links[index];
      siteLinks.push(<SiteLink site={site} key={index} />);
    }

    return siteLinks;
  }

  render() {
    const styles = require('./Sidebar.scss');
    return (
      <div className={styles['Sidebar']}>
        <section className={styles['siteLinks']}>
          {this.renderSiteLinks()}
        </section>
        <section className={styles['extraLinks']}>
          <div className={[styles['link'], styles['link--starred']].join(' ')}>
            <a href="">
              <span className={styles['icon-wrapper']}>
                  <span className={styles['icon']}></span>
              </span>
              <span className={styles['text']}>Starred Tracks</span>
            </a>
          </div>
          <div className={[styles['link'], styles['link--advanced']].join(' ')}>
            <a href="">
              <span className={styles['icon-wrapper']}>
                  <span className={styles['icon']}></span>
              </span>
              <span className={styles['text']}>Advanced</span>
            </a>
          </div>
        </section>
        {this.renderAppLinks()}
        <div className={styles['creatorLogo']}>
          <a href={HYDRIC_LINK} target="_blank"></a>
        </div>
      </div>
    );
  }
}
