export function shouldUseFullLayout(pathname: string): boolean {
  const excludedRoutes = ['/lab/dashboard'];

  return !excludedRoutes.some((route) => pathname.startsWith(route));
}

export function getPathnameFromParams(params: {
  [key: string]: string;
}): string {
  const segments = Object.values(params);
  return '/' + segments.join('/');
}
