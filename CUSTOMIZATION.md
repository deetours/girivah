# Girivah - Customization Guide

This guide will help you customize every aspect of the Girivah website to match your brand and content.

## 🎨 Design Customization

### Colors

Edit `/app/globals.css` in the `:root` section:

```css
:root {
  /* Primary Colors */
  --color-primary: #0B0B0B;         /* Main brand color */
  --color-primary-light: #1A1A1A;
  
  /* Accent */
  --color-accent: #FF6A00;          /* Call-to-action color */
  --color-accent-light: #FF7F1F;
  
  /* Neutrals */
  --color-background: #F7F7F7;      /* Page background */
  --color-surface: #FFFFFF;         /* Card backgrounds */
  --color-border: #E5E5E5;          /* Border colors */
  
  /* Text */
  --color-text-primary: #0B0B0B;
  --color-text-secondary: #6B7280;
}
```

### Fonts

To change fonts, edit `/app/layout.tsx`:

```tsx
import { YourFont, YourDisplayFont } from 'next/font/google'

const yourFont = YourFont({ 
  subsets: ["latin"],
  variable: '--font-sans',
})

const yourDisplayFont = YourDisplayFont({ 
  subsets: ["latin"],
  variable: '--font-display',
})
```

Then update the `<html>` className with the new variables.

## 📝 Content Customization

### Homepage Sections

Edit `/app/page.tsx`:

1. **Hero Section** (Line ~30)
   - Headline: "Ride Beyond the Road"
   - Subheadline text
   - CTA button text

2. **Philosophy Section** (Line ~70)
   - Main heading and description
   - Replace the placeholder image div

3. **Experiences Cards** (Line ~95)
   - Card titles, descriptions, and icons
   - Currently: Motorcycle, 4x4, Trek

4. **Testimonials** (Line ~160)
   - Quote text
   - Author names and locations

5. **Why Choose Section** (Line ~190)
   - Benefit titles and descriptions

### Expeditions

**To add/edit expeditions:**

1. Edit the `expeditions` array in `/app/expeditions/page.tsx` (Line ~8)
2. Each expedition object includes:
   ```typescript
   {
     id: 1,
     title: 'Expedition Name',
     location: 'Location',
     duration: '7 days',
     difficulty: 'Intermediate',
     price: '₹45,000',
     image: 'bg-color-600',        // Tailwind bg color
     type: 'Motorcycle',
     highlights: ['highlight1', 'highlight2'],
     description: 'Description text'
   }
   ```

3. For detailed expedition info, edit `/app/expeditions/[id]/page.tsx`:
   - Update the `expeditionDetails` object (Line ~8)
   - Add itinerary, included/excluded items, testimonials

### Navigation

Edit `/components/navigation.tsx`:

1. Logo text (Line ~20)
2. Navigation links (Line ~10):
   ```typescript
   const links = [
     { href: '/', label: 'Home' },
     { href: '/expeditions', label: 'Expeditions' },
     // Add more links here
   ]
   ```

### Footer

Edit `/components/footer.tsx`:

1. Brand message (Line ~30)
2. Navigation sections (Line ~40-60)
3. Newsletter CTA text (Line ~65)
4. Social media links (Line ~80-90)

### Pages

- **About**: `/app/about/page.tsx` - Origin story, philosophy, team
- **Journal**: `/app/journal/page.tsx` - Blog articles and featured posts
- **Contact**: `/app/contact/page.tsx` - Contact form and FAQ
- **Booking**: `/app/booking/page.tsx` - Checkout flow

## 🖼️ Images & Media

### Replace Placeholder Images

The app uses colored divs as placeholders. To add real images:

1. Add images to `/public/images/`
2. Replace placeholder divs with Next.js `<Image>` components:

```tsx
import Image from 'next/image'

<Image 
  src="/images/expedition.jpg"
  alt="Expedition name"
  width={600}
  height={400}
/>
```

### Hero Background

For the homepage hero, update `/app/page.tsx` line ~40:
```tsx
<div className="absolute inset-0 opacity-20" style={{
  backgroundImage: 'url(/path-to-image.jpg)',
}} />
```

