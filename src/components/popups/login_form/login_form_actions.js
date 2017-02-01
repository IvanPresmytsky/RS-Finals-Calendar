import * as popupsActions from '../popups_actions';

export function openLoginForm(popupOptions) {
  const openLoginForm = popupsActions.openPopup(popupsActions.LOGIN_FORM, popupOptions);
  return openLoginForm;
}