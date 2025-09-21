"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding database...');
    const hashedPassword = await bcryptjs_1.default.hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
    const admin = await prisma.admin.upsert({
        where: { email: process.env.ADMIN_EMAIL || 'admin@portfolio.com' },
        update: {},
        create: {
            email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
            password: hashedPassword,
            name: 'Froillan Kim B. Edem',
            role: 'admin',
            active: true
        }
    });
    console.log('✅ Admin user created:', admin.email);
    const project = await prisma.project.upsert({
        where: { id: 1 },
        update: {},
        create: {
            title: '💡 FaceofMind',
            subtitle: '🤖 AI-Powered Mental Health Companion',
            description: 'FaceofMind is your AI-powered mental health buddy 🧠❤️, helping you understand, track, and improve your emotional wellbeing. With facial & voice emotion recognition 🎭🎙️ + personalized insights 📊 + gamified rewards 🎮, it\'s like having a therapist in your pocket—private, secure, and rewarding!',
            features: JSON.stringify([
                '🎭 Real-Time Emotion Detection (7 Core Emotions)',
                '📊 Mood Tracking & Insights with AI-powered analytics',
                '🎮 Gamification & Rewards System',
                '🧠 Interactive Wellness Games (Quiz, Virtual Pet, Garden)',
                '🚨 Early Warnings & Crisis Support',
                '💳 Payment Processing & Subscription Plans'
            ]),
            techStack: JSON.stringify({
                'Frontend': ['Flutter (Users)', 'React (Admin)', 'React (Psychologists)'],
                'Backend': ['.NET C# Web API', 'Flask (Emotion Detection)'],
                'Database': ['Neon PostgreSQL', 'Azure SQL', 'Firebase Firestore', 'Firebase Realtime DB'],
                'AI Services': ['Gemini AI', 'AWS Emotion Recognition'],
                'DevOps': ['Google Cloud Run', 'Google Cloud Storage', 'Redis']
            }),
            technologies: JSON.stringify([
                '.NET C#', 'Flutter', 'React', 'Flask', 'PostgreSQL',
                'Firebase', 'Google Cloud', 'Redis', 'Gemini AI'
            ]),
            imageUrl: '/assets/faceofmind-project.jpg',
            liveUrl: 'https://faceofmind.vercel.app/',
            githubUrl: 'https://github.com/Froillan123/Faceofmind.git',
            visible: true,
            featured: true,
            order: 1
        }
    });
    console.log('✅ Sample project created:', project.title);
    const testimonials = [
        {
            clientName: 'Dr. Sarah Chen',
            company: 'Mental Health Clinic',
            role: 'Mental Health Professional',
            projectType: 'mobile-app',
            rating: 5,
            testimonial: 'Froillan delivered exceptional work on our mental health platform. His technical expertise in Flutter and backend development made our project a success.',
            approved: true,
            featured: true
        },
        {
            clientName: 'Marcus Rodriguez',
            company: 'StartupXYZ',
            role: 'Tech Lead',
            projectType: 'cloud-deployment',
            rating: 5,
            testimonial: 'Working with Froillan was a game-changer. His knowledge of cloud infrastructure and scalable architectures helped us build a robust application.',
            approved: true,
            featured: true
        },
        {
            clientName: 'Elena Vasquez',
            company: 'TechCorp',
            role: 'Product Manager',
            projectType: 'full-stack',
            rating: 5,
            testimonial: 'Froillan\'s full-stack development skills are impressive. He delivered a polished product that exceeded our expectations.',
            approved: true,
            featured: false
        }
    ];
    for (const testimonialData of testimonials) {
        const testimonial = await prisma.testimonial.create({
            data: testimonialData
        });
        console.log('✅ Testimonial created:', testimonial.clientName);
    }
    const contact = await prisma.contact.create({
        data: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            purpose: 'web-development',
            message: 'Hi Froillan! I\'m interested in building a modern web application for my business. Could we discuss the requirements?',
            status: 'unread'
        }
    });
    console.log('✅ Sample contact created:', contact.email);
    console.log('🎉 Database seeded successfully!');
}
main()
    .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map