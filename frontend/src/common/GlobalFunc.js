export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isActivePath(location, path) {
  return location?.pathname.split('/').pop() === path
    ? 'sidebar-item-active'
    : 'sidebar-item';
}
