import {
  LOAD_GALLERY,
  LOAD_GALLERY_SUCCESS,
  LOAD_GALLERY_ERROR,

  CHANGE_ACTIVE_GROUP,
  ADD_GROUP,
  REMOVE_GROUP,
  SET_NAME_GROUP,

  ADD_PHOTOS,
  REMOVE_PHOTO,
} from './constants';

export function loadGallery() {
  return {
    type: LOAD_GALLERY,
  };
}
export function loadGallerySuccess(gallery) {
  return {
    type: LOAD_GALLERY_SUCCESS,
    gallery,
  };
}
export function loadGalleryError(error) {
  return {
    type: LOAD_GALLERY_ERROR,
    error,
  };
}

export function changeActiveGroup(index) {
  return {
    type: CHANGE_ACTIVE_GROUP,
    index,
  };
}
export function addGroup(group) {
  return {
    type: ADD_GROUP,
    group,
  };
}
export function removeGroup(groupId) {
  return {
    type: REMOVE_GROUP,
    groupId,
  };
}
export function setNameGroup(groupId, name) {
  return {
    type: SET_NAME_GROUP,
    groupId,
    name,
  };
}

export function addPhotos(groupId, photos) {
  return {
    type: ADD_PHOTOS,
    groupId,
    photos,
  };
}
export function removePhoto(groupId, src) {
  return {
    type: REMOVE_PHOTO,
    groupId,
    src,
  };
}
