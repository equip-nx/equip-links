import { createCookieSessionStorage } from '@remix-run/node';

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    path: '/',
    httpOnly: true,
    name: '_eqp_li',
    sameSite: 'lax',
    secrets: ['s3cr3t'],
    secure: process.env.NODE_ENV === 'production',
  },
});

export let { getSession, commitSession, destroySession } = sessionStorage;
