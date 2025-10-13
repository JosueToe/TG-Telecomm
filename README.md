# TG TELECOMM Website

A modern, responsive website for TG Telecomm - Miami's local wireless internet provider.

## 🚀 Features

- **Modern Tornet-Inspired Design**: Deep purple backgrounds with neon lime accents, glassmorphism effects
- **Fully Responsive**: Mobile-first design that works beautifully on all devices
- **SEO Optimized**: Meta tags, structured data, sitemap, and semantic HTML
- **Accessibility**: WCAG AA compliant with skip links, ARIA labels, and keyboard navigation
- **Fast Performance**: Optimized assets, lazy loading, and efficient animations
- **No Dependencies**: Pure HTML, CSS, and vanilla JavaScript - no frameworks required

## 📁 Project Structure

```
TG-Telecomm/
├── index.html          # Single-page website with all sections
├── ticket.html         # Support ticket submission page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Search engine directives
└── README.md           # This file
```

## 🎯 Single-Page Design

This is a modern single-page website where all content scrolls smoothly in one page:
- **Home** - Hero section with main CTA
- **Plans** - Pricing options for Home, Business, and Backup internet
- **Features** - Feature showcase with icons
- **Coverage** - Coverage checker and service areas
- **Business** - Business-focused solutions
- **About** - Company information and values
- **Contact** - Contact form and information

The only separate page is **ticket.html** for opening support tickets.

## 🎨 Design System

### Color Palette
- **Coral Red**: `#E74C3C` - Primary buttons, accents, prices
- **Aqua Teal**: `#4ECDC4` - Secondary accents, hover states
- **Sage Green**: `#A8C5B5` - Subtle accents
- **White**: `#FFFFFF` - Clean backgrounds
- **Dark Text**: `#2C3E50` - Primary text color

### Typography
- **Display/Headings**: Sora (700-800 weight)
- **Body Text**: Inter (400-500 weight)
- Responsive font sizing using `clamp()`

### UI Patterns
- Glassmorphism navigation with blur effects
- Pill-shaped buttons with glow animations
- Rounded cards (16-20px border radius)
- Smooth transitions and spring animations

## 🛠️ Customization

### Updating Contact Information

Replace placeholder contact details in all HTML files:
- Phone: Search for `+1 (305) XXX-XXXX` and replace
- Email: Update `info@tgtelecomm.com` and `support@tgtelecomm.com`
- Address: Replace `Miami, FL` with specific address

### Changing Plans & Pricing

Edit the plan cards in:
- `index.html` (Quick Plans section)
- `plans.html` (Full plans with comparison table)
- `business.html` (Business-specific offerings)

### Adding Real Coverage Data

Replace the simulated coverage checker in `script.js` with actual API integration:
```javascript
function displayCoverageResult(address) {
    // Replace with actual API call to your coverage database
}
```

## 📱 Mobile Responsiveness

The site is fully responsive with breakpoints at:
- **Desktop**: 1280px+ (max container width)
- **Tablet**: 768px - 1279px
- **Mobile**: < 768px

Mobile-specific features:
- Hamburger menu navigation
- Stacked layouts
- Touch-optimized buttons
- Optimized font sizes

## ♿ Accessibility Features

- Semantic HTML5 elements
- Skip-to-content link
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Alt text for all images
- Color contrast ratio > 4.5:1 (WCAG AA)

## 🔍 SEO Optimizations

### Meta Tags
Every page includes:
- Title tags (< 60 characters)
- Meta descriptions (< 155 characters)
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URLs

### Structured Data
`index.html` includes Schema.org LocalBusiness markup for:
- Business name and description
- Contact information
- Service area
- Ratings and reviews

### Performance
- Preconnect to font sources
- Lazy loading for images
- Minimal JavaScript
- No render-blocking resources

## 🚀 Deployment

### Local Development
Simply open `index.html` in a web browser or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server -p 8000
```

### Production Deployment

1. **Update URLs**: Replace all `https://tgtelecomm.com` with your actual domain
2. **Add Analytics**: Insert tracking code (Google Analytics, etc.) before `</body>`
3. **Configure Forms**: Connect contact forms to your backend/email service
4. **SSL Certificate**: Ensure HTTPS is enabled
5. **CDN**: Consider using a CDN for assets (optional)

### Recommended Hosting
- Netlify (easy deployment, free tier)
- Vercel (optimized for static sites)
- GitHub Pages (free for public repos)
- AWS S3 + CloudFront
- Traditional web hosting

## 📋 TODO Before Launch

- [ ] Replace all placeholder phone numbers
- [ ] Update email addresses
- [ ] Add real business address
- [ ] Configure contact form backend
- [ ] Add Google Analytics or tracking
- [ ] Add social media links
- [ ] Create actual logo/favicon
- [ ] Test all forms
- [ ] Run accessibility audit
- [ ] Run Lighthouse performance test
- [ ] Set up 404 error page
- [ ] Configure email notifications

## 🧪 Testing Checklist

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Functionality Testing
- [ ] All navigation links work
- [ ] Forms submit properly
- [ ] Coverage checker functions
- [ ] Mobile menu toggles
- [ ] FAQ accordions expand/collapse
- [ ] Testimonial carousel scrolls
- [ ] All CTAs link correctly

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] Page load < 3 seconds
- [ ] No console errors
- [ ] Images optimized
- [ ] Mobile performance

## 📞 Support

For questions or issues with this website:
- Email: info@tgtelecomm.com
- Phone: +1 (305) XXX-XXXX

## 📄 License

© 2025 TG Telecomm. All rights reserved.

---

Built with ❤️ in Miami

