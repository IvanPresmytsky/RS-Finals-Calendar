import * as popupsActions from '../popups_actions';

export function openEditUserForm(popupOptions) {
  const openEditUserForm = popupsActions.openPopup(popupsActions.EDIT_USER_FORM, popupOptions);
  return openEditUserForm;
}