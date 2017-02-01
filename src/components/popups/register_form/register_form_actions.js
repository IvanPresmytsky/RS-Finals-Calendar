import * as popupsActions from '../popups_actions';

export function openRegisterForm(popupOptions) {
  const openRegisterForm = popupsActions.openPopup(popupsActions.REGISTER_FORM, popupOptions);
  return openRegisterForm;
}