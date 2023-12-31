import {
  withMiddlewareAuthRequired,
  getSession,
} from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

export const config = {
  matcher: ['/profile', '/chat/:id*'],
};
