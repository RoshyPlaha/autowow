export const AUTH_STATUS_CHANGED = 'authStatusChanged';

export const emitAuthStatusChange = (isLoggedIn: boolean) => {
  window.dispatchEvent(new CustomEvent(AUTH_STATUS_CHANGED, { detail: isLoggedIn }));
}; 