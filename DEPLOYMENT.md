# Girivah - Deployment Guide

Complete guide to deploying Girivah.com to production.

## 🚀 Quick Deploy to Vercel

Girivah is optimized for Vercel deployment. This is the recommended approach.

### Prerequisites
- GitHub/GitLab account
- Vercel account (free tier available)
- Project pushed to Git repository

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial Girivah deployment"
git remote add origin https://github.com/yourusername/girivah.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Connect your GitHub account
5. Select the girivah repository
6. Click "Import"

### Step 3: Configure Environment Variables

Vercel will auto-detect Next.js configuration. Set these variables in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SITE_URL=https://girivah.com
```

### Step 4: Deploy

Click "Deploy" - Vercel handles everything automatically.

---

## 📦 Manual Deployment

### Deploy to Other Platforms

#### **Netlify**

1. Build: `npm run build`
2. Publish directory: `.next`
3. Connect GitHub → auto-deploys on push

#### **AWS Amplify**

```bash
npm run build
amplify deploy
```

#### **Docker**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

Deploy using:
```bash
docker build -t girivah .
docker run -p 3000:3000 girivah
```

---

## 🔧 Pre-Deployment Checklist

### Code Quality
- [ ] Run `npm run build` locally - no errors
- [ ] Test all links and CTAs
- [ ] Check mobile responsiveness
- [ ] Validate all images load
- [ ] Review console for errors

### Content Review
- [ ] All copy is final and error-free
- [ ] Contact email is correct
- [ ] Phone number is accurate
- [ ] Social links are correct
- [ ] All expedition data is current

### Performance
- [ ] Compress all images
- [ ] Minify CSS/JS (automatic with Next.js)
- [ ] Test page load speed (Lighthouse)
- [ ] Remove console.log() statements

### SEO
- [ ] Meta titles are unique and compelling
- [ ] Meta descriptions are present (155-160 chars)
- [ ] OG images are set up
- [ ] robots.txt exists in /public
- [ ] sitemap.xml exists in /public

### Security
- [ ] No sensitive credentials in code
- [ ] HTTPS enforced (automatic on Vercel)
- [ ] CORS headers configured if needed
- [ ] Form validation server-side

### Accessibility
- [ ] Alt text on all images
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Color contrast ratio AA minimum
- [ ] Keyboard navigation works
- [ ] Screen reader tested

---

## 🌍 Domain Setup

### Point Domain to Vercel

1. **For vercel.com domain**: Free, auto-managed
2. **For custom domain**:
   - Buy domain (GoDaddy, Namecheap, etc.)
   - In Vercel Dashboard → Settings → Domains
   - Click "Add" and enter your domain
   - Update DNS records at registrar:
     - Point CNAME to `cname.vercel.com`
     - Or use Vercel's nameservers

---

## 📊 Post-Deployment Setup

### Google Analytics

1. Create account at [google.com/analytics](https://google.com/analytics)
2. Get your Measurement ID
3. Add to `/app/layout.tsx`:

```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-YOUR-MEASUREMENT-ID" />
      </body>
    </html>
  )
}
```

### Email Service Setup

For form submissions, integrate with email service:

#### **SendGrid**
```bash
npm install @sendgrid/mail
```

Create `/app/api/contact/route.ts`:
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  
  try {
    await sgMail.send({
      to: 'hello@girivah.com',
      from: 'noreply@girivah.com',
      subject: `New Contact: ${name}`,
      text: message,
      replyTo: email,
    });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

#### **Resend**
```bash
npm install resend
```

Similar setup with Resend client.

---

## 🔄 Continuous Deployment

### Automatic Deployments

With Vercel, deployments are automatic:
- Push to `main` → Production
- Push to other branches → Preview deployments

### GitHub Actions (Alternative)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  Deploy-Production:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🚨 Error Monitoring

### Sentry Integration

```bash
npm install @sentry/nextjs
```

Initialize in `sentry.config.ts`:
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

---

## 📈 Performance Monitoring

### Vercel Analytics

Automatic in Vercel Dashboard:
- Web Vitals
- Requests
- Response time

### Custom Metrics

Add to `/app/layout.tsx`:
```tsx
useEffect(() => {
  if ('navigation' in window.performance) {
    const navigationTiming = window.performance.getEntriesByType('navigation')[0];
    console.log('Page load time:', navigationTiming.loadEventEnd - navigationTiming.fetchStart);
  }
}, []);
```

---

## 🔐 Environment Variables

### Vercel Environment Variables

Set in Vercel Dashboard → Settings → Environment Variables:

```
# Public (accessible in browser)
NEXT_PUBLIC_SITE_URL=https://girivah.com
NEXT_PUBLIC_GA_ID=G-YOUR-ID

# Private (server-only)
SENDGRID_API_KEY=your-key
DATABASE_URL=your-connection-string
JWT_SECRET=your-secret
```

### Local Development

Create `.env.local`:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=your-dev-db
```

---

## 🧪 Staging Environment

Create separate staging deployment:

1. Create `staging` branch from `main`
2. In Vercel:
   - Add `staging` as preview branch
   - Set different environment variables
   - Test before promoting to production

---

## 🔄 Rollback Procedure

If deployment has issues:

1. In Vercel Dashboard → Deployments
2. Click on previous stable deployment
3. Click "Rollback to this Deployment"

---

## 📝 Deployment Log Template

After each deployment, log:

- **Date**: YYYY-MM-DD
- **Version**: Commit hash
- **Changes**: Summary of changes
- **Performance**: Lighthouse scores
- **Issues**: Any problems encountered
- **Status**: ✅ Success / ⚠️ Needs monitoring

---

## ✅ Post-Deployment Testing

### Functional Testing
- [ ] All pages load without errors
- [ ] Forms submit and process
- [ ] Navigation links work
- [ ] Mobile responsive
- [ ] Images display

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] Page load < 3 seconds
- [ ] Core Web Vitals green
- [ ] No console errors

### SEO Testing
- [ ] Robots.txt present
- [ ] Sitemap XML valid
- [ ] Meta tags render
- [ ] Canonical tags correct
- [ ] OG images display in social shares

### Security Testing
- [ ] HTTPS enforced
- [ ] No sensitive data exposed
- [ ] CSRF tokens present
- [ ] Input validation working
- [ ] API endpoints protected

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

### Slow Page Load
- Check image optimization: `next/image` not used everywhere
- Analyze bundle: `npm run build -- --analyze`
- Enable gzip compression (Vercel automatic)

### Form Submission Issues
- Check API route exists
- Verify environment variables set
- Check CORS settings
- Review server logs in Vercel

---

## 📞 Support Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Support](https://vercel.com/support)

---

Congratulations! Your Girivah site is now live. Monitor performance and iterate based on user feedback.
