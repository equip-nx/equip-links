import { Authenticator } from 'remix-auth';
import { GoogleStrategy } from 'remix-auth-google';

import type { User } from '~/models/user.server';
import { findOrCreate } from '~/models/user.server';
import { sessionStorage } from '~/services/session.server';

export let authenticator = new Authenticator<User>(sessionStorage);

let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: `${process.env.APP_URL}/auth/google/callback`,
  },
  async ({ profile }) => {
    const { name, email, hd, picture } = profile._json;
    const allowedDomainsList = process.env.GOOGLE_ALLOW_DOMAINS;

    if (allowedDomainsList) {
      if (!allowedDomainsList.split(',').includes(hd)) {
        return null;
      }
    }

    return findOrCreate({
      name,
      email,
      picture,
      domain: hd,
    });
  }
);

// @ts-ignore
authenticator.use(googleStrategy);
