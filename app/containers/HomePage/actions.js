import {
  LOAD_GALLERY,
  LOAD_GALLERY_SUCCESS,
  LOAD_GALLERY_ERROR,

  ADD_GROUP,
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

export function addGroup(newGroup) {
  return {
    type: ADD_GROUP,
    newGroup,
  };
}
