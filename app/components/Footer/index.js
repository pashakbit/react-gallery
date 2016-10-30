import React from 'react';

import messages from './messages';
import styles from './styles.css';
import { FormattedMessage } from 'react-intl';
import LocaleToggle from 'containers/LocaleToggle';

function Footer() {
  return (
    <footer className={styles.footer}>
      <FormattedMessage {...messages.licenseMessage} />
    </footer>
  );
}

export default Footer;
