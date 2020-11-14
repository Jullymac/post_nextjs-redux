import { USER_SETTINGS_UPDATE_LANGUAGE } from "../";

export const settingsUpdateLang = (lang) => ({
  type: USER_SETTINGS_UPDATE_LANGUAGE,
  payload: lang,
});
