import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Star, ArrowRight } from 'lucide-react';

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

    const cards = storiesRef.current?.children || [];
    gsap.fromTo(cards,
      { opacity: 0, scale: 0.8, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: storiesRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        onComplete: () => {
          Array.from(cards).forEach(card => {
            // Floating motion
            gsap.to(card, {
              y: "+=10",
              duration: 3,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
            });

            // Glow pulse
            gsap.to(card, {
              boxShadow: "0 0 25px rgba(168, 85, 247, 0.5)",
              duration: 2,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
            });
          });
        },
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
      content: "I was initially hesitant about AI in our marketing campaigns. HWAI's workshops helped me embrace it, resulting in a 300% performance improvement.",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
      impact: "300% improvement"
    },
    {
      title: "Building Ethical AI Systems",
      author: "Marcus Rodriguez",
      role: "AI Engineer",
      content: "With HWAI's framework, I developed responsible AI prioritizing human values. We now set the standard for ethical AI in the industry.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
      impact: "Industry leader"
    },
    {
      title: "Transforming Healthcare with AI",
      author: "Dr. Emily Watson",
      role: "Chief Medical Officer",
      content: "Using HWAI's AI-assisted diagnostics, we reduced diagnosis time by 60% and achieved 99% accuracy, transforming patient care.",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
      impact: "60% faster"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-accent to-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-600 to-accent rounded-full blur-3xl"></div>
        </div>
        <div ref={heroRef} className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Success <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">Stories</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            See how our community is shaping the future with human-AI collaboration.
          </p>
        </div>
      </section>

      {/* Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div ref={storiesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {stories.map((story, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/5 to-purple-800/20 rounded-3xl p-4 border border-purple-600/30 backdrop-blur-md transition-transform duration-500 hover:scale-105 hover:rotate-1 group cursor-pointer relative overflow-hidden"
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-48 object-cover rounded-2xl mb-4 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="flex items-center mb-3">
                  <Heart className="w-5 h-5 text-accent mr-2" />
                  <span className="text-accent font-semibold">{story.impact}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{story.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{story.content}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{story.author}</div>
                    <div className="text-gray-400 text-xs">{story.role}</div>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 rounded-3xl border border-purple-600 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-accent/20 to-purple-600/20 rounded-3xl p-12 border border-purple-600/30 backdrop-blur-md shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Share Your Story</h2>
            <p className="text-xl text-gray-300 mb-8">
              Have an inspiring AI journey? We'd love to feature it and empower the community.
            </p>
            <button className="bg-gradient-to-r from-accent to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-accent transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto shadow-lg">
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
