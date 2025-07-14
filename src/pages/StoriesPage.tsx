import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Users, Star, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const StoriesPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current?.children || [],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    );

    // Stories scroll animation
    gsap.fromTo(storiesRef.current?.children || [],
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: storiesRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const stories = [
    {
      title: "From Skeptic to AI Advocate",
      author: "Sarah Chen",
      role: "Marketing Director",
      content: "I was initially hesitant about AI integration in our marketing campaigns. Through HWAI's workshops, I learned how to leverage AI while maintaining human creativity. Our campaign performance improved by 300%.",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
      impact: "300% improvement"
    },
    {
      title: "Building Ethical AI Systems",
      author: "Marcus Rodriguez",
      role: "AI Engineer",
      content: "HWAI's ethical AI framework helped me develop responsible AI systems that prioritize human values. Our team now leads industry standards in ethical AI development.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
      impact: "Industry leadership"
    },
    {
      title: "Transforming Healthcare with AI",
      author: "Dr. Emily Watson",
      role: "Chief Medical Officer",
      content: "Through HWAI's healthcare AI initiative, we implemented AI-assisted diagnostics that reduced diagnosis time by 60% while maintaining 99% accuracy.",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
      impact: "60% faster diagnosis"
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
            Success <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">Stories</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Discover how our community members are transforming their organizations and careers through human-AI collaboration.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={storiesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div key={index} className="flip-card glass-card rounded-3xl overflow-hidden border border-accent/20 group hover:shadow-2xl hover:shadow-accent/25 transition-all duration-500">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="w-5 h-5 text-accent mr-2" />
                    <span className="text-accent font-semibold">{story.impact}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{story.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{story.content}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">{story.author}</div>
                      <div className="text-gray-400 text-sm">{story.role}</div>
                    </div>
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card rounded-3xl p-12 border border-accent/20 bg-gradient-to-br from-accent/20 to-purple-600/20">
            <h2 className="text-3xl font-bold text-white mb-6">Share Your Story</h2>
            <p className="text-xl text-gray-300 mb-8">
              Have a success story with AI? We'd love to feature your journey and inspire others in our community.
            </p>
            <button className="bg-gradient-to-r from-accent to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-accent transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto shadow-lg hover:shadow-accent/25">
              Submit Your Story
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoriesPage;