//  Checks if the email is valid
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//  Checks if current path is the active path
export function isActivePath(location, path) {
  return location?.pathname.split('/').pop() === path
    ? 'sidebar-item-active'
    : 'sidebar-item';
}
