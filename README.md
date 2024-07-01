# Next.js Starter Modified

This is a starter template for building [Next.js](https://nextjs.org/) applications using JavaScript. I've customized this template with my own files and added some features to follow a consistent format across all of my Next.js websites. By using this template, I can speed up my development process.

The template includes reusable components such as a Footer, Header, and Layout, which can be found in the Components folder. Additionally, I've installed the next-seo package to make it easier to optimize my website for search engines and social media platforms.

## Getting Started

To get started, clone this repository to your local machine:

```bash
git clone  https://github.com/muntasiraonik/nextjs-starter-modified
```

Then, navigate to the project directory and install the dependencies:

```bash
cd  nextjs-starter-modified
npm install
# or
yarn
# or
pnpm install
```

Before starting the development server, you'll need to rename `.env.local.example` to `.env.local` in the root directory of your project. Then, open the new `.env.local` file and replace the `NEXT_PUBLIC_Website_URL` with your website URL:

```bash
NEXT_PUBLIC_Website_URL=https://yourwebsite.com
```

Once the .env.local file is set up, you can start the development server:

```bash
npm run  dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
