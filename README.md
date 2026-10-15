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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# totalpower

## Form email routing

The quote form routes new installation, sales, estimate, and quote requests to
`power@totalpowergenerators.com`, maintenance and service/repair requests to
`service@totalpowergenerators.com`, and general inquiries to
`Contact@totalpowergenerators.com`. Public contact links use the general address.

The hosting environment can override these defaults. When deploying, update or
remove old overrides:

```dotenv
SALES_EMAIL=power@totalpowergenerators.com
SERVICE_EMAIL=service@totalpowergenerators.com
HELLO_EMAIL=Contact@totalpowergenerators.com
```

`HELLO_EMAIL` remains the configuration key for general inquiries. Email delivery
also requires `RESEND_API_KEY` and a verified sender in `QUOTE_FROM_EMAIL`. Deploy
the updated code and environment settings to apply the changes to the live site;
no repository or ownership transfer is needed.

The separate builder inquiry form currently has no submission handler and does
not send email.
