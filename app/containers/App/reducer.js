import {
  LOAD_GALLERY,
  LOAD_GALLERY_SUCCESS,
  LOAD_GALLERY_ERROR,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  data: fromJS({
    user: {},
  }),
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_GALLERY:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_GALLERY_SUCCESS:
      return state
        .setIn(['data', 'user'], action.user)
        .set('loading', false);
    case LOAD_GALLERY_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
