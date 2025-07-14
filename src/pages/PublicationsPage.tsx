import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Download, Calendar, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PublicationsPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const publicationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current?.children || [],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    );

    gsap.fromTo(publicationsRef.current?.children || [],
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: publicationsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const publications = [
    {
      title: "The Future of Human-AI Collaboration",
      author: "Dr. Sarah Chen",
      date: "March 2024",
      type: "Research Paper",
      description: "A comprehensive study on the evolving relationship between humans and AI in the workplace.",
      downloads: "2.5K"
    },
    {
      title: "Ethical AI Implementation Guidelines",
      author: "HWAI Ethics Committee",
      date: "February 2024",
      type: "White Paper",
      description: "Best practices and frameworks for implementing AI systems with human values at the core.",
      downloads: "1.8K"
    },
    {
      title: "AI Readiness Assessment Framework",
      author: "Marcus Rodriguez",
      date: "January 2024",
      type: "Technical Report",
      description: "A detailed framework for evaluating organizational readiness for AI transformation.",
      downloads: "3.2K"
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
            Research <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">Publications</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Access cutting-edge research, white papers, and technical reports on human-AI collaboration.
          </p>
        </div>
      </section>

      {/* Publications List */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={publicationsRef} className="space-y-8">
            {publications.map((publication, index) => (
              <div key={index} className="flip-card glass-card rounded-3xl p-8 border border-accent/20 group hover:shadow-2xl hover:shadow-accent/25 transition-all duration-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <BookOpen className="w-6 h-6 text-accent mr-3" />
                      <span className="bg-gradient-to-r from-accent to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {publication.type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                      {publication.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">{publication.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {publication.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {publication.date}
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {publication.downloads} downloads
                      </div>
                    </div>
                  </div>
                  <button className="ml-6 bg-gradient-to-r from-accent to-purple-600 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-accent transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg hover:shadow-accent/25">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicationsPage;