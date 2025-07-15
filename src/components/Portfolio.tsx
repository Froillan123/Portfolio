import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  Menu, X, Github, Linkedin, Mail, ExternalLink, 
  Code, Database, Server, Smartphone, Globe, 
  Zap, Rocket, Brain, Heart, Star, Sparkles,
  Terminal, FileCode, GitBranch, Layers, 
  Shield, Cpu, Cloud, Monitor, Palette,
  ArrowRight, Download, Play, Eye,
  Home, User, FolderOpen, MessageCircle,
  Code2, Coffee
} from "lucide-react";
import faceofmindImage from "@/assets/faceofmind-project.jpg";
import lutomateImage from "@/assets/lutomate-project.jpg";

const techStacks = {
  languages: [
    { name: "Python", icon: Code2, color: "text-yellow-500" },
    { name: "TypeScript", icon: FileCode, color: "text-blue-500" },
    { name: "JavaScript", icon: Coffee, color: "text-yellow-400" },
    { name: "Dart", icon: Code, color: "text-blue-400" },
  ],
  frontend: [
    { name: "Flutter", icon: Smartphone, color: "text-cyan-500" },
    { name: "Angular", icon: Globe, color: "text-red-500" },
    { name: "HTML5", icon: Code, color: "text-orange-500" },
    { name: "CSS3", icon: Palette, color: "text-blue-600" },
  ],
  backend: [
    { name: "Django", icon: Server, color: "text-green-600" },
    { name: "Flask", icon: Server, color: "text-gray-600" },
    { name: "FastAPI", icon: Zap, color: "text-green-500" },
    { name: "Express.js", icon: Server, color: "text-gray-700" },
  ],
  databases: [
    { name: "PostgreSQL", icon: Database, color: "text-blue-700" },
    { name: "MySQL", icon: Database, color: "text-orange-600" },
    { name: "SQLite", icon: Database, color: "text-gray-500" },
  ],
  tools: [
    { name: "Git", icon: GitBranch, color: "text-orange-500" },
    { name: "Docker", icon: Layers, color: "text-blue-500" },
    { name: "NGINX", icon: Shield, color: "text-green-600" },
  ],
};

const projects = [
  {
    title: "FaceofMind",
    subtitle: "🤖 AI-Powered Mental Health Companion",
    description: "An intelligent mental health companion that provides personalized support, mood tracking, and therapeutic conversations using advanced AI technology.",
    image: faceofmindImage,
    technologies: ["Python/Fast API", "Flutter", "Opencv/Deppface", "Gemini 2.5 Flash Lite", "PostgreSQL"],
    link: "https://faceofmind.vercel.app/",
    github: "https://github.com/Froillan123/Faceofmind.git",
    icon: Brain
  },
  {
    title: "LutoMate",
    subtitle: "Your AI-Powered Recipe Assistant",
    description: "Smart recipe recommendation system that suggests personalized meals based on available ingredients, dietary preferences, and nutritional goals.",
    image: lutomateImage,
    technologies: ["Python/Fast API", "Flutter", "Gemini 2.5 Flash Lite", "PostgreSQL"],
    link: "https://luto-mate.vercel.app/",
    github: "https://github.com/Froillan123/LutoMate.git",
    icon: Heart
  }
];

const navigationItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderOpen },
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
  "Full Stack Developer",
  "Flutter Android Developer"
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
        }, 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 30);
      } else {
        setTyping(true);
        setIndex((index + 1) % titles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, index]);

  return (
    <div className="typewriter text-xl md:text-2xl font-semibold leading-tight mt-2 text-primary h-8">
      {displayed}
      <span className="blinking-cursor">|</span>
    </div>
  );
}

export function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <FloatingParticles />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
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
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-64 py-4 border-t border-border' : 'max-h-0'
          }`}>
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center space-x-3 w-full text-left px-2 py-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span className="capitalize">{item.label}</span>
              </button>
            ))}
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
                  Passionate about creating innovative solutions with cutting-edge technology and clean, efficient code.
                </p>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Rocket className="w-5 h-5 text-primary" />
                  <span><AnimatedCounter end={2} suffix="+" /> Projects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span><AnimatedCounter end={2} suffix="+" /> Years Experience</span>
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
                <Button variant="ghost" className="group">
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
                        {category === 'databases' && <Database className="w-5 h-5 text-primary" />}
                        {category === 'tools' && <Cloud className="w-5 h-5 text-primary" />}
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
                  🎓 Final year BSIT student at <span className="text-primary font-semibold">University of Cebu - Main</span> with comprehensive expertise in full-stack development. 
                  Specializing in Django backend solutions while proficient in frontend technologies, system architecture, and database management.
                </p>
                <p className="text-lg leading-relaxed">
                  🚀 Experienced in leading projects from conception to deployment with strong skills in UI/UX design, mobile development using Flutter, 
                  and network infrastructure. Passionate about creating innovative solutions that make a positive impact.
                </p>
                <div className="flex justify-center space-x-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary"><AnimatedCounter end={15} suffix="+" /></div>
                    <div className="text-sm text-muted-foreground">Technologies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary"><AnimatedCounter end={2} suffix="+" /></div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary"><AnimatedCounter end={500} suffix="+" /></div>
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

            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project, index) => (
                <Card 
                  key={index} 
                  className="bg-project-card border-border overflow-hidden project-card-hover group animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
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
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center space-x-2">
                      <span>{project.title}</span>
                      <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                    </CardTitle>
                    <CardDescription className="text-sm text-primary font-medium">
                      {project.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button 
                        size="sm" 
                        className="bg-primary hover:bg-primary/90 group flex-1"
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Live Demo
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="group flex-1"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                        Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
              <Button variant="outline" className="group" onClick={() => window.open('/resume.pdf', '_blank')}>
                <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Download Resume
              </Button>
              <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Available for new projects!</span>
            </div>
            {/* Contact Buttons */}
            <Card className="glass-effect border-primary/20 p-8 mt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Button size="lg" className="bg-primary hover:bg-primary/90 group h-16">
                  <Mail className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="font-semibold">froillan.edem@gmail.com</div>
                    <div className="text-xs opacity-80">Email Me</div>
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
            {/* Contact Form */}
            <form className="space-y-4 max-w-md mx-auto mt-8">
              <input className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your Name" />
              <input className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your Email" type="email" />
              <textarea className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your Message" rows={4} />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Send Message</Button>
            </form>
            {/* Fun Quote */}
            <div className="mt-8 text-center text-muted-foreground italic text-sm">
              "Let's build something amazing together!"
            </div>
          </div>
        </div>
      </section>

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