import * as popupsActions from '../popups_actions';

export function openAddEventForm(popupOptions) {
  const openAddEventPopup = popupsActions.openPopup(popupsActions.ADD_EVENT_FORM, popupOptions);
  return openAddEventPopup;
}
