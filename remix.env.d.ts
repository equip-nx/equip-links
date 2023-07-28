/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

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
};
