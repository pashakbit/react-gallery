import { fromJS } from 'immutable';

import {
  LOAD_GALLERY,
  LOAD_GALLERY_SUCCESS,
  LOAD_GALLERY_ERROR,

  ADD_GROUP,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  gallery: {
    access: true,
    groups: [
      {
        id: 'all',
        name: 'All',
        order: 0,
        photos: [
          {
            src: "./img/1.jpg",
            aspectRatio: 0.57,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "./img/1.jpg",
            },
          },
        ],
      }, {
        id: 'external',
        name: 'External',
        order: 1,
        photos: [
          {
            src: "./img/2.png",
            aspectRatio: 0.57,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "./img/2.png",
            },
          },
        ],
      }, {
        id: 'interios',
        name: 'Interios',
        order: 2,
        photos: [
          {
            src: "./img/3.jpg",
            aspectRatio: 0.57,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "./img/3.jpg",
            },
          },
        ],
      },
    ],
  }
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_GALLERY:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['gallery', 'access'], false);
    case LOAD_GALLERY_SUCCESS:
      return state
        .setIn(['gallery', 'access'], true)
        .set('gallery', action.gallery)
        .set('loading', false);
    case LOAD_GALLERY_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);

    case ADD_GROUP:
      return state
        .setIn(['gallery', 'groups'], (arr) => {
          arr.push(action.newGroup);
        });
    default:
      return state;
  }
}

export default homeReducer;
