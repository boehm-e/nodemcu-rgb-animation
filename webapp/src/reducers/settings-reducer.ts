import {
  SET_DARK_MODE,
  SET_READING_HELP_ACTIVE,
} from '../actions/settings-actions';

export default function settingsReducer(state = {}, data: any) {
  var new_state;
  const type: any = data.type;
  const payload: any = data.payload;

  switch (type) {
    case SET_DARK_MODE:
      return {
        ...state,
        darkMode: payload
      }
    case SET_READING_HELP_ACTIVE:
      return {
        ...state,
        readingHelpActive: payload
      }
      break
    default:
      return state;
  }
}

export function getIsDarkMode(state:any) {
  return state.settingsReducer.darkMode;
}

export function getIsReadingHelpActive(state:any) {
  return state.settingsReducer.readingHelpActive;
}

