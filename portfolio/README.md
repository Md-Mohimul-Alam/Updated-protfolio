🚀 Mohim's 3D Portfolio - React TypeScript
A modern, interactive 3D portfolio website built with React, TypeScript, Three.js, and Tailwind CSS. Showcase your blockchain expertise, frontend skills, projects, and certifications in style.

✨ Features
✅ 3D Hero Section with interactive blockchain network visualization

✅ Responsive Design - Works seamlessly on desktop, tablet, and mobile

✅ Smooth Animations with Framer Motion for engaging interactions

✅ Project Showcase with category filtering (Blockchain, Frontend, Fullstack)

✅ Certifications Display with Credly badge integration

✅ Skills Visualization with proficiency levels and categories

✅ Experience Timeline with detailed work history

✅ Dark Theme optimized for modern developer aesthetics

✅ Type-Safe with full TypeScript support

✅ Performance Optimized with code splitting and lazy loading

✅ SEO Ready with proper meta tags and structure

🛠️ Tech Stack
Technology	Purpose
React 18	UI Framework
TypeScript	Type Safety
Three.js	3D Graphics
React Three Fiber	React 3D Renderer
Framer Motion	Animations
Tailwind CSS	Styling
Vite	Build Tool
🚀 Quick Start
Prerequisites

Node.js 16+

npm 8+

Installation

bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Install 3D dependencies
npm install three @react-three/fiber @react-three/drei
npm install framer-motion

# Install styling
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Running Locally

bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
Visit http://localhost:3000 in your browser.

📁 Project Structure
text
src/
├── components/
│   ├── 3D/                          # 3D Components
│   │   ├── RotatingCube.tsx        # Animated cube
│   │   ├── BlockchainNetwork.tsx   # Blockchain visualization
│   │   └── FloatingParticles.tsx   # Particle effects
│   ├── sections/                    # Page sections
│   │   ├── Hero.tsx                # Hero section with 3D
│   │   ├── Skills.tsx              # Skills showcase
│   │   ├── Projects.tsx            # Projects grid
│   │   ├── Certifications.tsx      # Certifications display
│   │   └── Experience.tsx          # Work experience
│   ├── common/                      # Reusable components
│   │   ├── Navbar.tsx              # Navigation bar
│   │   ├── Footer.tsx              # Footer
│   │   ├── ProjectCard.tsx         # Project card
│   │   ├── CertificationBadge.tsx  # Certification badge
│   │   └── Button.tsx              # Reusable button
│   └── Layout.tsx                  # Main layout wrapper
├── hooks/                          # Custom React hooks
│   ├── useScrollAnimation.ts       # Scroll animations
│   ├── useMouseTracker.ts          # Mouse tracking
│   └── useTheme.ts                 # Theme management
├── types/                          # TypeScript types
│   └── index.ts                    # All type definitions
├── utils/                          # Utility functions
│   ├── constants.ts                # Data constants (projects, skills, etc.)
│   ├── animations.ts               # Animation utilities
│   └── helpers.ts                  # Helper functions
├── styles/
│   ├── globals.css                 # Global styles
│   ├── animations.css              # Custom animations
│   └── tailwind.config.js          # Tailwind configuration
├── App.tsx                         # Main app component
└── main.tsx                        # Entry point
🎨 Customization
Update Your Information

Edit src/utils/constants.ts to add your projects, skills, and certifications:

typescript
export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Your Project Title',
    description: 'Project description',
    image: '/projects/project.jpg',
    technologies: ['React', 'TypeScript'],
    github: 'https://github.com/yourusername/project',
    featured: true,
    category: 'blockchain', // or 'frontend', 'fullstack'
  },
  // Add more projects...
];
Change Colors

Edit tailwind.config.js to customize colors:

javascript
colors: {
  primary: {
    500: '#0ea5e9', // Change primary color
  },
  secondary: {
    500: '#8b5cf6', // Change secondary color
  },
}
Add Your Certifications

Update the CERTIFICATIONS array in constants.ts:

typescript
export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    name: 'Your Certification',
    issuer: 'Issuer Name',
    date: '2024',
    badgeUrl: '/badges/your-badge.png',
    credlyUrl: 'https://www.credly.com/users/yourprofile',
    category: 'Development',
  },
];
Update Contact Information

Update CONTACT in constants.ts:

typescript
export const CONTACT = {
  email: 'your.email@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourprofile',
  phone: 'Your Phone',
  credly: 'https://www.credly.com/users/yourprofile',
};
🌐 Deployment
Deploy to Vercel

bash
npm install -g vercel
vercel
Deploy to Netlify

bash
npm run build
# Upload the 'dist' folder to Netlify
Deploy to GitHub Pages

bash
npm run build
# Push 'dist' folder to gh-pages branch
📱 Responsive Design
The portfolio is fully responsive:

Mobile: 320px and up

Tablet: 768px and up

Desktop: 1024px and up

⚡ Performance Optimization
Code splitting for vendor libraries

Lazy loading of components

Optimized 3D rendering

Minified and compressed assets

Image optimization ready

🔧 Advanced Configuration
Custom Animations

Add custom animations in src/utils/animations.ts:

typescript
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};
Custom Hooks

Create reusable hooks in src/hooks/:

typescript
// useScrollAnimation.ts
export const useScrollAnimation = () => {
  // Your hook logic
};
🤝 Contributing
Feel free to fork this repository and customize it for your needs!

📄 License
This project is open source and available under the MIT License.

📧 Contact
Email: mohimreza1234@gmail.com

GitHub: https://github.com/Md-Mohimul-Alam

LinkedIn: https://www.linkedin.com/in/md-mohimul-alam-a5736821a/

Credly: https://www.credly.com/users/mohim-reza

🎓 Learning Resources
React Documentation

Three.js Documentation

React Three Fiber Docs

Framer Motion Docs

Tailwind CSS Docs

📝 Version History
v1.0.0 (2025)

Initial release

3D hero section with blockchain visualization

Project showcase with filtering

Certifications display

Skills visualization

Responsive design

Made with ❤️ and ☕ by MD Mohimul Alam