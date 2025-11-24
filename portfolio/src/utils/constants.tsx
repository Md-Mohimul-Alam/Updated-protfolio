// src/utils/constants.ts

import { Project, Experience, Certification, Skill } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'blockchain-voting',
    title: 'Blockchain-Based Voting System',
    description: 'Enterprise-grade voting platform with 4 organizations, secure encrypted voting, and real-time auditing. Implemented Zero-Knowledge Proofs and Threshold Encryption.',
    image: '/projects/voting.jpg',
    technologies: ['Hyperledger Fabric', 'React', 'Node.js', 'Zero-Knowledge Proofs'],
    github: 'https://github.com/Md-Mohimul-Alam/blockchain-voting-system',
    featured: true,
    category: 'blockchain',
  },
  {
    id: 'healthcare-network',
    title: 'Healthcare Data Exchange Network',
    description: 'Private blockchain for 3 healthcare institutions with granular RBAC and real-time dashboard. Ensured 98% data consistency in clinical simulations.',
    image: '/projects/healthcare.jpg',
    technologies: ['Hyperledger Fabric', 'React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/Md-Mohimul-Alam/HMS',
    featured: true,
    category: 'blockchain',
  },
  {
    id: 'health-monitoring',
    title: 'ESP32-Based Health Monitoring System',
    description: 'Real-time patient vitals monitoring using ECG and SpO2 sensors integrated with Hyperledger Fabric blockchain. 95.4% ECG and 93.8% SpO2 accuracy.',
    image: '/projects/health-iot.jpg',
    technologies: ['ESP32', 'Hyperledger Fabric', 'React', 'MAX30102', 'AD8232'],
    github: 'https://github.com/Md-Mohimul-Alam',
    featured: true,
    category: 'fullstack',
  },
  {
    id: 'expense-tracker',
    title: 'Personal Expense Tracker',
    description: 'Full-stack expense management app with interactive charts and JWT authentication. Automated financial insights reducing manual tracking by 75%.',
    image: '/projects/expense.jpg',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/Md-Mohimul-Alam/Personal-Expense-Tracker',
    featured: false,
    category: 'fullstack',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Web Application',
    description: 'Responsive product catalog, shopping cart, and admin dashboard with order management and simulated payment gateway with real-time updates.',
    image: '/projects/ecommerce.jpg',
    technologies: ['React', 'JavaScript', 'Node.js', 'MySQL', 'TailwindCSS'],
    github: 'https://github.com/Md-Mohimul-Alam/Md-Mohimul-Alam-Intern_Project_E-Commerce',
    featured: false,
    category: 'fullstack',
  },
  {
    id: 'santaran',
    title: 'Santaran Project',
    description: 'Responsive web platform for multidisciplinary artist-run organization with interactive dashboards and mobile-first design.',
    image: '/projects/santaran.jpg',
    technologies: ['Nuxt.js', 'Vue.js', 'TailwindCSS'],
    featured: false,
    category: 'frontend',
  },
];

