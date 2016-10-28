import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import messages from './messages';
import { FormattedMessage } from 'react-intl';

export function NotFound(props) {
  return (
    <article>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <button onClick={() => props.dispatch(push('/'))}>
        <FormattedMessage {...messages.homeButton} />
      </button>
    </article>
  );
}

NotFound.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect()(NotFound);
