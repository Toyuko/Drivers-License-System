This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Dokploy (Nixpacks + MySQL)

The app is configured for deployment on [Dokploy](https://dokploy.com) using **Nixpacks** with a **MySQL** database.

1. **Create a MySQL database** in Dokploy (or use an external MySQL instance).
2. **Create a new Application** in Dokploy, connect your repo, and set:
   - **Build type**: Nixpacks
   - **Build path**: `web` (if this app lives in the `web` folder of the repo)
3. **Environment variables** (required at runtime):
   - `DATABASE_URL` — MySQL (or MariaDB) connection string, e.g.  
     `mysql://USER:PASSWORD@HOST:3306/DATABASE`  
     (The app also accepts `mariadb://...`.)
4. Deploy. The build runs `npm ci` and `npm run build`; on start it runs `prisma migrate deploy` then `next start`.

Optional: run the seed once after first deploy (e.g. via Dokploy one-off command or locally with `DATABASE_URL` set):

```bash
cd web && npm run db:seed
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
