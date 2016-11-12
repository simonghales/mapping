import React, { Component } from 'react';
import { SiteHeader, SiteFooter, TracksList } from 'components';
import Helmet from 'react-helmet';
import { fetchTracks } from 'redux/modules/player';
import { isLoaded, load as loadWidgets } from 'redux/modules/widgets';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([
  {
    promise: ({store: {dispatch, getState}}) => {
      if (!isLoaded(getState())) {
        return dispatch(loadWidgets());
      }
    }
  },
  {
    promise: ({store: {dispatch}}) => {
      return dispatch(fetchTracks());
    }
  },
])
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
