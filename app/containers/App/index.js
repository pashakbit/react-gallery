import React from 'react';
import Helmet from 'react-helmet';

import Footer from 'components/Footer';

import styles from './styles.css';

function App(props) {
  return (
    <div className={styles.wrapper}>
      <Helmet
        titleTemplate="%s - SailWithMe"
        defaultTitle="SailWithMe"
        meta={[
          { name: 'SailWithMe', content: 'SailWithMe' },
        ]}
      />
      {React.Children.toArray(props.children)}
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
