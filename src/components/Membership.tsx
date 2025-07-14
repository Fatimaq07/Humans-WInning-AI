import React, { useEffect, useRef } from 'react';
import { Check, Users, Zap, Crown, ArrowRight } from 'lucide-react';
import * as THREE from 'three';

const Membership = () => {
  const threeRef = useRef<HTMLDivElement>(null);

  const benefits = [
    {
      icon: Users,
      title: "Global Community Access",
      description: "Connect with 15,000+ professionals, researchers, and innovators worldwide"
    },
    {
      icon: Zap,
      title: "Exclusive Resources",
      description: "Access premium research papers, case studies, and AI collaboration tools"
    },
    {
      icon: Crown,
      title: "Expert Mentorship",
      description: "Learn from industry leaders through workshops and one-on-one sessions"
    }
  ];

  const features = [
    "Access to community forums and discussions",
    "Monthly newsletter with latest AI insights",
    "Networking events and meetups",
    "Resource library with 500+ research papers",
    "AI ethics guidelines and best practices",
    "Project collaboration opportunities",
    "Expert-led workshops and webinars",
    "Career advancement resources"
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
    <section id="community" className="relative min-h-screen overflow-hidden bg-black">
      <div ref={threeRef} className="absolute inset-0 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Join Our <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Community</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Become part of a thriving ecosystem where humans and AI collaborate to create meaningful innovation and positive impact.
          </p>
        </div>

        {/* Community Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
              <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Membership Features */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 lg:p-12 border border-accent/20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">What You'll Get</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center lg:text-left">
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-8 text-white">
                <h4 className="text-2xl font-bold mb-4">Ready to Get Started?</h4>
                <p className="text-gray-300 mb-6">
                  Join thousands of innovators who are shaping the future of human-AI collaboration.
                </p>
                <div className="space-y-4">
                  <button className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center">
                    Join Community
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  <p className="text-gray-400 text-sm">
                    Free to join • No credit card required
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="flex flex-wrap justify-center space-x-8 text-sm text-gray-400">
            <span>✓ 15,000+ Active Members</span>
            <span>✓ Global Community</span>
            <span>✓ Expert Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;
