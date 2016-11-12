import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { SiteHeader, SiteFooter, TracksList } from 'components';
import Helmet from 'react-helmet';
import { fetchTracks } from 'redux/modules/player';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([
  {
    promise: ({store: {dispatch}}) => {
      return dispatch(fetchTracks());
    }
  },
])
@connect(
  state => ({player: state.player, starred: state.starred}),
  dispatch => bindActionCreators({fetchTracks}, dispatch))
export default class Home extends Component {

  constructor(props) {
    super(props);
    // const {fetchTracks} = this.props; // eslint-disable-line no-shadow
    // console.log('fetch tracks from home constructor...');
    // fetchTracks();
  }

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

Home.propTypes = {
  fetchTracks: React.PropTypes.func,
};
