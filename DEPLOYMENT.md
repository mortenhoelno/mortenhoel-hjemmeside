# Deployment Guide

This website can be deployed to various platforms. Here's what you need to know:

## Environment Variables

### Required
- `DATABASE_URL` - MySQL/TiDB connection string
- `JWT_SECRET` - Secret key for session management

### Optional (has fallbacks)
- `VITE_APP_TITLE` - Website title (default: "Morten Hoel")
- `VITE_APP_LOGO` - Logo URL (default: "/favicon.png")

### Optional (Manus-specific, can be omitted)
- `VITE_APP_ID` - Manus OAuth app ID
- `OAUTH_SERVER_URL` - Manus OAuth server
- `VITE_OAUTH_PORTAL_URL` - Manus login portal
- `VITE_ANALYTICS_ENDPOINT` - Analytics endpoint
- `VITE_ANALYTICS_WEBSITE_ID` - Analytics website ID
- `BUILT_IN_FORGE_API_URL` - Manus API URL
- `BUILT_IN_FORGE_API_KEY` - Manus API key

## Deployment Platforms

### Vercel
1. Import repository from GitHub
2. Set environment variables in project settings
3. Deploy

### Netlify
1. Connect GitHub repository
2. Build command: `pnpm build`
3. Publish directory: `dist/public`
4. Set environment variables

### Railway/Render
1. Connect GitHub repository
2. Set environment variables
3. Deploy

## Database Setup

You'll need a MySQL-compatible database. Options:
- [PlanetScale](https://planetscale.com/) - Free tier available
- [Railway](https://railway.app/) - MySQL hosting
- [Neon](https://neon.tech/) - Postgres (requires schema changes)

## Notes

- Authentication features require OAuth configuration
- Admin panel requires database setup
- Newsletter and news features require database
- The website will work without authentication, but admin features will be disabled
