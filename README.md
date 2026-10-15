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

Quote and builder forms submit through `/api/quote` to FormSubmit. No Resend
account, API key, SMTP credentials, or Vercel email environment variables are
required. Recipients are fixed on the server:

- New installation and builder inquiries: power@totalpowergenerators.com
- Maintenance and service/repair: service@totalpowergenerators.com
- General inquiries: contact@totalpowergenerators.com

### Required activation before launch

1. Deploy this code to Vercel.
2. Submit a clearly labeled setup inquiry for each of the three destinations
   (New install, Maintenance, General / other).
3. Have each inbox owner click the activation link sent by FormSubmit. Check spam
   if necessary. This is required before that inbox can receive submissions.
4. Submit another test for each destination and a builder inquiry, and confirm
   receipt in the intended inbox. An API acceptance response alone is not proof
   of inbox delivery.

Visitors stay on the website. Provider failures display an error and preserve
their input for retry. FormSubmit processes submission contents and retains
submissions for 30 days per its documentation.

Documentation: https://formsubmit.co/ and https://formsubmit.co/documentation

Legacy RESEND_API_KEY, QUOTE_FROM_EMAIL, SALES_EMAIL, SERVICE_EMAIL, and HELLO_EMAIL
variables are no longer used and can be removed from Vercel.
