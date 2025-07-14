import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Users, Sparkles, ExternalLink, Download } from 'lucide-react';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Animations
    gsap.fromTo(ctaRef.current?.children || [],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(formRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Three.js Stars Background
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
    <section className="py-20 relative overflow-hidden bg-black">
      {/* Three.js Stars Background */}
      <div ref={threeRef} className="absolute inset-0 z-0"></div>

      {/* Gradient background pattern on top of stars */}
      <div className="absolute inset-0 opacity-10 z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-accent to-purple-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-600 to-accent rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div ref={ctaRef} className="text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-accent/20 to-purple-600/20 rounded-full px-4 py-2 mb-6 border border-accent/30">
            <Sparkles className="w-4 h-4 text-accent mr-2" />
            <span className="text-sm text-gray-300">Join the AI Readiness Revolution</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to Master
            <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent"> AI Readiness</span>?
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Join thousands of professionals who are building the essential skills for the AI era. Master DCIM skills, 
            the Four C's, and AI tools to stay safe, advance your career, and thrive in the post-AI world.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <div className="flex items-center text-gray-300">
              <Users className="w-5 h-5 mr-2 text-accent" />
              <span>15,000+ Active Members</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Mail className="w-5 h-5 mr-2 text-blue-400" />
              <span>AI Readiness Resources</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
              <span>Expert-Led Framework</span>
            </div>
          </div>

          <div ref={formRef} className="max-w-2xl mx-auto mb-12">
            <div className="glass-card rounded-3xl p-8 border border-accent/20 backdrop-blur-md bg-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Get Started with AI Readiness Skills</h3>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                />
                <button className="bg-gradient-to-r from-accent to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-accent transition-all duration-300 transform hover:scale-105 flex items-center justify-center whitespace-nowrap shadow-lg hover:shadow-accent/25">
                  Join Community
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="border border-accent text-accent px-6 py-3 rounded-full hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center">
                  <Download className="mr-2 w-4 h-4" />
                  Download White Paper
                </button>
                <a 
                  href="https://aireadinessskills.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-purple-400 text-purple-400 px-6 py-3 rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  <ExternalLink className="mr-2 w-4 h-4" />
                  Explore Resources
                </a>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-sm">
            No spam, unsubscribe at any time. Join the mission to help humans win in the AI era.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
