import * as popupsActions from '../popups_actions';

export function openNotificationPopup(popupOptions) {
  const openNotificationPopup = popupsActions.openPopup(popupsActions.NOTIFICATION_POPUP, popupOptions);
  return openNotificationPopup;
}