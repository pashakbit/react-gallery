import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import {
  selectGallery,
  selectLoading,
  selectError,
} from './selectors';

import {
  loadGallery,
  loadGallerySuccess,
  loadGalleryError,

  addGroup,
} from './actions';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Dropzone from 'react-dropzone';
import Gallery from 'react-photo-gallery';

import messages from './messages';

import LoadingIndicator from 'components/LoadingIndicator';
import camera from './img/camera.svg';
import styles from './styles.css';


export class HomePage extends React.Component {
  onDrop = (files) => {

  };
  openRoute = (route) => {
    this.props.changeRoute(route);
  };
  selectTab = (newIndex, lastIndex) => {

  };
  getGroups = (listGroups) => {
    let groups = [],
        size = listGroups.size;

    for (let i = 0; i < size; i++) {
      groups.push(listGroups.get(i));
    }

    return groups;
  };
  getTab = (group) => {
    return <Tab key={group.id} className={styles.tabs__item}>{group.name + ' (' + group.photos.length + ')'}</Tab>
  };
  getTabPanel = (group) => {
    return <TabPanel key={group.id} className={styles.group}>{'Group ' + group.name}</TabPanel>
  };

  render() {
    let content = false,
        tabs = false,
        dropzone = false;

    if (this.props.loading) {
      content = (() => <LoadingIndicator />);
    } else if (this.props.error !== false) {
      content = (() => <h3>{'Something went wrong, please try again!'}</h3>);
    } else if (this.props.gallery.access !== false) {
      let groups = this.props.gallery.get('groups').toJS().sort((group1, group2) => {
        return group1.order - group2.order;
      });

      tabs = (() => (
          <Tabs className={styles.tabs} onSelect={this.selectTab} selectedIndex={0}>
            <TabList>
              {groups.map(this.getTab)}
            </TabList>

            {groups.map(this.getTabPanel)}
          </Tabs>
      ));
      dropzone = (() => (
          <Dropzone className={styles.dropzone} onDrop={this.onDrop} accept='image/*' maxSize={33554432}>
            <img className={styles.dropzone__camera} src={camera} />
            <span className={styles.dropzone__message}>{messages.dragAndDrop.defaultMessage}</span>
          </Dropzone>
      ));
    }

    return (
      <article className={styles.gallery}>
        <Helmet
          title={messages.title.defaultMessage}
          meta={
            [
              {
                name: messages.metaName.defaultMessage,
                content: messages.metaContent.defaultMessage
              },
            ]
          }
        />

        {content ? content() : ''}
        {tabs ? tabs() : ''}
        {dropzone ? dropzone() : ''}
      </article>
    );
  }
}

HomePage.propTypes = {
  changeRoute: React.PropTypes.func,
  // gallery: React.PropTypes.shape({
  //   access: React.PropTypes.bool
  // }),
};

export function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    addGroup: (group) => dispatch(addGroup(group)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  gallery: selectGallery(),
  loading: selectLoading(),
  error: selectError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
