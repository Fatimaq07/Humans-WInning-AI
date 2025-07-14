import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Users, Shield, Zap, Target, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeaturesPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current?.children || [],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    );

    gsap.fromTo(featuresRef.current?.children || [],
      { opacity: 0, rotationY: -90 },
      {
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Human Collaboration Tools",
      description: "Advanced platforms that seamlessly integrate human creativity with AI capabilities for enhanced productivity.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Connect with 15,000+ professionals, researchers, and innovators in the AI space worldwide.",
      color: "from-accent to-pink-500"
    },
    {
      icon: Shield,
      title: "Ethical AI Framework",
      description: "Comprehensive guidelines and tools to ensure responsible AI development and deployment.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Real-time Analytics",
      description: "Monitor and optimize your AI implementations with advanced analytics and performance metrics.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Target,
      title: "Personalized Learning Paths",
      description: "Customized educational journeys based on your role, experience, and career goals.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Lightbulb,
      title: "Innovation Labs",
      description: "Access to cutting-edge research, experimental tools, and collaborative innovation spaces.",
      color: "from-teal-500 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-accent to-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-600 to-accent rounded-full blur-3xl"></div>
        </div>
        
        <div ref={heroRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Platform <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">Features</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Discover the powerful tools and capabilities that make HWAI the leading platform for human-AI collaboration.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flip-card glass-card rounded-3xl p-8 border border-accent/20 group hover:shadow-2xl hover:shadow-accent/25 transition-all duration-500">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;