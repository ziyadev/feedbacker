import { stackMiddlewares } from './middlewares/stackHandler';
import { withUser } from './middlewares/withUser';
import { withWorkspace } from './middlewares/withWorkspace';

const middlewares = [withUser, withWorkspace];
export default stackMiddlewares(middlewares);
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
