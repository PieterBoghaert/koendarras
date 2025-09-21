# Koen Darras Website - Export Package

## 📁 Project Structure

This export contains the complete Koen Darras website built with React and Vite.

```
koen-darras-site/
├── public/                 # Static assets
├── src/                   # Source code
│   ├── assets/           # Images and media files
│   ├── components/       # React components
│   ├── App.jsx          # Main application component
│   ├── App.css          # Main styles
│   ├── hero-cta-styles.css  # Hero and CTA button styles
│   ├── mobile-carousel.js   # Mobile carousel functionality
│   └── main.jsx         # Application entry point
├── dist/                 # Built production files (ready to deploy)
├── package.json          # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
cd koen-darras-site
npm install
```

### Development
```bash
npm run dev
```
Opens development server at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Creates optimized build in `dist/` folder

### Preview Production Build
```bash
npm run preview
```

## 🎯 Key Features

### Responsive Design
- **Desktop**: Full grid layouts with hover effects
- **Mobile**: Carousel sliders with touch gestures
- **Tablet**: Adaptive layouts for medium screens

### Sections Included
- **Hero**: Dynamic headline with CTA
- **About**: Biography with Vimeo showreel integration
- **Future Adventures**: Expedition showcase
- **Milestones**: Achievement carousel (mobile) / grid (desktop)
- **Press & Media**: International coverage showcase
- **Keynote Speaking**: Professional speaking topics
- **Partners**: Brand partnership section
- **Contact**: Functional contact form

### Technical Features
- **Vimeo Integration**: Embedded video player
- **Touch Gestures**: Mobile carousel navigation
- **Smooth Animations**: Scroll-triggered effects
- **SEO Optimized**: Semantic HTML and meta tags
- **Performance**: Optimized images and code splitting

## 🎨 Design System

### Typography
- **Primary Font**: Inter (headings, body text, UI)
- **Secondary Font**: JetBrains Mono (statistics, labels)
- **Responsive Scaling**: clamp() functions for all text sizes

### Color Palette
- **Primary**: Black (#000000)
- **Secondary**: White (#FFFFFF)
- **Accent**: Gray variations for text and backgrounds
- **Photography**: Full-color adventure images

### Components
- **CTA Buttons**: Consistent styling across all sections
- **Navigation**: Sticky header with mobile drawer
- **Cards**: Milestone and adventure showcases
- **Forms**: Contact form with validation

## 📱 Mobile Features

### Milestones Carousel
- **Touch Gestures**: Swipe left/right navigation
- **Pagination Dots**: Visual progress indicators
- **Smooth Transitions**: 300ms ease-out animations
- **Snap Behavior**: Cards center automatically

### Responsive Navigation
- **Mobile Menu**: Slide-in drawer from right
- **Sticky Header**: Always visible "KOEN DARRAS" home button
- **Body Lock**: Prevents background scrolling when menu open

## 🔧 Deployment Options

### Static Hosting (Recommended)
- **Netlify**: Drag and drop `dist/` folder
- **Vercel**: Connect GitHub repo for auto-deployment
- **GitHub Pages**: Upload `dist/` contents to gh-pages branch
- **AWS S3**: Static website hosting

### Server Deployment
- **Apache/Nginx**: Serve `dist/` folder as document root
- **CDN**: Use with CloudFlare or similar for global distribution

## 📊 Performance

### Optimizations Applied
- **Image Compression**: All photos optimized for web
- **Code Splitting**: Vite automatic chunking
- **CSS Minification**: Production build optimization
- **Asset Bundling**: Efficient resource loading

### Lighthouse Scores (Typical)
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 100
- **SEO**: 95+

## 🔄 Version History

### Current Version (Branch 20)
- ✅ Mobile carousel for milestones
- ✅ Enhanced CTA buttons
- ✅ Vimeo integration
- ✅ Touch gesture support
- ✅ Responsive typography system
- ✅ Social media icons
- ✅ Press coverage section

## 📞 Support

For questions about the website implementation:
- Review the source code in `src/` folder
- Check component structure in `src/components/`
- Refer to styling in CSS files
- Test responsive behavior in browser dev tools

## 🚀 GitHub Setup

### Initial Repository Setup
```bash
git init
git add .
git commit -m "Initial commit: Koen Darras website"
git branch -M main
git remote add origin https://github.com/yourusername/koen-darras-website.git
git push -u origin main
```

### Deployment Branch (Optional)
```bash
# Create gh-pages branch for GitHub Pages
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

---

**Website Built**: December 2024  
**Framework**: React + Vite  
**Styling**: Tailwind CSS + Custom CSS  
**Deployment**: Static files ready for any hosting platform
