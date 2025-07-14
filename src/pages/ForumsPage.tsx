import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Users, TrendingUp, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ForumsPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const forumsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current?.children || [],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    );

    gsap.fromTo(forumsRef.current?.children || [],
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: forumsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const forumCategories = [
    {
      title: "AI Ethics & Governance",
      description: "Discuss responsible AI development and ethical considerations",
      posts: 1247,
      members: 3420,
      lastActivity: "2 hours ago",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Technical Discussions",
      description: "Deep dive into AI algorithms, frameworks, and implementation",
      posts: 2156,
      members: 5680,
      lastActivity: "30 minutes ago",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Industry Applications",
      description: "Real-world AI use cases across different industries",
      posts: 892,
      members: 2340,
      lastActivity: "1 hour ago",
      color: "from-accent to-pink-500"
    },
    {
      title: "Career & Education",
      description: "AI career paths, learning resources, and skill development",
      posts: 1534,
      members: 4120,
      lastActivity: "45 minutes ago",
      color: "from-orange-500 to-red-500"
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
            Community <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">Forums</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Join discussions, share insights, and collaborate with AI professionals from around the world.
          </p>
        </div>
      </section>

      {/* Forum Categories */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={forumsRef} className="grid md:grid-cols-2 gap-8">
            {forumCategories.map((category, index) => (
              <div key={index} className="flip-card glass-card rounded-3xl p-8 border border-accent/20 group hover:shadow-2xl hover:shadow-accent/25 transition-all duration-500 cursor-pointer">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{category.description}</p>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">{category.posts}</div>
                    <div className="text-gray-400 text-sm">Posts</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{category.members}</div>
                    <div className="text-gray-400 text-sm">Members</div>
                  </div>
                  <div>
                    <div className="text-sm text-accent font-medium">{category.lastActivity}</div>
                    <div className="text-gray-400 text-sm">Last Activity</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Discussions */}
      <section className="py-20 bg-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Recent Discussions</h2>
          <div className="space-y-6">
            {[
              {
                title: "Best practices for implementing AI in healthcare",
                author: "Dr. Sarah Chen",
                category: "Industry Applications",
                replies: 23,
                views: 456,
                time: "2 hours ago"
              },
              {
                title: "Ethical considerations in AI decision-making systems",
                author: "Marcus Rodriguez",
                category: "AI Ethics & Governance",
                replies: 18,
                views: 342,
                time: "4 hours ago"
              },
              {
                title: "Career transition from traditional software to AI",
                author: "Emily Watson",
                category: "Career & Education",
                replies: 31,
                views: 678,
                time: "6 hours ago"
              }
            ].map((discussion, index) => (
              <div key={index} className="glass-card rounded-2xl p-6 border border-accent/20 hover:border-accent/40 transition-all duration-300 cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                      {discussion.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>by {discussion.author}</span>
                      <span>in {discussion.category}</span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {discussion.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <div className="text-center">
                      <div className="text-white font-semibold">{discussion.replies}</div>
                      <div>Replies</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-semibold">{discussion.views}</div>
                      <div>Views</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForumsPage;