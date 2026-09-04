# SDC Hotel Supply

Modern SDC Hotel Supply website built with React and Vite.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production website is written directly to `dist/`, with `dist/index.html` as its entry point.

## Deploy to Vercel

1. Import `https://github.com/IceCant/SDC` into Vercel.
2. Keep the detected framework as **Vite**.
3. Keep the build command as `npm run build`.
4. Keep the output directory as `dist`.
5. Deploy.

The included `vercel.json` preserves client-side navigation when a URL is loaded directly.
