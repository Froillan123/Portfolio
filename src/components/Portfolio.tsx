import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import {
  Menu, X, Github, Linkedin, Mail, ExternalLink,
  Code, Database, Server, Smartphone, Globe,
  Zap, Rocket, Brain, Heart, Star, Sparkles,
  Terminal, FileCode, GitBranch, Layers,
  Shield, Cpu, Cloud, Monitor, Palette,
  ArrowRight, Download, Play, Eye,
  Home, User, FolderOpen, MessageCircle,
  Code2, Coffee, ChevronLeft, ChevronRight,
  Info, XIcon, Copy, Check
} from "lucide-react";
import faceofmindImage from "@/assets/faceofmind-project.jpg";

const techStacks = {
  languages: [
    { name: "Python", icon: Code2, color: "text-yellow-500" },
    { name: "TypeScript", icon: FileCode, color: "text-blue-500" },
    { name: "JavaScript", icon: Coffee, color: "text-yellow-400" },
    { name: "Dart", icon: Code, color: "text-blue-400" },
    { name: "C#", icon: Code, color: "text-purple-500" },
  ],
  frontend: [
    { name: "React", icon: Globe, color: "text-cyan-400" },
    { name: "Flutter", icon: Smartphone, color: "text-cyan-500" },
    { name: "Angular", icon: Globe, color: "text-red-500" },
    { name: "HTML5", icon: Code, color: "text-orange-500" },
    { name: "CSS3", icon: Palette, color: "text-blue-600" },
    { name: "Tailwind CSS", icon: Palette, color: "text-teal-500" },
  ],
  backend: [
    { name: "Django", icon: Server, color: "text-green-600" },
    { name: "Flask", icon: Server, color: "text-gray-600" },
    { name: "FastAPI", icon: Zap, color: "text-green-500" },
    { name: ".NET C# Web API", icon: Server, color: "text-purple-600" },
    { name: "Express.js", icon: Server, color: "text-gray-700" },
  ],
  cloud: [
    { name: "Google Cloud", icon: Cloud, color: "text-blue-500" },
    { name: "Azure", icon: Cloud, color: "text-blue-600" },
    { name: "AWS", icon: Cloud, color: "text-orange-500" },
    { name: "Firebase", icon: Zap, color: "text-yellow-500" },
  ],
  databases: [
    { name: "Firestore", icon: Database, color: "text-orange-600" },
    { name: "Datastore", icon: Database, color: "text-blue-500" },
    { name: "PostgreSQL", icon: Database, color: "text-blue-700" },
    { name: "Redis", icon: Database, color: "text-red-500" },
    { name: "SQLite", icon: Database, color: "text-gray-600" },
    { name: "MySQL", icon: Database, color: "text-blue-600" },
  ],
};

const projects = [
  {
    title: "💡 FaceofMind",
    subtitle: "🤖 AI-Powered Mental Health Companion",
    description: "FaceofMind is your AI-powered mental health buddy 🧠❤️, helping you understand, track, and improve your emotional wellbeing. With facial & voice emotion recognition 🎭🎙️ + personalized insights 📊 + gamified rewards 🎮, it's like having a therapist in your pocket—private, secure, and rewarding!",
    image: faceofmindImage,
    features: [
      "🎭 Real-Time Emotion Detection (7 Core Emotions)",
      "📊 Mood Tracking & Insights with AI-powered analytics",
      "🎮 Gamification & Rewards System",
      "🧠 Interactive Wellness Games (Quiz, Virtual Pet, Garden)",
      "🚨 Early Warnings & Crisis Support",
      "💳 Payment Processing & Subscription Plans"
    ],
    techStack: {
      "Frontend": ["Flutter (Users)", "React (Admin)", "React (Psychologists)"],
      "Backend": [".NET C# Web API", "Flask (Emotion Detection)"],
      "Database": ["Neon PostgreSQL", "Azure SQL", "Firebase Firestore", "Firebase Realtime DB"],
      "AI Services": ["Gemini AI", "AWS Emotion Recognition"],
      "DevOps": ["Google Cloud Run", "Google Cloud Storage", "Redis"]
    },
    technologies: [".NET C#", "Flutter", "React", "Flask", "PostgreSQL", "Firebase", "Google Cloud", "Redis", "Gemini AI"],
    link: "https://www.faceofmind.it.com/",
    github: "https://github.com/Froillan123/Faceofmind.git",
    icon: Brain
  }
];

const navigationItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "contact", label: "Contact", icon: MessageCircle },
];


const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => (
    <div
      key={i}
      className={`absolute w-2 h-2 bg-primary/20 rounded-full animate-float`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 10}s`,
      }}
    />
  ));

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>;
};


const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return <span>{count}{suffix}</span>;
};

const titles = [
  "Software Engineer",
  "Flutter Android Developer",
  "Cloud & DevOps Enthusiast"
];

function TypewriterLoop() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (displayed.length < titles[index].length) {
        timeout = setTimeout(() => {
          setDisplayed(titles[index].slice(0, displayed.length + 1));
        }, 40); // Faster typing speed
      } else {
        timeout = setTimeout(() => setTyping(false), 800); // Shorter pause
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 20); // Faster deletion
      } else {
        setTyping(true);
        setIndex((index + 1) % titles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, index]);

  return (
    <div className="text-xl md:text-2xl font-semibold leading-tight mt-2 text-primary h-8">
      {displayed}
    </div>
  );
}

export function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [showTechModal, setShowTechModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(true);
  const [emailCopied, setEmailCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "testimonials", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load testimonials dynamically
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        // Simulate API call - replace with actual API endpoint
        const response = await fetch('/api/testimonials');
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data);
        } else {
          // Fallback to static testimonials if API fails
          setTestimonials([
            {
              text: "Froillan delivered exceptional work on our mental health platform. His technical expertise in Flutter and backend development made our project a success.",
              author: "Dr. Sarah Chen",
              role: "Mental Health Professional",
              gradient: "from-primary to-accent",
              rating: 5
            },
            {
              text: "Working with Froillan was a game-changer. His knowledge of cloud infrastructure and scalable architectures helped us build a robust application.",
              author: "Marcus Rodriguez",
              role: "Tech Lead, StartupXYZ",
              gradient: "from-blue-500 to-purple-500",
              rating: 5
            },
            {
              text: "Froillan's full-stack development skills are impressive. He delivered a polished product that exceeded our expectations.",
              author: "Elena Vasquez",
              role: "Product Manager",
              gradient: "from-green-500 to-teal-500",
              rating: 5
            },
            {
              text: "Outstanding work on our Flutter mobile app. Froillan's attention to detail and user experience is remarkable.",
              author: "James Wilson",
              role: "CEO, TechCorp",
              gradient: "from-purple-500 to-pink-500",
              rating: 5
            },
            {
              text: "Professional, skilled, and delivers on time. Froillan's expertise in cloud deployment saved us weeks of development.",
              author: "Maria Santos",
              role: "CTO, InnovateLab",
              gradient: "from-orange-500 to-red-500",
              rating: 5
            }
          ]);
        }
      } catch (error) {
        console.log('Using fallback testimonials');
        // Use fallback testimonials
        setTestimonials([
          {
            text: "Froillan delivered exceptional work on our mental health platform. His technical expertise in Flutter and backend development made our project a success.",
            author: "Dr. Sarah Chen",
            role: "Mental Health Professional",
            gradient: "from-primary to-accent",
            rating: 5
          },
          {
            text: "Working with Froillan was a game-changer. His knowledge of cloud infrastructure and scalable architectures helped us build a robust application.",
            author: "Marcus Rodriguez",
            role: "Tech Lead, StartupXYZ",
            gradient: "from-blue-500 to-purple-500",
            rating: 5
          },
          {
            text: "Froillan's full-stack development skills are impressive. He delivered a polished product that exceeded our expectations.",
            author: "Elena Vasquez",
            role: "Product Manager",
            gradient: "from-green-500 to-teal-500",
            rating: 5
          },
          {
            text: "Outstanding work on our Flutter mobile app. Froillan's attention to detail and user experience is remarkable.",
            author: "James Wilson",
            role: "CEO, TechCorp",
            gradient: "from-purple-500 to-pink-500",
            rating: 5
          },
          {
            text: "Professional, skilled, and delivers on time. Froillan's expertise in cloud deployment saved us weeks of development.",
            author: "Maria Santos",
            role: "CTO, InnovateLab",
            gradient: "from-orange-500 to-red-500",
            rating: 5
          }
        ]);
      } finally {
        setIsLoadingTestimonials(false);
      }
    };

    loadTestimonials();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const copyEmailToClipboard = async () => {
    const email = "froillan.edem@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      toast({
        title: "Email Copied! 📧",
        description: "Email address copied to clipboard successfully!",
        duration: 3000,
      });
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy email to clipboard. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <FloatingParticles />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl gradient-text flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              <span>Portfolio</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 transition-all duration-300 px-3 py-2 rounded-lg ${
                    activeSection === item.id 
                      ? "text-primary font-medium bg-primary/10 shadow-lg" 
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="capitalize">{item.label}</span>
                </button>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 relative overflow-hidden"
              >
                <div className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}>
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900 ${
            isMenuOpen ? 'max-h-64 py-4 border-t border-border' : 'max-h-0'
          }`}>
            <div className="px-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-3 w-full text-left px-3 py-3 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-primary font-medium bg-primary/10 shadow-sm"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="capitalize">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative floating-shapes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isLoaded ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="gradient-text animate-gradient">Froillan Kim B. Edem</span>
                </h1>
                {/* Typewriter Titles */}
                <TypewriterLoop />
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Passionate about creating innovative solutions with cutting-edge technology, cloud infrastructure, and scalable architectures that make a positive impact.
                </p>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Rocket className="w-5 h-5 text-primary" />
                  <span><AnimatedCounter end={2} suffix="+" /> Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Cloud className="w-5 h-5 text-blue-500" />
                  <span>Google, Azure, AWS, Firebase</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span><AnimatedCounter end={100} suffix="%" /> Passion</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => scrollToSection("projects")} 
                  className="bg-primary hover:bg-primary/90 group animate-glow"
                  size="lg"
                >
                  <Eye className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  View Projects
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" onClick={() => scrollToSection("contact")} size="lg" className="group">
                  <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Get In Touch
                </Button>
                <Button variant="ghost" className="group" onClick={() => window.open('/resume/Froillan_Kim_B_Edem_resume.pdf', '_blank')}>
                  <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Resume
                </Button>
              </div>
            </div>

            <div className={`flex justify-center lg:justify-end ${isLoaded ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary to-accent p-1 animate-glow">
                  <img
                    src="/lovable-uploads/21db6910-0c88-42aa-8fa7-db9f3111b50f.png"
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full animate-float"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 -right-8 w-8 h-8 bg-yellow-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className={`mt-16 space-y-8 ${isLoaded ? 'animate-slide-in-up' : 'opacity-0'} mb-20`} style={{ animationDelay: '0.5s' }}>
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold gradient-text flex items-center justify-center space-x-3">
                <Terminal className="w-8 h-8" />
                <span>Technical Skills</span>
                <Cpu className="w-8 h-8" />
              </h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(techStacks).map(([category, techs], categoryIndex) => (
                <Card
                  key={category}
                  className="bg-card border-border tech-card-hover animate-bounce-in"
                  style={{ animationDelay: `${categoryIndex * 0.2}s` }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="capitalize text-lg flex items-center space-x-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        {category === 'languages' && <Code className="w-5 h-5 text-primary" />}
                        {category === 'frontend' && <Monitor className="w-5 h-5 text-primary" />}
                        {category === 'backend' && <Server className="w-5 h-5 text-primary" />}
                        {category === 'cloud' && <Cloud className="w-5 h-5 text-primary" />}
                        {category === 'databases' && <Database className="w-5 h-5 text-primary" />}
                      </div>
                      <span>{category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {techs.map((tech, techIndex) => (
                        <div 
                          key={tech.name}
                          className="flex items-center space-x-2 p-2 rounded-lg bg-tech-badge hover:bg-primary/10 transition-all duration-300 group"
                          style={{ animationDelay: `${(categoryIndex * 0.2) + (techIndex * 0.1)}s` }}
                        >
                          <tech.icon className={`w-4 h-4 ${tech.color} group-hover:scale-110 transition-transform`} />
                          <span className="text-sm font-medium">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-section-bg relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center space-x-3">
              <User className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">About Me</h2>
              <Sparkles className="w-8 h-8 text-accent animate-pulse" />
            </div>
            
            <Card className="glass-effect border-primary/20 p-8">
              <div className="prose prose-lg mx-auto text-muted-foreground space-y-6">
                <p className="text-lg leading-relaxed">
                  🎓 A BSIT graduate from <span className="text-primary font-semibold">University of Cebu - Main</span> with extensive hands-on experience in full-stack development and cloud infrastructure.
                  I specialize in creating robust backend solutions with Django and FastAPI, while maintaining a strong command of front-end technologies, system architecture, and database management.
                </p>
                <p className="text-lg leading-relaxed">
                  🚀 With hands-on experience in leading projects from initial concept to full deployment, my focus is on intuitive UI/UX design and scalable mobile development using Flutter.
                  I also have hands-on experience in network infrastructure and container orchestration with Kubernetes, and my proficiency in serverless architectures and NoSQL databases like Firebase's Firestore allows me to build real-time, highly scalable applications.
                </p>
                <div className="flex justify-center space-x-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary"><AnimatedCounter end={20} suffix="+" /></div>
                    <div className="text-sm text-muted-foreground">Technologies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary"><AnimatedCounter end={2} suffix="+" /></div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary"><AnimatedCounter end={1000} suffix="+" /></div>
                    <div className="text-sm text-muted-foreground">Commits</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <FolderOpen className="w-8 h-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">Featured Projects</h2>
                <Rocket className="w-8 h-8 text-accent animate-bounce" />
              </div>
              <p className="text-lg text-muted-foreground">
                A showcase of my recent work and technical capabilities
              </p>
            </div>

            {/* Single Featured Project */}
            <div className="max-w-4xl mx-auto">
              {projects.map((project, index) => (
                <Card key={index} className="bg-project-card border-border overflow-hidden project-card-hover group">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 p-2 bg-primary/80 rounded-full text-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300">
                      <project.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl sm:text-2xl flex items-center space-x-2 flex-wrap">
                      <span className="break-words">{project.title}</span>
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 animate-pulse flex-shrink-0" />
                    </CardTitle>
                    <CardDescription className="text-base sm:text-lg text-primary font-medium">
                      {project.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{project.description}</p>

                    {/* Key Features Preview */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-base flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>Key Features</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.features?.slice(0, 4).map((feature, i) => (
                          <div key={i} className="flex items-start space-x-2 p-2 rounded-lg bg-primary/5">
                            <ArrowRight className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-xs leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                      {project.features && project.features.length > 4 && (
                        <p className="text-xs text-muted-foreground text-center">
                          +{project.features.length - 4} more features - click "View Details" to see all
                        </p>
                      )}
                    </div>

                    {/* Tech Preview */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-muted-foreground">Main Technologies:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 8).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs px-2 py-1">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 8 && (
                          <Badge variant="secondary" className="text-xs px-2 py-1">
                            +{project.technologies.length - 8} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                      <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 group"
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Live Demo
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="group"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                        Source Code
                      </Button>
                      <Button
                        size="lg"
                        variant="secondary"
                        className="group"
                        onClick={() => {
                          setSelectedProject(project);
                          setShowTechModal(true);
                        }}
                      >
                        <Info className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add More Projects Note */}
            <div className="text-center mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-muted-foreground text-sm">
                🚀 More projects coming soon! This portfolio is designed to dynamically load projects from the backend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-section-bg relative">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-12">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Star className="w-8 h-8 text-yellow-500" />
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">What People Say</h2>
                <Heart className="w-8 h-8 text-red-500 animate-pulse" />
              </div>
              <p className="text-lg text-muted-foreground">
                Feedback from clients, colleagues, and collaborators
              </p>
            </div>

            {/* Dynamic Testimonials Section */}
            {isLoadingTestimonials ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3 text-muted-foreground">Loading testimonials...</span>
              </div>
            ) : (
              <div className="overflow-hidden relative">
                <div className="flex animate-scroll-testimonials hover:animation-paused">
                  {/* First set of testimonials */}
                  {testimonials.map((testimonial, index) => (
                    <Card key={`first-${index}`} className="glass-effect border-primary/20 p-4 sm:p-6 testimonial-card-hover flex-shrink-0 w-72 sm:w-80 lg:w-96 mx-3 cursor-pointer">
                      <CardContent className="space-y-3">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={`w-4 h-4 ${star <= (testimonial.rating || 5) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <blockquote className="text-muted-foreground italic text-xs sm:text-sm leading-relaxed">
                          "{testimonial.text}"
                        </blockquote>
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center`}>
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-xs sm:text-sm">{testimonial.author}</div>
                            <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Duplicate set for seamless loop */}
                  {testimonials.map((testimonial, index) => (
                    <Card key={`second-${index}`} className="glass-effect border-primary/20 p-4 sm:p-6 testimonial-card-hover flex-shrink-0 w-72 sm:w-80 lg:w-96 mx-3 cursor-pointer">
                      <CardContent className="space-y-3">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={`w-4 h-4 ${star <= (testimonial.rating || 5) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <blockquote className="text-muted-foreground italic text-xs sm:text-sm leading-relaxed">
                          "{testimonial.text}"
                        </blockquote>
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center`}>
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-xs sm:text-sm">{testimonial.author}</div>
                            <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">
                  <AnimatedCounter end={100} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">
                  <AnimatedCounter end={5} suffix="/5" />
                </div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">
                  <AnimatedCounter end={2} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">
                  <AnimatedCounter end={24} suffix="h" />
                </div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-section-bg relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center space-x-3">
              <MessageCircle className="w-8 h-8 text-primary animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">Get In Touch</h2>
              <Heart className="w-8 h-8 text-red-500 animate-bounce" />
            </div>
            <p className="text-lg text-muted-foreground">
              Let's discuss how we can work together to bring your ideas to life
            </p>
            {/* Social Links Row */}
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://facebook.com/" target="_blank" rel="noopener" className="text-blue-600 hover:scale-110 transition-transform"><svg width="24" height="24" fill="currentColor"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12"/></svg></a>
              <a href="https://twitter.com/" target="_blank" rel="noopener" className="text-blue-400 hover:scale-110 transition-transform"><svg width="24" height="24" fill="currentColor"><path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 11.07 9.03c0 .352.04.695.116 1.022C7.728 9.89 4.1 8.13 1.671 5.149c-.386.664-.607 1.437-.607 2.26 0 1.56.795 2.936 2.005 3.744a4.48 4.48 0 0 1-2.03-.561v.057c0 2.18 1.55 4.002 3.604 4.418-.377.102-.775.157-1.186.157-.29 0-.57-.028-.845-.08.57 1.78 2.23 3.075 4.2 3.11A8.98 8.98 0 0 1 2 19.54a12.68 12.68 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583A9.22 9.22 0 0 0 24 4.59a8.94 8.94 0 0 1-2.54.698z"/></svg></a>
              <a href="https://instagram.com/" target="_blank" rel="noopener" className="text-pink-500 hover:scale-110 transition-transform"><svg width="24" height="24" fill="currentColor"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm6.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg></a>
            </div>
            {/* Resume and Availability */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-4">
              <Button variant="outline" className="group" onClick={() => window.open('/resume/Froillan_Kim_B_Edem_resume.pdf', '_blank')}>
                <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Download Resume
              </Button>
              <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Available for new projects!</span>
            </div>
            {/* Contact Buttons */}
            <Card className="glass-effect border-primary/20 p-8 mt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 group h-16"
                  onClick={copyEmailToClipboard}
                >
                  {emailCopied ? (
                    <Check className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform text-green-400" />
                  ) : (
                    <Copy className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  )}
                  <div className="text-left">
                    <div className="font-semibold">froillan.edem@gmail.com</div>
                    <div className="text-xs opacity-80">
                      {emailCopied ? "Copied!" : "Click to Copy"}
                    </div>
                  </div>
                </Button>
                <Button size="lg" variant="outline" className="group h-16" onClick={() => window.open('https://www.linkedin.com/in/froillan-kim-b-edem-5b591b252/', '_blank')}>
                  <Linkedin className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="font-semibold">LinkedIn</div>
                    <div className="text-xs opacity-80">Connect</div>
                  </div>
                </Button>
                <Button size="lg" variant="outline" className="group h-16" onClick={() => window.open('https://github.com/Froillan123', '_blank')}>
                  <Github className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                  <div className="text-left">
                    <div className="font-semibold">GitHub</div>
                    <div className="text-xs opacity-80">Profile</div>
                  </div>
                </Button>
              </div>
            </Card>
            {/* Contact Options */}
            <div className="space-y-12 mt-8">
              {/* Contact Form */}
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                <h3 className="text-xl font-semibold text-center gradient-text flex items-center justify-center space-x-2 mb-6">
                  <Mail className="w-5 h-5" />
                  <span>Get In Touch</span>
                </h3>
                <form className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">First Name *</label>
                  <input
                    name="firstName"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Last Name *</label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address *</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background"
                  placeholder="john.doe@example.com"
                />
              </div>

              {/* Purpose Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Purpose *</label>
                <select
                  name="purpose"
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background"
                >
                  <option value="">Select a purpose...</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-app-development">Mobile App Development (Flutter)</option>
                  <option value="backend-development">Backend Development (Django/FastAPI/.NET)</option>
                  <option value="cloud-deployment">Cloud Deployment & DevOps</option>
                  <option value="ai-integration">AI Integration & Machine Learning</option>
                  <option value="database-design">Database Design & Optimization</option>
                  <option value="full-stack-project">Full-Stack Project Development</option>
                  <option value="consultation">Technical Consultation</option>
                  <option value="code-review">Code Review & Optimization</option>
                  <option value="maintenance">System Maintenance & Support</option>
                  <option value="other">Other (Please specify in message)</option>
                </select>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message *</label>
                <textarea
                  name="message"
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background resize-none"
                  placeholder="Tell me about your project, requirements, timeline, budget, or any specific questions you have..."
                  rows={5}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 py-3 text-lg font-semibold group"
              >
                <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Send Message
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Form Note */}
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    * Required fields. I'll get back to you within 24 hours!
                  </p>
                </form>
              </div>

              {/* Testimonial Form */}
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                <h3 className="text-xl font-semibold text-center gradient-text flex items-center justify-center space-x-2 mb-6">
                  <Star className="w-5 h-5" />
                  <span>Share Your Experience</span>
                </h3>
                <form className="space-y-4">
                  {/* Client Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Your Name *</label>
                      <input
                        name="clientName"
                        type="text"
                        required
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Company</label>
                      <input
                        name="company"
                        type="text"
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background"
                        placeholder="TechCorp Inc."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Your Role *</label>
                    <input
                      name="role"
                      type="text"
                      required
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background"
                      placeholder="CEO, CTO, Product Manager, etc."
                    />
                  </div>

                  {/* Project Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Project Type *</label>
                    <select
                      name="projectType"
                      required
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background"
                    >
                      <option value="">Select project type...</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-app">Mobile App (Flutter)</option>
                      <option value="backend-api">Backend/API Development</option>
                      <option value="cloud-deployment">Cloud Deployment</option>
                      <option value="ai-integration">AI Integration</option>
                      <option value="full-stack">Full-Stack Project</option>
                      <option value="consultation">Technical Consultation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Star Rating */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Rating *</label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="star-rating w-8 h-8 text-gray-300 hover:text-yellow-500 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            const form = (e.target as HTMLElement).closest('form');
                            if (!form) return;
                            const stars = form.querySelectorAll('.star-rating');
                            stars.forEach((s, i) => {
                              if (i < star) {
                                s.classList.add('text-yellow-500', 'fill-current');
                                s.classList.remove('text-gray-300');
                              } else {
                                s.classList.remove('text-yellow-500', 'fill-current');
                                s.classList.add('text-gray-300');
                              }
                            });
                            // Set hidden input value
                            const ratingInput = form.querySelector('input[name="rating"]') as HTMLInputElement;
                            if (ratingInput) ratingInput.value = star.toString();
                          }}
                        >
                          <Star className="w-full h-full" />
                        </button>
                      ))}
                      <input type="hidden" name="rating" required />
                      <span className="text-sm text-muted-foreground ml-2">Click stars to rate</span>
                    </div>
                  </div>

                  {/* Testimonial Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Your Testimonial *</label>
                    <textarea
                      name="testimonial"
                      required
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background resize-none"
                      placeholder="Share your experience working with Froillan. What made the project successful? How was the communication and delivery?"
                      rows={4}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 py-2 text-sm font-semibold group"
                  >
                    <Star className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Submit Testimonial
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  {/* Honeypot field for spam protection */}
                  <div className="hidden">
                    <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  {/* Rate limiting info */}
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    * Your testimonial will be reviewed before being displayed.
                    <br />One submission per email address. Thank you for sharing! ⭐
                  </p>
                </form>
              </div>
            </div>
            {/* Fun Quote */}
            <div className="mt-8 text-center text-muted-foreground italic text-sm">
              "Let's build something amazing together!"
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Modal */}
      {showTechModal && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-xl">{selectedProject.title}</CardTitle>
                <CardDescription>Complete Technology Stack</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowTechModal(false)}
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Full Tech Stack */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-blue-500" />
                  <span>Detailed Tech Stack</span>
                </h4>
                <div className="grid gap-4">
                  {Object.entries(selectedProject.techStack || {}).map(([category, techs]) => (
                    <div key={category} className="space-y-2">
                      <h5 className="font-medium text-primary text-sm border-l-2 border-primary pl-2">{category}</h5>
                      <div className="flex flex-wrap gap-2 ml-4">
                        {(techs as string[]).map((tech, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* All Features */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>All Features</span>
                </h4>
                <div className="grid gap-2">
                  {selectedProject.features?.map((feature, i) => (
                    <div key={i} className="flex items-start space-x-2 p-3 rounded-lg bg-primary/5">
                      <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* All Technologies */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center space-x-2">
                  <Code className="w-5 h-5 text-green-500" />
                  <span>Complete Technology List</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  className="bg-primary hover:bg-primary/90 group flex-1"
                  onClick={() => window.open(selectedProject.link, '_blank')}
                >
                  <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Live Demo
                </Button>
                <Button
                  variant="outline"
                  className="group flex-1"
                  onClick={() => window.open(selectedProject.github, '_blank')}
                >
                  <Github className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  Source Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <span>Portfolio © {currentYear} Froillan Kim B. Edem. Built with React & TypeScript.</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>Thank You</span>
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}