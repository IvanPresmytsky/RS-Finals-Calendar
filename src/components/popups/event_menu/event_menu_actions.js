import * as popupsActions from '../popups_actions';

export function openEventMenu(popupOptions) {
  const openEventMenu = popupsActions.openPopup(popupsActions.EVENT_MENU, popupOptions);
  return openEventMenu;
}