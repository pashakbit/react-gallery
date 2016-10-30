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

  changeActiveGroup,
  addGroup,
  removeGroup,
  setNameGroup,

  addPhotos,
  removePhoto,
} from './actions';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Dropzone from 'react-dropzone';
import Gallery from 'components/Gallery';

import messages from './messages';

import LoadingIndicator from 'components/LoadingIndicator';
import camera from 'img/camera.svg';
import styles from './styles.css';

Tabs.setUseDefaultStyles(false);


export class HomePage extends React.Component {
  onDrop = (files) => {
    this.props.addPhotos(
      this.props.gallery.get('groups').toJS()[this.props.gallery.get('indexActiveGroup')].id,
      files
    );
  };
  openRoute = (route) => {
    this.props.changeRoute(route);
  };
  selectTab = (newIndex, lastIndex) => {
    this.props.changeActiveGroup(newIndex);
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
    return (
      <Tab key={group.id} className={styles.tabs__item}>
        {group.name + ' (' + group.photos.length + ')'}
      </Tab>
    );
  };
  getTabPanel = (group) => {
    return (
      <TabPanel key={group.id} className={styles.group}>
        <Gallery
          className={styles.group__photos}
          childClass={styles.photo}
          deleteBtnClass={styles.photo__delete}
          groupId={group.id}
          removePhoto={this.props.removePhoto}
          photos={group.photos}
        />
      </TabPanel>
    );
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
        <Tabs className={styles.tabs} onSelect={this.selectTab} selectedIndex={this.props.gallery.get('indexActiveGroup')}>
          <TabList className={styles.tabs__list}>
            {groups.map(this.getTab)}
          </TabList>

          {groups.map(this.getTabPanel)}
        </Tabs>
      ));
      dropzone = (() => (
        <div className={styles.dropzone}>
          <Dropzone className={styles.dropzone__activeBlock} onDrop={this.onDrop} accept='image/*' maxSize={33554432}>
            <img className={styles.dropzone__camera} src={camera} alt={messages.dragAndDrop.defaultMessage} />
            <span className={styles.dropzone__message}>{messages.dragAndDrop.defaultMessage}</span>
          </Dropzone>
        </div>
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
  gallery: React.PropTypes.shape({
    access: React.PropTypes.bool,
    groups: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        order: React.PropTypes.number,
        photos: React.PropTypes.arrayOf(
          React.PropTypes.shape({
            src: React.PropTypes.string,
            aspectRatio: React.PropTypes.number,
            width: React.PropTypes.number,
            height: React.PropTypes.number,
            lightboxImage: React.PropTypes.shape({
              src: React.PropTypes.string,
            }),
          })
        ),
      })
    ),
  }),
};

export function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),

    loadGallery: () => dispatch(loadGallery()),
    loadGallerySuccess: (gallery) => dispatch(loadGallerySuccess(gallery)),
    loadGalleryError: (error) => dispatch(loadGalleryError(error)),

    changeActiveGroup: (index) => dispatch(changeActiveGroup(index)),
    addGroup: (group) => dispatch(addGroup(group)),
    removeGroup: (groupId) => dispatch(removeGroup(groupId)),
    setNameGroup: (groupId, name) => dispatch(setNameGroup(groupId, name)),

    addPhotos: (groupId, photos) => dispatch(addPhotos(groupId, photos)),
    removePhoto: (groupId, src) => dispatch(removePhoto(groupId, src)),

    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  gallery: selectGallery(),
  loading: selectLoading(),
  error: selectError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
