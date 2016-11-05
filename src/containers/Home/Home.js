import React, { Component } from 'react';
import { TracksList } from 'components';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div>
          <section>
            <TracksList />
          </section>
        </div>
      </div>
    );
  }
}