export const SKILLS: Skill[] = [
  {
    category: 'Frontend',
    skills: ['React.js', 'Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Three.js'],
    proficiency: 95,
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'GraphQL', 'REST API', 'MongoDB', 'MySQL'],
    proficiency: 85,
  },
  {
    category: 'Blockchain',
    skills: ['Hyperledger Fabric', 'Smart Contracts', 'Zero-Knowledge Proofs', 'Threshold Encryption'],
    proficiency: 90,
  },
  {
    category: 'Web3',
    skills: ['Web3.js', 'Hyperledger Fabric SDK', 'Hyperledger Composer','hyperledger Arise Framework','Hyperledger Fabric CA'],
    proficiency: 80,
  },
  {
    category: 'DevOps',
    skills: ['Docker', 'Git', 'CI/CD', 'Linux'],
    proficiency: 78,
  },
  {
    category: 'IoT & Embedded',
    skills: ['ESP32', 'Arduino', 'Embedded Systems', 'Sensor Integration'],
    proficiency: 82,
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cisco-ccia',
    name: 'CCNAv7: Introduction to Networks',
    issuer: 'Cisco',
    date: '2022',
    badgeUrl: 'https://images.credly.com/size/680x680/images/242902b5-f527-42ad-865e-977c9e1b5b58/image.png',
    credlyUrl: 'https://www.credly.com/badges/75ff6769-1e36-44d2-a7a5-fce98429a971',
    category: 'Networking',
  },
  {
    id: 'cisco-ccna',
    name: 'CCNAv7: Switching, Routing, and Wireless Essentials',
    issuer: 'Cisco',
    date: '2024',
    badgeUrl: 'https://images.credly.com/size/680x680/images/f4ccdba9-dd65-4349-baad-8f05df116443/CCNASRWE__1_.png',
    credlyUrl: 'https://www.credly.com/badges/0b045a72-c003-4aef-bb74-6b91b41d3936',
    category: 'Networking',
  },
  {
    id: 'ethical-hacker',
    name: 'Ethical Hacker',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    badgeUrl: 'https://images.credly.com/images/70d71df5-f3dc-4380-9b9d-f22513a70417/CCNAITN__1_.png',
    credlyUrl: 'https://www.credly.com/users/mohim-reza',
    category: 'Security',
  },
  {
    id: 'react-nodejs',
    name: 'React.js & Node.js',
    issuer: 'Global Skills Development Agency',
    date: '2023',
    badgeUrl: 'https://globalskills.com.bd/assets/images/logo-f-width.png',
    credlyUrl: 'https://www.credly.com/users/mohim-reza',
    category: 'Development',
  },
  {
    id: 'growth-hacking',
    name: 'Growth Hacking & Online Campaigns Internship',
    issuer: 'RIT & Excelerate',
    date: '2025',
    badgeUrl: 'https://excelerateuserprofile.s3.ap-south-1.amazonaws.com/WebsiteImageFiles/Badge/Badge_0000000010KRZVQY9TWPXFJPKG_image_link.png',
    credlyUrl: '',
    category: 'Marketing',
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'shop-online-ny',
    company: 'Shop Online New York',
    position: 'React Developer - Remote',
    duration: 'Sep 2025 – Present',
    description: [
      'Developed responsive e-commerce frontend using React.js and TailwindCSS',
      'Integrated API endpoints and implemented TypeScript for type safety',
      'Collaborated with team to optimize performance and UX',
    ],
    technologies: ['React', 'TypeScript', 'TailwindCSS'],
  },
  {
    id: 'betafore',
    company: 'BetaFore - Software & Digital Media',
    position: 'React Developer Intern',
    duration: 'May 2024 – Oct 2024',
    description: [
      'Built e-commerce UI with responsive product catalog and filtering',
      'Worked with backend team for API integration',
    ],
    technologies: ['React', 'JavaScript', 'CSS'],
  },
  {
    id: 'techtrioz',
    company: 'TechTrioZ Solutions',
    position: 'Data Entry Specialist',
    duration: 'Jan 2023 – Feb 2024',
    description: [
      'Managed digital data entry systems and geospatial data processing',
      'Maintained 99.8% data accuracy',
    ],
    technologies: ['Data Processing', 'GIS', 'Database Management'],
  },
];

export const CONTACT = {
  email: 'mohimreza1234@gmail.com',
  github: 'https://github.com/Md-Mohimul-Alam',
  linkedin: 'https://www.linkedin.com/in/md-mohimul-alam-a5736821a/',
  phone: '01782152268',
  credly: 'https://www.credly.com/users/mohim-reza',
};

export const SOCIAL_LINKS = [
  { name: 'GitHub', url: CONTACT.github, icon: 'Github' },
  { name: 'LinkedIn', url: CONTACT.linkedin, icon: 'Linkedin' },
  { name: 'Email', url: `mailto:${CONTACT.email}`, icon: 'Mail' },
];
