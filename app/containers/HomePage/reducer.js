import { fromJS } from 'immutable';

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

const initialState = fromJS({
  loading: false,
  error: false,
  gallery: {
    access: true,
    indexActiveGroup: 0,
    groups: [
      {
        id: 'all',
        name: 'All',
        order: 0,
        photos: [
          {
            src: "img/1.jpg",
            aspectRatio: 1.77,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "img/1.jpg",
            },
          }, {
            src: "img/2.png",
            aspectRatio: 1.77,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "img/2.png",
            },
          }, {
            src: "img/3.jpg",
            aspectRatio: 1.77,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "img/3.jpg",
            },
          }, {
            src: "img/4.png",
            aspectRatio: 1.77,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "img/4.png",
            },
          }, {
            src: "img/5.png",
            aspectRatio: 1.77,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "img/5.png",
            },
          }, {
            src: "img/6.png",
            aspectRatio: 1.77,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "img/6.png",
            },
          }, {
            src: "img/8.png",
            aspectRatio: 1.77,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "img/8.png",
            },
          }, {
            src: "img/7.jpg",
            aspectRatio: 1.77,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "img/7.jpg",
            },
          },
        ],
      }, {
        id: 'external',
        name: 'External',
        order: 1,
        photos: [
          {
            src: "img/2.png",
            aspectRatio: 1.77,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "img/2.png",
            },
          }, {
            src: "img/1.jpg",
            aspectRatio: 1.77,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "img/1.jpg",
            },
          }, {
            src: "img/4.png",
            aspectRatio: 1.77,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "img/4.png",
            },
          }, {
            src: "img/6.png",
            aspectRatio: 1.77,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "img/6.png",
            },
          }, {
            src: "img/7.jpg",
            aspectRatio: 1.77,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "img/7.jpg",
            },
          },
        ],
      }, {
        id: 'interios',
        name: 'Interios',
        order: 2,
        photos: [
          {
            src: "img/3.jpg",
            aspectRatio: 1.77,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "img/3.jpg",
            },
          }, {
            src: "img/5.png",
            aspectRatio: 1.77,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "img/5.png",
            },
          }, {
            src: "img/8.png",
            aspectRatio: 1.77,
            width: 300,
            height: 170,
            lightboxImage: {
              src: "img/8.png",
            },
          },
        ],
      },
    ],
  }
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_GALLERY: {
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['gallery', 'access'], false);
    }

    case LOAD_GALLERY_SUCCESS: {
      return state
        .setIn(['gallery', 'access'], true)
        .set('gallery', action.gallery)
        .set('loading', false);
    }

    case LOAD_GALLERY_ERROR: {
      return state
        .set('error', action.error)
        .set('loading', false);
    }


    case CHANGE_ACTIVE_GROUP: {
      return state
        .setIn(['gallery', 'indexActiveGroup'], action.index);
    }

    case ADD_GROUP: {
      let groups = state.getIn(['gallery', 'groups']);

      return state
        .setIn(['gallery', 'groups'], groups.push(action.group));
    }

    case REMOVE_GROUP: {
      let groups = state.getIn(['gallery', 'groups']),
          groupIndex = groups.findIndex((group) => group.get('id') === action.groupId);

      return state
        .setIn(['gallery', 'groups'], groups.delete(groupIndex));
    }

    case SET_NAME_GROUP: {
      let groups = state.getIn(['gallery', 'groups']),
          groupIndex = groups.findIndex((group) => group.get('id') === action.groupId);

      return state
        .setIn(['gallery', 'groups', groupIndex, 'name'], action.name);
    }


    case ADD_PHOTOS: {
      let groups = state.getIn(['gallery', 'groups']),
          groupIndex = groups.findIndex((group) => group.get('id') === action.groupId),
          photos = state.getIn(['gallery', 'groups', groupIndex, 'photos']);

      let newPhotos = fromJS(action.photos.map((src) => {
        return {
          src: src.preview,
          aspectRatio: 1.77,
          width: 300,
          height: 170,
          lightboxImage: {
            src: src.preview,
          },
        };
      }));

      if (action.groupId !== 'all') {
        let groupAllIndex = groups.findIndex((group) => group.get('id') === 'all'),
            photosAll = state.getIn(['gallery', 'groups', groupAllIndex, 'photos']);

        return state
          .setIn(['gallery', 'groups', groupIndex, 'photos'], photos.concat(newPhotos))
          .setIn(['gallery', 'groups', groupAllIndex, 'photos'], photosAll.concat(newPhotos));
      } else {
        return state
          .setIn(['gallery', 'groups', groupIndex, 'photos'], photos.concat(newPhotos));
      }
    }

    case REMOVE_PHOTO: {
      let groups = state.getIn(['gallery', 'groups']),
          groupIndex = groups.findIndex((group) => group.get('id') === action.groupId),
          photos = state.getIn(['gallery', 'groups', groupIndex, 'photos']),
          photoIndex = photos.findIndex((photo) => photo.get('src') === action.src);

      if (action.groupId !== 'all') {
        let groupAllIndex = groups.findIndex((group) => group.get('id') === 'all'),
            photosAll = state.getIn(['gallery', 'groups', groupAllIndex, 'photos']),
            photoAllIndex = photosAll.findIndex((photo) => photo.get('src') === action.src);

        return state
          .setIn(['gallery', 'groups', groupIndex, 'photos'], photos.delete(photoIndex))
          .setIn(['gallery', 'groups', groupAllIndex, 'photos'], photosAll.delete(photoAllIndex));
      } else {
        return state
          .setIn(['gallery', 'groups', groupIndex, 'photos'], photos.delete(photoIndex));
      }
    }

    default:
      return state;
  }
}

export default homeReducer;
