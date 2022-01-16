// dark mode
export const SET_DARK_MODE = 'settings:SET_DARK_MODE';
export const SET_READING_HELP_ACTIVE = 'settings:SET_READING_HELP_ACTIVE';
export const SET_URL = 'settings:SET_URL';

export function setDarkMode(state: any) {
  return {
    type: SET_DARK_MODE,
    payload: state
  }
}

export function setUrlIp(state: any) {
  return {
    type: SET_URL,
    payload: state
  }
}

export function setReadingHelpActive(state: any) {
  return {
    type: SET_READING_HELP_ACTIVE,
    payload: state
  }
}
