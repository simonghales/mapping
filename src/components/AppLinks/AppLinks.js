import React, {Component} from 'react';
const styles = require('./AppLinks.scss');

const BADGE_IOS = require('assets/apps/badge-apple.png');
const BADGE_ANDROID = require('assets/apps/badge-google.png');

export default class AppLinks extends Component {

  constructor(props) {
    super(props);
    this.renderApps = this.renderApps.bind(this);
  }

  renderApps() {
    let appsHtml = []; // eslint-disable-line prefer-const
    const { apps } = this.props;

    if (apps['ios']) {
      appsHtml.push(
        <div className={styles['link']} key={'ios'}>
          <a href={apps['ios']['url']} target="_blank">
            <img src={BADGE_IOS} alt="Download from the App Store"/>
          </a>
        </div>
      );
    }

    if (apps['android']) {
      appsHtml.push(
        <div className={styles['link']} key={'android'}>
          <a href={apps['android']['url']} target="_blank">
            <img src={BADGE_ANDROID} alt="Get it on Google Play"/>
          </a>
        </div>
      );
    }

    return appsHtml;
  }

  render() {
    return (
      <section className={styles['AppLinks']}>
        {this.renderApps()}
      </section>
    );
  }
}

AppLinks.propTypes = {
  apps: React.PropTypes.object.isRequired,
};
