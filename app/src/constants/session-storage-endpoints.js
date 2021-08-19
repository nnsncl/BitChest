export const SESSION_TOKEN_COOKIE_KEY = 'SESSION_TOKEN';
export const USER_ID_COOKIE_KEY = 'USER_ID';
export const getSessionTokenCookie = sessionStorage.getItem(SESSION_TOKEN_COOKIE_KEY);
export const getUserIDCookie = sessionStorage.getItem(USER_ID_COOKIE_KEY);