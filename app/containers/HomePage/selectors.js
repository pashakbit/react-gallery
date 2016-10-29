import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

const selectGallery = () => createSelector(
  selectHome(),
  (globalState) => globalState.get('gallery')
);

const selectLoading = () => createSelector(
  selectHome(),
  (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
  selectHome(),
  (globalState) => globalState.get('error')
);

export {
  selectGallery,
  selectLoading,
  selectError,
};
