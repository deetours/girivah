# 🚀 Girivah - Quick Start Guide

Get your mountain expedition platform live in minutes!

---

## ⚡ 5-Minute Setup

### 1. **Run Locally**
```bash
cd girivah-project
npm install          # Already done if using v0
npm run dev          # Start development server
```
Visit: http://localhost:3000

### 2. **Explore the Site**
- Homepage: `/`
- Expeditions: `/expeditions`
- Booking: `/booking`
- About: `/about`
- Journal: `/journal`
- Contact: `/contact`

### 3. **Make Your First Change**
Edit `/app/page.tsx` line 25:
```tsx
// Change this:
"Ride Beyond the Road"

// To this:
"Your Custom Headline"
```
Save → See it live instantly! (Hot reload)

---

## 🎨 Customize in 10 Minutes

### **Brand Colors**
File: `/app/globals.css` (lines 10-26)

```css
:root {
  --color-primary: #0B0B0B;        /* Change to your brand color */
  --color-accent: #FF6A00;         /* Change to your accent color */
  --background: #FFFFFF;           /* Change background if needed */
}
```

### **Brand Name**
Files to update:
- `/components/navigation.tsx` (line 20): Logo
- `/components/footer.tsx` (line 30): Brand message
- `/app/layout.tsx` (line 18): Page title

### **Contact Info**
File: `/components/footer.tsx` (lines 30-50)
- Email address
- Phone number
- Social links

---

## 📝 Add Your Content

### **Update Homepage Copy**
File: `/app/page.tsx`
- Lines 25-27: Hero headline
- Lines 30-33: Expedition types
- Lines 100-130: Testimonials

### **Add Expeditions**
File: `/app/expeditions/page.tsx` (lines 8-55)

```typescript
{
  id: 7,
  title: 'Your Expedition',
  location: 'Location',
  duration: '5 days',
  difficulty: 'Intermediate',
  price: '₹35,000',
  image: 'bg-cyan-500',           // Tailwind color
  type: 'Motorcycle',
  highlights: ['Highlight 1', 'Highlight 2'],
  description: 'Description here'
}
```

### **Update About Page**
File: `/app/about/page.tsx`
- Lines 30-50: Brand story
- Lines 110-130: Team members
- Lines 145-165: Core values

---

## 🖼️ Add Images

### **Replace Placeholder Divs**

**Before:**
```tsx
<div className="bg-secondary rounded-xl aspect-video" />
```

**After:**
```tsx
import Image from 'next/image'

<Image 
  src="/images/expedition.jpg"
  alt="Expedition name"
  width={600}
  height={400}
  className="rounded-xl"
/>
```

1. Save images in `/public/images/`
2. Import Next.js Image component
3. Replace the placeholder div

---

## 🚀 Deploy in 2 Steps

### **Step 1: Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOU/girivah.git
git push -u origin main
```

### **Step 2: Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your girivah repository
5. Click "Deploy"

**✅ Live in ~30 seconds!**

---

## 🔗 Point Your Domain

1. Buy domain (GoDaddy, Namecheap, etc.)
2. In Vercel Dashboard → Settings → Domains
3. Add your domain
4. Update DNS at your registrar (Vercel provides instructions)

---

## ✅ Quality Checklist Before Launch

- [ ] All copy is correct
- [ ] Contact email is updated
- [ ] Phone number is current
- [ ] Images are replaced
- [ ] Expeditions have real data
- [ ] Links all work
- [ ] Mobile looks good
- [ ] Deployed to Vercel

---

## 🎯 Common Customizations

### **Change All Button Colors**
File: `/app/globals.css` (line 127)
```css
.btn-accent {
  @apply px-8 py-3 bg-accent text-white ...
}
```
Change `bg-accent` to any Tailwind color like `bg-blue-600`

### **Change Expedition Filters**
File: `/app/expeditions/page.tsx` (line 56)
```typescript
const types = ['All', 'Your', 'Types', 'Here']
const difficulties = ['All', 'Your', 'Levels', 'Here']
```

### **Add New Navigation Link**
File: `/components/navigation.tsx` (line 10)
```typescript
const links = [
  { href: '/', label: 'Home' },
  { href: '/your-page', label: 'Your Page' },  // Add this
]
```

### **Change Font Family**
File: `/app/layout.tsx` (lines 5-14)
```tsx
import { YourFont } from 'next/font/google'

const yourFont = YourFont({
  subsets: ["latin"],
  variable: '--font-sans',
})
```

---

## 📱 Test Mobile

```bash
# While running `npm run dev`
# Open on your phone at:
http://YOUR-IP:3000
```

Or use browser DevTools:
- Chrome: F12 → Toggle device toolbar (Ctrl+Shift+M)
- Firefox: F12 → Responsive Design Mode

---

## 🐛 Common Issues

### **Image Not Showing**
```bash
# Make sure image is in /public directory
/public/images/my-image.jpg
```

### **Changes Not Reflecting**
```bash
# Hard refresh (clear cache)
Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
# Then refresh page
```

### **Build Error**
```bash
npm run build     # See what's wrong
npm run lint      # Check for issues
```

---

## 📞 Need Help?

### **Documentation Files**
- `README.md` - Full documentation
- `CUSTOMIZATION.md` - Detailed customization guide
- `DEPLOYMENT.md` - Deployment instructions
- `PROJECT_SUMMARY.md` - What was built

### **External Resources**
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Docs](https://vercel.com/docs)

---

## ⭐ Pro Tips

1. **Use Vercel for hosting** - Best performance, automatic deployments
2. **Keep color scheme simple** - Max 5 colors (already done)
3. **Update content regularly** - Fresh blog posts = better SEO
4. **Test on mobile** - Most users visit on phones
5. **Use analytics** - Understand your visitors

---

## 🎉 You're All Set!

Your professional Girivah mountain expedition platform is ready. 

**Next actions:**
1. ✅ Customize with your content
2. ✅ Deploy to Vercel
3. ✅ Add your domain
4. ✅ Start booking expeditions!

---

**Questions?** Check the detailed guides or visit the documentation files.

**Ready to launch?** → `npm run build` → Deploy to Vercel! 🚀
