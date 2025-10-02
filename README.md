# NextReach - Secure Digital Marketing Agency Website

A professional digital marketing agency website with AI-powered chat integration, built with security best practices for production deployment.

## 🔒 Security Features

- **API Key Protection**: No sensitive data exposed on client-side
- **Rate Limiting**: Prevents abuse and API quota exhaustion
- **Input Validation**: Sanitizes user inputs and prevents XSS
- **CORS Protection**: Restricts access to authorized domains
- **Security Headers**: Comprehensive security headers via Helmet.js
- **Content Security Policy**: Prevents malicious script injection
- **Environment Variables**: Secure configuration management

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Copy the example environment file
copy .env.example .env

# Edit .env and add your DeepSeek API key
# DEEPSEEK_API_KEY=your_actual_api_key_here
```

### 3. Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

### 4. Access Your Website
- Local: http://localhost:3000
- The AI chat will work securely through the proxy

## Sections

### 1. Hero Section
- Compelling headline and call-to-action
- Animated floating cards showing key metrics
- Dual CTA buttons for different user intents

### 2. Services
- 6 core services with icons and descriptions
- Hover effects and animations
- Grid layout that adapts to screen size

### 3. About Us
- Company story and mission
- Key statistics with animated counters
- Professional team showcase area

### 4. Portfolio
- Filterable project showcase
- Hover overlays with project details
- Categories: Digital, Branding, Video

### 5. Testimonials
- Client reviews carousel
- Auto-playing with manual navigation
- Star ratings and client information

### 6. Contact
- Contact information with icons
- Interactive contact form
- Animated form fields

### 7. Footer
- Company links and information
- Social media links
- Copyright information

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern features including Grid, Flexbox, custom properties
- **JavaScript**: ES6+ features, no external dependencies
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## File Structure

```
NextReach/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js          # JavaScript functionality
└── README.md          # This file
```

## Getting Started

1. Open `index.html` in a web browser
2. The website is fully functional with interactive elements
3. All files are self-contained with CDN resources for fonts and icons

## Customization

### Colors
The website uses CSS custom properties for easy theming:
- `--primary-color`: #6366f1 (Purple)
- `--secondary-color`: #f59e0b (Amber)
- `--text-dark`: #1f2937 (Dark gray)
- `--text-light`: #6b7280 (Light gray)

### Content
- Update company information in `index.html`
- Replace placeholder content with actual agency details
- Add real portfolio images and project details
- Update contact information and social media links

### Styling
- Modify `styles.css` for visual changes
- Responsive breakpoints can be adjusted
- Animation timing and effects can be customized

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- Optimized CSS with efficient selectors
- Minimal JavaScript with event delegation
- Lazy loading ready (for images when added)
- Mobile-first responsive design
- Smooth scroll behavior

## Accessibility Features

- Semantic HTML structure
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Proper heading hierarchy
- Alt text ready for images

## Future Enhancements

- Add real portfolio images
- Implement backend for contact form
- Add blog section
- Integrate with CMS
- Add more interactive animations
- PWA capabilities

This website provides a solid foundation for an advertising agency's online presence with modern web standards and best practices.