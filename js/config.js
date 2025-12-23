// Portfolio Configuration
// Customize these values to update your portfolio content

const portfolioConfig = {
    // Personal Information
    name: "Mehdi Ebrahimzadeh",
    shortName: "ME",
    title: "Software Engineer",
    location: "Waterloo, ON, Canada",
    
    // Contact Information
    contact: {
        email: "mehdi.ebr.work@gmail.com",
        phone: "+1 514-550-5492",
        github: "https://github.com/Mahd1exo",
        linkedin: "https://linkedin.com/in/mehdi-ebr",
        website: "https://mahd1exo.github.io"
    },
    
    // Hero Section
    hero: {
        greeting: "Hi, I'm",
        roles: [
            'Software Engineer',
            'Full-Stack Developer',
            'Cloud Architect',
            'Backend Specialist',
            'Open Source Contributor'
        ],
        description: "Software Engineering student at Conestoga College with a 4.0 GPA. Co-Founder of Oktav, building scalable distributed systems and cloud-native applications.",
        cta: {
            primary: "View My Work",
            secondary: "Get In Touch"
        }
    },
    
    // About Section
    about: {
        intro: "I'm a passionate Software Engineering student at Conestoga College with a perfect 4.0 GPA, specializing in distributed systems and cloud-native architectures.",
        description: "As Co-Founder and Lead Software Engineer at Oktav, I've built scalable backend services that handle thousands of concurrent users.",
        stats: [
            { label: "Years Experience", value: 4 },
            { label: "Projects Completed", value: 20 },
            { label: "Uptime %", value: 99.9 }
        ],
        highlights: [
            {
                icon: "trophy",
                text: "Top 10 Finalist at Velocity (U of Waterloo)"
            },
            {
                icon: "award",
                text: "$29,000 Scholarship from Global Affairs Canada"
            },
            {
                icon: "medal",
                text: "2nd Place - ConHacks 2025 Hackathon"
            }
        ]
    },
    
    // Skills
    skills: {
        languages: [
            { name: "C#", level: 95 },
            { name: "Python", level: 90 },
            { name: "Go", level: 88 },
            { name: "TypeScript", level: 85 },
            { name: "C/C++", level: 82 },
            { name: "Java", level: 80 }
        ],
        frameworks: [
            { name: ".NET Core", level: 95 },
            { name: "Node.js", level: 90 },
            { name: "React", level: 88 },
            { name: "gRPC", level: 85 },
            { name: "Django", level: 82 }
        ],
        tools: [
            { name: "Docker", level: 92 },
            { name: "Kubernetes", level: 85 },
            { name: "AWS", level: 88 },
            { name: "Git", level: 95 },
            { name: "CI/CD", level: 90 }
        ]
    },
    
    // Certifications
    certifications: [
        {
            name: "Certified Ethical Hacker (CEH)",
            icon: "shield-alt"
        },
        {
            name: "SANS SEC 504",
            icon: "certificate"
        },
        {
            name: "LPIC-1 & LPIC-2",
            icon: "linux"
        }
    ],
    
    // Theme Configuration
    theme: {
        primaryColor: "#667eea",
        secondaryColor: "#764ba2",
        accentColor: "#f093fb"
    },
    
    // Animation Configuration
    animations: {
        particlesCount: 80,
        typingSpeed: 150,
        scrollAnimationOffset: 100
    }
};

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioConfig;
}
