import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from 'utils/request';

import { LOAD_GALLERY } from 'containers/HomePage/constants';
import { loadGallerySuccess, loadGalleryError } from 'containers/HomePage/actions';
import { selectGallery } from 'containers/HomePage/selectors';


export function* getGallery() {
  // const requestURL = 'https://our_server.for/data/with/gallery';
  // const response = yield call(request, requestURL);

  const response = {};
  response.gallery = yield select(selectGallery());

  if (!response.err) {
    yield put(loadGallerySuccess(response.gallery));
  } else {
    yield put(loadGalleryError(response.err));
  }
}

export function* getGalleryWatcher() {
  yield fork(takeLatest, LOAD_GALLERY, getGallery);
}

export function* galleryData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getGalleryWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  galleryData,
];
