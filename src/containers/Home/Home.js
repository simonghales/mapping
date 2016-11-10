import React, { Component } from 'react';
import { SiteHeader, SiteFooter, TracksList } from 'components';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    return (
      <div className={styles['main']}>
        <Helmet title="Home"/>
        <div className={styles['main__header-wrapper']}>
          <SiteHeader />
        </div>
        <div className={styles['main__body-wrapper']}>
          <TracksList />
        </div>
        <div className={styles['main__footer-wrapper']}>
          <SiteFooter />
        </div>
      </div>
    );
  }
}
