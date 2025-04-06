/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

import { LinkVisit } from '@prisma/client';

type Link = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  shortcode: string;
  shortUrl: string;
  longUrl: string;
  visits: number;
  error?: string;
  success?: boolean;
  linkVisits?: LinkVisit[];
};
