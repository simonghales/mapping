import React, {Component} from 'react';

export default class <%= pascalEntityName %> extends Component {

  render() {
    const styles = require('./<%= pascalEntityName %>.scss');
    return (
      <div className={styles['<%= pascalEntityName %>']}>
        <%= pascalEntityName %>
      </div>
    );
  }
}
