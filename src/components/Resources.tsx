import React, { useEffect, useRef } from 'react';
import { BookOpen, Video, Podcast, FileText, ArrowRight } from 'lucide-react';
import * as THREE from 'three';

const Resources = () => {
  const threeRef = useRef<HTMLDivElement>(null);

  const resourceTypes = [
    {
      icon: BookOpen,
      title: "Research Papers",
      count: "500+",
      description: "Cutting-edge research on human-AI collaboration",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      count: "200+",
      description: "Step-by-step guides and expert interviews",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Podcast,
      title: "Podcast Episodes",
      count: "150+",
      description: "Insights from industry leaders and researchers",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: FileText,
      title: "Case Studies",
      count: "100+",
      description: "Real-world applications and success stories",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const featuredResources = [
    {
      title: "The Future of Human-AI Collaboration",
      type: "Research Paper",
      author: "Dr. Alex Thompson",
      readTime: "12 min read",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Building Ethical AI Systems",
      type: "Video Series",
      author: "Sarah Martinez",
      readTime: "45 min watch",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "AI in Healthcare: A Human-Centered Approach",
      type: "Case Study",
      author: "Medical AI Consortium",
      readTime: "8 min read",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  useEffect(() => {
    // Three.js stars background
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (threeRef.current) {
      threeRef.current.appendChild(renderer.domElement);
    }

    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);

    scene.add(stars);
    camera.position.z = 500;

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeRef.current) {
        threeRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section id="resources" className="relative min-h-screen overflow-hidden bg-black">
      <div ref={threeRef} className="absolute inset-0 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Knowledge <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Resources</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access our comprehensive library of resources designed to accelerate your understanding of human-AI collaboration.
          </p>
        </div>

        {/* Resource Types */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resourceTypes.map((resource, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${resource.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <resource.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
              <div className="text-3xl font-bold text-white mb-2">{resource.count}</div>
              <p className="text-gray-300 text-sm">{resource.description}</p>
            </div>
          ))}
        </div>

        {/* Featured Resources */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Featured Resources</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer border border-accent/20">
                <img 
                  src={resource.image} 
                  alt={resource.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      {resource.type}
                    </span>
                    <span className="text-gray-300 text-sm">{resource.readTime}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-pink-500 transition-colors duration-200">
                    {resource.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">by {resource.author}</p>
                  <div className="flex items-center text-pink-500 font-medium">
                    Read More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105">
            Explore All Resources
          </button>
        </div>
      </div>
    </section>
  );
};

export default Resources;
