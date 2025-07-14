import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles, Shield, TrendingUp, Target, Brain } from 'lucide-react';
import * as THREE from 'three';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<HTMLDivElement>(null);

  const whyJoinRef = useRef<HTMLDivElement>(null);
  const whyJoinThreeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animations for hero
    const tl = gsap.timeline();
    tl.fromTo(heroRef.current?.children || [],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    );

    gsap.fromTo(statsRef.current?.children || [],
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 1.5
      }
    );

    gsap.fromTo(ctaRef.current?.children || [],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 2
      }
    );

    // Three.js stars background for hero
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (threeRef.current) {
      threeRef.current.appendChild(renderer.domElement);
    }

    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
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

  // Separate Three.js background for "Why Join HWAI" section
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (whyJoinThreeRef.current) {
      whyJoinThreeRef.current.appendChild(renderer.domElement);
    }

    // Create black-themed particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 3000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3000;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({ color: 0x666666, size: 1.2 });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);

    scene.add(particles);
    camera.position.z = 800;

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.0003;
      particles.rotation.y += 0.0003;
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
      if (whyJoinThreeRef.current) {
        whyJoinThreeRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (whyJoinRef.current) {
      gsap.fromTo(
        whyJoinRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        <div ref={threeRef} className="absolute inset-0 z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20">
          <div ref={heroRef} className="text-center">
            {/* Headline */}
            <div className="inline-flex items-center bg-gradient-to-r from-accent/20 to-purple-600/20 rounded-full px-4 py-2 mb-6 border border-accent/30 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm text-gray-300">Empowering Human Potential in the AI Era</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Humans
              <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent"> Winning </span>
              AI
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Master the AI Readiness Skills framework and join a thriving community where humans and AI collaborate to unlock unprecedented potential.
            </p>

            {/* CTA */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="bg-gradient-to-r from-accent to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-accent transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg hover:shadow-accent/25">
                Join Our Community
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border border-gray-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 hover:border-accent transition-all duration-300">
                Explore AI Readiness Framework
              </button>
            </div>

            {/* Community Initiatives - updated to 3 points */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-700 max-w-2xl mx-auto">
              <div className="text-center group">
                <div className="text-3xl font-bold text-white group-hover:text-accent transition-colors duration-300">15K+</div>
                <div className="text-gray-400 text-sm">Active Members</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-white group-hover:text-accent transition-colors duration-300">500+</div>
                <div className="text-gray-400 text-sm">AI Projects</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-white group-hover:text-accent transition-colors duration-300">98%</div>
                <div className="text-gray-400 text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join HWAI Section */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        <div ref={whyJoinThreeRef} className="absolute inset-0 z-0"></div>

        <div ref={whyJoinRef} className="relative z-10 max-w-5xl mx-auto px-4 py-32 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Why Join HWAI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="glass-card rounded-2xl p-6 border border-accent/20 hover:border-accent/40 backdrop-blur-md transition-all duration-300 bg-white/5">
              <Shield className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-gray-300 text-lg">Stay safe & resilient against AI threats and challenges.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 border border-accent/20 hover:border-accent/40 backdrop-blur-md transition-all duration-300 bg-white/5">
              <TrendingUp className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-gray-300 text-lg">Accelerate your career growth with hands-on AI projects.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 border border-accent/20 hover:border-accent/40 backdrop-blur-md transition-all duration-300 bg-white/5">
              <Target className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-gray-300 text-lg">Gain clarity and focus to reach your personal AI goals.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 border border-accent/20 hover:border-accent/40 backdrop-blur-md transition-all duration-300 bg-white/5">
              <Brain className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-gray-300 text-lg">Join a community that enhances your skills & mindset.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
