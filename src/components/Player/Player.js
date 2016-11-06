import React, {Component} from 'react';

export default class Player extends Component {

  render() {
    const styles = require('./Player.scss');
    return (
      <div className={styles['Player']}>
        <div className={styles['info']}></div>
        <div className={styles['controls']}>
          <div className={[styles['btn'], styles['btn--star']].join(' ')}>
            <div className={styles['btnIcon']}></div>
          </div>
          <div className={[styles['btn'], styles['btn--share']].join(' ')}>
            <div className={styles['btnIcon']}></div>
          </div>
          <div className={[styles['btn'], styles['btn--toggle']].join(' ')}>
            <div className={styles['btnIcon']}></div>
          </div>
          <div className={[styles['btn'], styles['btn--skip']].join(' ')}>
            <div className={styles['btnIcon']}></div>
          </div>
        </div>
      </div>
    );
  }
}
