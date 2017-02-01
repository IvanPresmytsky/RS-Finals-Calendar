import * as popupsActions from '../popups_actions';

export function openDeleteUserPopup(popupOptions) {
  const openDeleteUserPopup = popupsActions.openPopup(popupsActions.DELETE_USER_POPUP, popupOptions);
  return openDeleteUserPopup;
}