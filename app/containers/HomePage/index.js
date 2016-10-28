import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import { createStructuredSelector } from 'reselect';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Dropzone from 'react-dropzone';
import Gallery from 'react-photo-gallery';

import messages from './messages';

import styles from './styles.css';
import camera from './img/camera.svg';


export class HomePage extends React.Component {
  openRoute = (route) => {
    this.props.changeRoute(route);
  };
  selectTab = (newIndex, lastIndex) => {

  };
  onDrop = (files) => {

  };

  render() {
    return (
      <article className={styles.gallery}>
        <Helmet
          title={messages.title.defaultMessage}
          meta={[
            {
              name: messages.metaName.defaultMessage,
              content: messages.metaContent.defaultMessage
            },
          ]}
        />
        <Tabs className={styles.tabs} onSelect={this.selectTab} selectedIndex={0}>
          <TabList>
            <Tab className={styles.tabs__item}>All (10)</Tab>
            <Tab className={styles.tabs__item}>Interios (8)</Tab>
            <Tab className={styles.tabs__item}>On Desk (2)</Tab>
          </TabList>

          <TabPanel className={styles.group}>Group All</TabPanel>
          <TabPanel className={styles.group}>Group Interios</TabPanel>
          <TabPanel className={styles.group}>Group On Desk</TabPanel>
        </Tabs>

        <Dropzone className={styles.dropzone} onDrop={this.onDrop} accept='image/*' maxSize={33554432}>
          <img className={styles.dropzone__camera} src={camera} />
          <span className={styles.dropzone__message}>{messages.dragAndDrop.defaultMessage}</span>
        </Dropzone>
      </article>
    );
  }
}

HomePage.propTypes = {
  changeRoute: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({

});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