## 🔗 Links & URLs

### Update Contact Info

Edit `/lib/constants.ts`:

```typescript
export const CONTACT_INFO = {
  email: 'your-email@girivah.com',
  phone: '+91 YOUR PHONE',
  location: 'Your Location',
}
```

### Social Links

Edit `/components/footer.tsx` around line 85:
```tsx
<a href="https://instagram.com/youraccount" className="p-2">
  <Instagram size={18} />
</a>
```

## 📱 Mobile Optimization

The site is mobile-first by default. To test:

1. Use browser DevTools responsive design mode
2. Adjust breakpoints in `tailwind.config.ts` if needed:
   ```typescript
   sm: '640px',
   md: '768px',
   lg: '1024px',
   ```

## 🔍 SEO Optimization

### Page Titles & Descriptions

Edit metadata in each page's component:

```tsx
export const metadata: Metadata = {
  title: 'Your Page Title',
  description: 'Your page description for search engines',
  keywords: 'keyword1, keyword2, keyword3',
}
```

### Open Graph (Social Sharing)

Update in `/app/layout.tsx`:
```tsx
openGraph: {
  title: 'Girivah | Your Title',
  description: 'Your description',
  type: 'website',
  url: 'https://girivah.com',
  siteName: 'Girivah',
  images: [{
    url: 'https://girivah.com/og-image.png',
    width: 1200,
    height: 630,
  }],
}
```

## 🎯 Conversion Optimization

### CTA Buttons

The primary CTAs use the accent color. To emphasize different actions:

1. Primary CTAs (red-orange): Use `.btn-accent`
2. Secondary CTAs (outlined): Use `.btn-outline`
3. Dark CTAs: Use `.btn-primary`

### Booking Flow

Currently 3 steps. To add more steps:

1. Edit `/app/booking/page.tsx`
2. Add new step conditions: `{step === 4 && (<div>...)}</div>`
3. Increment button/progress logic

## 🚀 Performance Tips

1. **Images**: Compress before uploading (use tools like TinyPNG)
2. **Fonts**: Currently loading 2 fonts. Add more cautiously.
3. **Animations**: Keep animation duration 300-500ms for perceived speed
4. **Lazy Loading**: Already implemented via Next.js

## 🔐 Security & Best Practices

1. **Email Forms**: Currently `console.log()` submissions. Connect to backend:
   - Add API route: `/app/api/contact/route.ts`
   - Use form state management
   - Add CSRF protection

2. **Booking**: Currently mock flow. To integrate payments:
   - Add Stripe/Razorpay integration
   - Add backend booking storage
   - Add email confirmations

3. **Data**: Store expedition data in database or CMS instead of hardcoding

## 📊 Analytics

Add tracking by editing `/app/layout.tsx`:

```tsx
// Google Analytics example
import { GoogleAnalytics } from '@next/third-parties/google'

// In the JSX:
<GoogleAnalytics gaId="G-YOUR-ID" />
```

## 🎨 Component Variants

All buttons use consistent styling. To create new component variants:

1. Add to `@layer components` in `/app/globals.css`
2. Example:
   ```css
   .btn-ghost {
     @apply px-8 py-3 text-primary hover:bg-secondary transition;
   }
   ```

## 🧪 Testing Checklist

- [ ] All links work (internal & external)
- [ ] Forms submit (check console or backend)
- [ ] Mobile layout responsive at all breakpoints
- [ ] Images load properly
- [ ] Fonts display correctly
- [ ] Colors match brand guidelines
- [ ] Animations smooth (no jank)
- [ ] Page load time under 3 seconds
- [ ] SEO meta tags present
- [ ] Dark mode compatible (if needed)

## 💡 Next Steps

1. **Personalize**: Update all copy, images, and links
2. **Test**: Check all pages on mobile & desktop
3. **Deploy**: Push to Vercel for live hosting
4. **Monitor**: Track analytics and user behavior
5. **Iterate**: Continuously improve based on feedback

---

For questions or support, refer to the documentation or contact the development team.
