import * as popupsActions from '../popups_actions';

export function openMessagePopup(popupOptions) {
  const openMessagePopup = popupsActions.openPopup(popupsActions.MESSAGE_POPUP, popupOptions);
  return openMessagePopup;
}