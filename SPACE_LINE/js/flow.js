export function resolveRoute(route, { hasProfile, hasRecord, pending }) {
  if (!['form', 'picker', 'planet', 'overview', 'message', 'poster'].includes(route)) route = 'form';
  if (hasRecord) {
    if (pending) return route === 'form' ? 'form' : 'message';
    return ['picker', 'planet', 'message'].includes(route) ? 'poster' : route;
  }
  if (['message', 'poster'].includes(route)) return hasProfile ? 'picker' : 'form';
  if (!hasProfile && ['picker', 'planet', 'overview'].includes(route)) return 'form';
  return route;
}
