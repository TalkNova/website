Admin site
===========

Quick start

1. Copy `.env.example` from the main project root and set these variables (for admin-site):

```
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
ADMIN_API_KEY=replace-with-strong-random-key
MAIN_SITE_BASE=http://localhost:3000
SESSION_SECRET=change_me
```

2. Install and run:

```bash
cd admin-site
npm install
npm start
```

3. Open `http://localhost:4000/login` to sign in and manage posts. The admin-site forwards create/delete requests to the main site's admin API (`/api/admin/...`) using the `ADMIN_API_KEY`.

Security notes:
- Never commit real credentials. Use environment variables or a secrets manager.
- Use HTTPS and protect the admin host with IP allowlist or VPN in production.
