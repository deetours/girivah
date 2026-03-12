# Girivah - Mountain Expedition Booking Platform

A premium, cinematic web application for curated Himalayan mountain expeditions. Built with Next.js, Tailwind CSS, and modern web technologies.

## 🏔️ Project Overview

Girivah is a complete expedition booking platform that emphasizes authentic mountain travel experiences across Ladakh, Spiti Valley, and Himachal Pradesh. The platform features:

- **Cinematic Homepage** - Immersive hero sections and storytelling-driven design
- **Expedition Catalog** - Browse and filter mountain expeditions by type and difficulty
- **Detailed Expedition Pages** - Complete itineraries, pricing, and booking details
- **Multi-Step Booking Flow** - Streamlined reservation experience with progress tracking
- **Blog/Journal** - Adventure stories and travel insights from the mountains
- **About & Contact** - Brand philosophy and user engagement pages

## 📁 Project Structure

```
app/
├── page.tsx                    # Homepage with all cinematic sections
├── layout.tsx                  # Root layout with navigation & footer
├── globals.css                 # Design system & tailwind imports
├── expeditions/
│   ├── page.tsx               # All expeditions listing with filters
│   └── [id]/
│       └── page.tsx           # Individual expedition detail page
├── booking/
│   └── page.tsx               # Multi-step booking flow
├── journal/
│   └── page.tsx               # Adventure blog/stories
├── about/
│   └── page.tsx               # Brand story & values
└── contact/
    └── page.tsx               # Contact form & FAQ

components/
├── navigation.tsx             # Fixed header navigation
├── footer.tsx                 # Global footer
└── (additional components as needed)

public/                         # Static assets
```

## 🎨 Design System

### Colors
- **Primary**: #0B0B0B (Deep Mountain Black)
- **Accent**: #FF6A00 (Expedition Orange)
- **Background**: #FFFFFF (Alpine White)
- **Secondary**: #F7F7F7 (Soft White)

### Typography
- **Display Font**: Playfair Display (Headings)
- **Body Font**: Inter (Text & UI)

### Spacing
- Base unit: 8px
- Section padding: 120px (desktop), 80px (tablet), 60px (mobile)

### Components
- `.btn-primary` - Primary CTA buttons
- `.btn-accent` - Accent/orange buttons
- `.btn-outline` - Bordered outline buttons
- `.section-padding` - Standard section spacing
- `.container-max` - Max-width container (1200px)

## 🚀 Features

### Home Page
- Hero section with cinematic introduction
- Mountain silence / philosophy section
- Three expedition types showcase
- Destination highlights
- Testimonials & social proof
- Why Girivah benefits section
- Primary CTA section

### Expeditions Page
- Dynamic expedition grid (3 columns desktop)
- Filter by expedition type (All, Motorcycle, 4x4, Trek)
- Filter by difficulty (All, Easy, Intermediate, Advanced)
- Expedition cards with prices and key info
- Hover animations and transitions

### Expedition Detail Pages
- Full expedition overview
- Day-by-day itinerary
- Journey highlights
- What's included/excluded
- Traveler testimonials
- Booking CTA

### Booking Flow
- Step 1: Select expedition, date, participants
- Step 2: Enter traveler information
- Step 3: Review and confirm
- Step 4: Success confirmation with booking reference

### Journal
- Featured article section
- Grid of blog posts by category
- Newsletter subscription CTA
- Tags: Adventure, Culture, Guide, Stories, Nature, Photography

### About
- Brand origin story
- Philosophy & values
- Etymology of "Girivah"
- Team information
- Core values section

### Contact
- Contact information (email, phone, location)
- Contact form with subject selection
- FAQ section
- Newsletter signup

## 🔧 Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS with custom design tokens
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Animations**: CSS + Tailwind utilities

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly CTAs (minimum 44px)
- Optimized navigation for all screen sizes

## 🎬 Key Design Principles

1. **Minimalism**: Apple-inspired restraint and clarity
2. **Storytelling**: Airbnb-style exploration narrative
3. **Emotional Design**: Nike-level transformation messaging
4. **Premium Feel**: Generous whitespace and quality imagery
5. **Purpose**: Every element serves a function

## 📊 Expedition Data Structure

Each expedition includes:
- Title, location, duration
- Difficulty level (Easy, Intermediate, Advanced)
- Type (Motorcycle, 4x4, Trek)
- Price per person
- Highlights array
- Daily itinerary with descriptions
- Included/excluded services
- Testimonials

## 🎯 User Journey

1. **Arrival** - Homepage hook with mountain imagery
2. **Recognition** - Problem statement (modern tourism limitations)
3. **Discovery** - Girivah philosophy introduction
4. **Exploration** - Browse expeditions by type/difficulty
5. **Detail** - Read full expedition information
6. **Booking** - Multi-step checkout experience
7. **Confirmation** - Booking reference and next steps

## 🔐 Performance & SEO

- Next.js Image optimization
- Lazy loading for below-fold sections
- Optimized font loading
- Semantic HTML structure
- Meta tags for social sharing
- Clean, descriptive page titles

## 🛠️ Customization Guide

### To Add New Expeditions
1. Edit the `expeditions` array in `/app/expeditions/page.tsx`
2. Create expedition data structure in `/app/expeditions/[id]/page.tsx`

### To Change Colors
1. Update CSS variables in `/app/globals.css` `:root` section
2. All components automatically inherit new colors

### To Modify Fonts
1. Update font imports in `/app/layout.tsx`
2. Adjust font variables in tailwind theme

### To Add New Pages
1. Create new route folder in `/app`
2. Add `page.tsx` file with component
3. Update navigation links in `/components/navigation.tsx`

## 📈 Future Enhancements

- User authentication & profile management
- Payment integration
- Real-time booking availability
- Photo galleries with lightbox
- Video testimonials
- Community forum
- Booking confirmation emails
- SMS notifications

## 📝 License

Girivah - All rights reserved.

---

Built with ❤️ for mountain travelers seeking authentic experiences.
