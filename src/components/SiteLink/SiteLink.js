import React, {Component} from 'react';
const styles = require('./SiteLink.scss');

export default class SiteLink extends Component {
  render() {
    const { site } = this.props;
    return (
      <div className={[styles['root'], styles['site--' + site.site]].join(' ')}>
        <a href={site.url} target="_blank">
          <div className={styles.logo}></div>
          <div className={styles.text}>{site.text}</div>
        </a>
      </div>
    );
  }
}

SiteLink.propTypes = {
  site: React.PropTypes.object.isRequired,
};
